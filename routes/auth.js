const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'mind-museum-secret-key-2026';

// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required. Please sign in or continue as Guest.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired visitor session.' });
    }
    req.user = decodedUser;
    next();
  });
}

// Generate random Visitor ID like HMM-VIS-7492
function generateVisitorId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `HMM-VIS-${randomNum}`;
}

// Register new visitor
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const existingEmail = db.findUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const existingUsername = db.findUserByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ error: 'This username is already taken by another visitor.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: `usr_${Date.now()}`,
      username: username.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      role: 'visitor',
      visitorBadgeId: generateVisitorId(),
      visitorLevel: 'Novice Explorer',
      joinDate: new Date().toISOString(),
      visitedRooms: [],
      badges: ['First Step: Museum Admission']
    };

    db.createUser(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role, badgeId: newUser.visitorBadgeId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = { ...newUser };
    delete safeUser.passwordHash;

    res.status(201).json({
      message: 'Welcome to The Human Mind Museum! Your visitor pass has been minted.',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

// Login visitor
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please enter your username/email and password.' });
    }

    let user = db.findUserByEmail(identifier);
    if (!user) {
      user = db.findUserByUsername(identifier);
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. No visitor found with those details.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Password does not match.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, badgeId: user.visitorBadgeId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = { ...user };
    delete safeUser.passwordHash;

    res.json({
      message: `Welcome back, ${user.username}. Your museum credentials have been verified.`,
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// Fast Guest Pass generator for instant exploration
router.post('/guest', async (req, res) => {
  try {
    const guestId = `guest_${Math.random().toString(36).substring(2, 8)}`;
    const guestName = `Guest Explorer #${Math.floor(100 + Math.random() * 900)}`;
    const badgeId = generateVisitorId();

    const guestUser = {
      id: guestId,
      username: guestName,
      email: `${guestId}@visitor.mindmuseum.org`,
      role: 'guest',
      visitorBadgeId: badgeId,
      visitorLevel: 'Guest Scholar',
      joinDate: new Date().toISOString(),
      visitedRooms: [],
      badges: ['Guest Access Pass']
    };

    const token = jwt.sign(
      { id: guestUser.id, username: guestUser.username, role: guestUser.role, badgeId: guestUser.visitorBadgeId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Temporary holographic visitor pass issued.',
      token,
      user: guestUser
    });
  } catch (err) {
    console.error('Guest pass generation error:', err);
    res.status(500).json({ error: 'Unable to issue guest pass.' });
  }
});

// Get current logged-in visitor profile
router.get('/me', authenticateToken, (req, res) => {
  try {
    let user = db.findUserById(req.user.id);
    if (!user) {
      // If it was a dynamic guest token
      if (req.user.role === 'guest') {
        return res.json({
          user: {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role,
            visitorBadgeId: req.user.badgeId,
            visitorLevel: 'Guest Scholar',
            badges: ['Guest Access Pass'],
            visitedRooms: []
          },
          scores: db.getUserScores(req.user.id),
          journals: db.getUserJournal(req.user.id)
        });
      }
      return res.status(404).json({ error: 'Visitor profile not found.' });
    }

    const safeUser = { ...user };
    delete safeUser.passwordHash;

    const scores = db.getUserScores(user.id);
    const journals = db.getUserJournal(user.id);

    res.json({
      user: safeUser,
      scores,
      journals
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Error fetching visitor profile.' });
  }
});

// Update visited rooms or badges
router.post('/record-visit', authenticateToken, (req, res) => {
  try {
    const { roomId } = req.body;
    if (!roomId) return res.status(400).json({ error: 'Room ID is required.' });

    let user = db.findUserById(req.user.id);
    if (user) {
      const visited = user.visitedRooms || [];
      if (!visited.includes(roomId)) {
        visited.push(roomId);
        let badges = user.badges || [];
        if (visited.length >= 5 && !badges.includes('Omniscient Mind: All Wings Explored')) {
          badges.push('Omniscient Mind: All Wings Explored');
        }
        db.updateUser(user.id, { visitedRooms: visited, badges });
      }
    }
    res.json({ success: true, roomId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record visit.' });
  }
});

module.exports = { router, authenticateToken };

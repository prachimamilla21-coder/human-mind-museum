const express = require('express');
const router = express.Router();
const db = require('../database');
const { authenticateToken } = require('./auth');

// Get all journal entries (curated public feed)
router.get('/public', (req, res) => {
  try {
    const entries = db.getAllJournalEntries(20);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve journal entries.' });
  }
});

// Get user's personal reflections
router.get('/my-notes', authenticateToken, (req, res) => {
  try {
    const entries = db.getUserJournal(req.user.id);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user reflections.' });
  }
});

// Submit a new reflection from an exhibit
router.post('/add', authenticateToken, (req, res) => {
  try {
    const { room, title, content } = req.body;

    if (!room || !content) {
      return res.status(400).json({ error: 'Room and reflection content are required.' });
    }

    const newEntry = {
      id: `jrn_${Date.now()}`,
      userId: req.user.id,
      username: req.user.username,
      room,
      title: title || `Reflection in ${room}`,
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    db.addJournalEntry(newEntry);

    // Award badge if first journal entry
    let user = db.findUserById(req.user.id);
    if (user) {
      const badges = user.badges || [];
      if (!badges.includes('Introspective Philosopher')) {
        badges.push('Introspective Philosopher');
        db.updateUser(user.id, { badges });
      }
    }

    res.status(201).json({
      message: 'Your reflection has been sealed into the Museum Subconscious Vault.',
      entry: newEntry
    });
  } catch (err) {
    console.error('Journal entry error:', err);
    res.status(500).json({ error: 'Failed to save reflection.' });
  }
});

module.exports = router;

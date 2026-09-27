const express = require('express');
const router = express.Router();
const db = require('../database');
const { authenticateToken } = require('./auth');

const gamesCatalog = [
  {
    id: "stroop",
    title: "The Stroop Effect Challenge",
    subtitle: "Frontal Lobe Conflict & Cognitive Interference Test",
    scientificBasis: "Developed by John Ridley Stroop in 1935. When the name of a color is printed in a conflicting ink color (e.g. the word 'RED' printed in BLUE), your automatic reading pathway clashes with your color-naming pathway. The speed delay reflects executive inhibitory control.",
    metricName: "Interference Delay (ms) & Accuracy",
    badgesEarnable: ["Neural Overdrive", "Cognitive Ironclad"]
  },
  {
    id: "memory-matrix",
    title: "The Working Memory Matrix",
    subtitle: "Spatial Span & Miller's 7±2 Law Experiment",
    scientificBasis: "Based on the Corsi block-tapping task and George Miller's classic 1956 paper 'The Magical Number Seven, Plus or Minus Two'. Evaluates the visuospatial sketchpad component of Baddeley's working memory model.",
    metricName: "Span Capacity Level",
    badgesEarnable: ["Hippocampal Prodigy", "Archival Mastermind"]
  },
  {
    id: "bias-detective",
    title: "Cognitive Bias Detective",
    subtitle: "Rationality Trial & Fallacy Diagnostics",
    scientificBasis: "Inspired by the behavioral economics work of Daniel Kahneman and Amos Tversky. Tests your ability to spot cognitive heuristics like Confirmation Bias, Sunk Cost Fallacy, Availability Heuristic, and Gambler's Fallacy in real-world scenarios.",
    metricName: "Deductive Rationality Score",
    badgesEarnable: ["Bias Hunter", "Kahneman Laureate"]
  },
  {
    id: "micro-expressions",
    title: "Micro-Expression Emotion Decoder",
    subtitle: "Paul Ekman's High-Speed Facial Action Coding Test",
    scientificBasis: "Developed from Dr. Paul Ekman's discovery that involuntary facial expressions flash for as little as 1/25th of a second before conscious censorship can hide true emotions. Tests social empathy and affective perception.",
    metricName: "Empathy Recognition Index",
    badgesEarnable: ["Affective Empath", "Lie Detector"]
  }
];

// Get games catalog
router.get('/catalog', (req, res) => {
  res.json(gamesCatalog);
});

// Submit a game score
router.post('/submit', authenticateToken, (req, res) => {
  try {
    const { gameId, score, reactionTimeMs, accuracy, details } = req.body;

    if (!gameId || score === undefined) {
      return res.status(400).json({ error: 'Game ID and score are required.' });
    }

    const scoreRecord = {
      id: `sc_${Date.now()}`,
      userId: req.user.id,
      username: req.user.username,
      gameId,
      score: Number(score),
      reactionTimeMs: reactionTimeMs ? Number(reactionTimeMs) : null,
      accuracy: accuracy !== undefined ? Number(accuracy) : 100,
      details: details || {},
      timestamp: new Date().toISOString()
    };

    db.addScore(scoreRecord);

    // Compute achievements & badges for user
    let user = db.findUserById(req.user.id);
    let newBadges = [];

    if (user) {
      const currentBadges = user.badges || [];

      // Check badge thresholds
      if (gameId === 'stroop' && score >= 1500 && !currentBadges.includes('Neural Overdrive')) {
        currentBadges.push('Neural Overdrive');
        newBadges.push('Neural Overdrive');
      }
      if (gameId === 'memory-matrix' && score >= 7 && !currentBadges.includes('Hippocampal Prodigy')) {
        currentBadges.push('Hippocampal Prodigy');
        newBadges.push('Hippocampal Prodigy');
      }
      if (gameId === 'bias-detective' && score >= 800 && !currentBadges.includes('Bias Hunter')) {
        currentBadges.push('Bias Hunter');
        newBadges.push('Bias Hunter');
      }
      if (gameId === 'micro-expressions' && score >= 800 && !currentBadges.includes('Affective Empath')) {
        currentBadges.push('Affective Empath');
        newBadges.push('Affective Empath');
      }

      // Check level upgrades
      let level = user.visitorLevel || 'Novice Explorer';
      const allUserScores = db.getUserScores(user.id);
      if (allUserScores.length >= 3 && level === 'Novice Explorer') {
        level = 'Cognitive Apprentice';
      }
      if (allUserScores.length >= 6) {
        level = 'Senior Neuro-Investigator';
      }

      db.updateUser(user.id, { badges: currentBadges, visitorLevel: level });
    }

    // Determine percentile rank
    const leaderboard = db.getLeaderboard(gameId, 100);
    const beaten = leaderboard.filter(s => s.score < score).length;
    const percentile = Math.min(99, Math.max(15, Math.round((beaten / Math.max(1, leaderboard.length)) * 100)));

    res.json({
      message: 'Neural score successfully recorded in museum archives!',
      scoreRecord,
      percentile,
      newBadges
    });
  } catch (err) {
    console.error('Score submit error:', err);
    res.status(500).json({ error: 'Failed to record game score.' });
  }
});

// Leaderboard (all games)
router.get('/leaderboard', (req, res) => {
  try {
    const leaderboard = db.getLeaderboard(null, 15);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard.' });
  }
});

// Leaderboard by game ID
router.get('/leaderboard/:gameId', (req, res) => {
  try {
    const gameId = req.params.gameId;
    const leaderboard = db.getLeaderboard(gameId, 15);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard.' });
  }
});

// Visitor's personal cognitive scores analytics
router.get('/my-stats', authenticateToken, (req, res) => {
  try {
    const userScores = db.getUserScores(req.user.id);
    res.json(userScores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve visitor stats.' });
  }
});

module.exports = router;

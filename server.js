const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth').router;
const exhibitsRoutes = require('./routes/exhibits');
const aiGuideRoutes = require('./routes/aiGuide');
const gamesRoutes = require('./routes/games');
const journalRoutes = require('./routes/journal');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/exhibits', exhibitsRoutes);
app.use('/api/ai-guide', aiGuideRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/journal', journalRoutes);

// Museum Health / Info route
app.get('/api/info', (req, res) => {
  res.json({
    museum: "The Human Mind Museum",
    version: "2.5.0",
    status: "Operational",
    wings: 5,
    curator: "Dr. Sophia Vance",
    timestamp: new Date().toISOString()
  });
});

// Single Page Application fallback
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Museum server error:', err.stack);
  res.status(500).json({
    error: 'An unexpected neural glitch occurred within the museum server.',
    details: err.message
  });
});

app.listen(PORT, () => {
  console.log('=====================================================');
  console.log(`🧠  THE HUMAN MIND MUSEUM — ARCHITECTURE ONLINE`);
  console.log(`🏛️  Portal running at: http://localhost:${PORT}`);
  console.log(`🔬  AI Docent: Dr. Sophia Vance is standing by.`);
  console.log('=====================================================');
});

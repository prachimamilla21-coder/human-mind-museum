const express = require('express');
const router = express.Router();
const db = require('../database');

// Audio guide scripts for the 7 rooms
const audioScripts = {
  memory: "Welcome to Room 1: The Memory Room. As you step inside, notice the glowing synaptic terminals overhead. Here, we examine the machinery of working memory, Miller's law of short-term span, and the fragile plasticity of long-term recall.",
  emotion: "Welcome to Room 2: The Emotion Room. In this chamber, we deconstruct the visceral signals connecting the amygdala, the vagus nerve, and your conscious feelings. Observe Plutchik's color wheel and test your micro-expression recognition.",
  perception: "Welcome to Room 3: The Perception Room. Take a moment to adjust your gaze. What you perceive as stable physical reality is an ongoing, controlled hallucination constructed by your visual cortex. Prepare to watch your senses deceive you.",
  personality: "Welcome to Room 4: The Personality Room. Before you lies the multidimensional tapestry of human character. Explore the Big Five OCEAN taxonomy, challenge the myths of type categorization, and map your unique cognitive coordinates.",
  "cognitive-bias": "Welcome to Room 5: The Cognitive Bias Room. Here we enter the labyrinth of evolutionary heuristics. Discover why the human mind clings to confirming evidence, over-weights vivid memories, and falls prey to the sunk cost fallacy.",
  "decision-making": "Welcome to Room 6: The Decision-Making Room. Enter the crucible of choice. Experience Kahneman's System 1 wrestling with System 2, test the Monty Hall probability paradox, and examine how linguistic framing alters human risk tolerance.",
  "brain-lab": "Welcome to Room 7: The Brain Lab and AI Guide Room. This is the central computational nexus of the museum. Consult with Dr. Sophia Vance, explore the interactive psychology Q&A archives, and discover how neuroplasticity shapes who you become."
};

// Get all museum wings & exhibits
router.get('/', (req, res) => {
  try {
    const exhibits = db.getExhibits();
    res.json(exhibits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve exhibits.' });
  }
});

// Get single exhibit room with extended curation details
router.get('/:id', (req, res) => {
  try {
    const exhibit = db.getExhibitById(req.params.id);
    if (!exhibit) {
      return res.status(404).json({ error: 'Exhibit room not found.' });
    }

    const audioScript = audioScripts[req.params.id] || `Welcome to Room ${exhibit.wingNumber}: ${exhibit.title}. Explore the exhibits and interactive psychological experiments within.`;

    res.json({
      ...exhibit,
      audioGuideScript: audioScript
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exhibit detail.' });
  }
});

module.exports = router;

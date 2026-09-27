const express = require('express');
const router = express.Router();
const db = require('../database');

// Psychological knowledge graph for AI Guide Dr. Sophia Vance
const museumKnowledge = {
  greetings: [
    "Welcome to The Human Mind Museum. I am Dr. Sophia Vance, your Chief Neuro-Curator. Here, we don't merely observe artifacts—we turn the lens back upon the observer itself.",
    "Greetings, inquisitive traveler. I am Dr. Sophia Vance. Every corridor in this museum mirrors a structure inside your skull. Which mystery of the mind calls to you today?",
    "Step closer. I am Dr. Vance. Whether you wish to untangle the illusions of perception, master emotional resonance, or confront your Jungian shadow, I am here to guide your inquiry."
  ],
  rooms: {
    consciousness: "In Wing I, The Hall of Consciousness & Perception, we confront the legendary 'Hard Problem' posed by David Chalmers: why should physical neurochemical firings produce the subjective feeling of being alive? Notice how optical illusions like the Hermann Grid expose that your brain doesn't record reality—it manufactures a predictive hypothesis.",
    emotions: "In Wing II, The Gallery of Emotions, we dismantle the myth that reason and emotion are enemies. Antonio Damasio's somatic marker hypothesis showed that patients with severed connections between the emotional amygdala and rational prefrontal cortex can no longer make even the simplest everyday decisions.",
    memory: "In Wing III, The Memory Archive, you encounter the fluid nature of recollection. Hermann Ebbinghaus discovered that without review, we forget 70% of new information within 24 hours. Worse—or perhaps more wondrous—Elizabeth Loftus demonstrated that our memories can be rewritten every time we recall them.",
    decisions: "In Wing IV, The Cognitive Lab & Decision Chamber, we enter Daniel Kahneman's realm of System 1 and System 2. We like to imagine we are rational economic agents, but we are prisoners of anchoring, loss aversion, and framing effects. Try the Trolley Problem inside to inspect your moral heuristics.",
    identity: "In Wing V, The Mirror Maze of Self & Identity, we confront the grandest illusion: the unified ego. Through Michael Gazzaniga's split-brain patients and Carl Jung's concept of the Shadow, we see that the self is an ongoing narrative constructed by your left hemisphere's interpreter module."
  },
  quickTours: [
    {
      id: "tour-speed",
      title: "The 3-Minute Miracle Tour of the Mind",
      description: "A fast-paced journey connecting Perception, Emotion, and Decision-making.",
      steps: [
        "1. Start in Wing I: Realize that your eyes only see 50 bits/sec of the 11 million bits bombarding you.",
        "2. Walk into Wing II: See how Plutchik's emotion wheel maps survival vectors into subjective feeling.",
        "3. Conclude in Wing IV: Discover why your brain takes cognitive shortcuts to survive in a complex world."
      ]
    },
    {
      id: "tour-shadow",
      title: "The Subconscious & Shadow Exploration",
      description: "An introspective psychoanalytic deep-dive into dreams, repression, and archetypes.",
      steps: [
        "1. Enter Wing III: Explore the Subconscious Vault and the malleability of false memories.",
        "2. Step into Wing V: Stand before the Jungian Archetype mirrors and identify your unintegrated Shadow.",
        "3. Engage Dr. Vance in the AI Salon to analyze recurring symbols in your dreams."
      ]
    },
    {
      id: "tour-biases",
      title: "The Rationality Bootcamp Tour",
      description: "Deconstruct your cognitive blind spots and sharpen your critical thinking.",
      steps: [
        "1. Enter Wing IV: Engage with the Trolley Dilemma and Framing Effect chambers.",
        "2. Head to the Games Arcade: Play the Cognitive Bias Detective to spot logical fallacies in real-time.",
        "3. Review your Cognitive Flexibility Index on your Holographic Visitor Pass."
      ]
    }
  ]
};

// Intelligent psychological reasoning engine for Dr. Sophia Vance
function generateSophiaResponse(message, currentRoom, userProfile) {
  const msg = message.toLowerCase();

  // Room-specific inquiries
  if (msg.includes("consciousness") || msg.includes("perception") || msg.includes("illusion") || msg.includes("qualia")) {
    return `Ah, you are probing consciousness—the holy grail of cognitive neuroscience! What fascinates me most is that your brain is encased in total darkness within your skull, yet it fabricates this vibrant, colorful 3D reality. Have you explored the optical illusions in Wing I? They demonstrate that what you perceive is not light itself, but your brain's top-down statistical guess about what caused that light. Would you like me to guide you to the Gestalt sandbox?`;
  }

  if (msg.includes("emotion") || msg.includes("feeling") || msg.includes("fear") || msg.includes("anxiety") || msg.includes("love") || msg.includes("anger")) {
    return `Emotions are ancient navigational algorithms. As Lisa Feldman Barrett proved in her theory of constructed emotion, an emotion is your brain's prediction of what bodily sensations (heart rate, cortisol, breath) mean in a given context. In Wing II, you can interact with Plutchik's Wheel: notice how Fear plus Surprise becomes Awe. How does your body physically register stress or excitement right now? Try our Vagus Nerve Breathing Pacer to physically recalibrate your autonomic nervous system.`;
  }

  if (msg.includes("memory") || msg.includes("forget") || msg.includes("remember") || msg.includes("past") || msg.includes("nostalgia") || msg.includes("amnesia")) {
    return `Memory is one of the museum's most haunting exhibits. Most people believe memories are frozen photographs, but neurobiologically, remembering is a reconstructive act. When you recall an event, neurochemical synapses unlock during 'reconsolidation'. If someone suggests a detail, your hippocampus blends it into the story as if it were always there. Take a stroll into Wing III to test our False Memory simulator—it will astonish you how easily we can introduce phantom recollections.`;
  }

  if (msg.includes("decision") || msg.includes("bias") || msg.includes("trolley") || msg.includes("rational") || msg.includes("kahneman") || msg.includes("choice")) {
    return `Decision-making is the battleground between Daniel Kahneman's System 1 (instinctive, rapid, and heavily biased) and System 2 (meticulous, slow, and mentally exhausting). In our Decision Chamber (Wing IV), you can test your susceptibility to the Sunk Cost Fallacy and Anchoring Bias. For instance, did you know that seeing a high arbitrary number can subconsciously anchor your subsequent valuation of an object by up to 50%?`;
  }

  if (msg.includes("identity") || msg.includes("ego") || msg.includes("who am i") || msg.includes("self") || msg.includes("jung") || msg.includes("shadow")) {
    return `Who is the 'You' that is asking this question? Carl Jung posited that we all construct a 'Persona'—the social facade we present to polite society—while banishing unacceptable impulses into 'The Shadow'. Furthermore, Nobel laureate Roger Sperry's split-brain patients demonstrated that when the corpus callosum is cut, two separate consciousnesses awaken in one head! Visit Wing V to take the Jungian Archetype test and confront your reflection.`;
  }

  if (msg.includes("game") || msg.includes("stroop") || msg.includes("test") || msg.includes("challenge") || msg.includes("play")) {
    return `Looking to test your neural circuitry? I highly recommend our 4 Interactive Cognitive Games: 
1. The Stroop Effect Challenge (evaluates executive inhibition and frontal lobe interference)
2. The Working Memory Matrix (tests chunking and spatial recall capacity)
3. The Cognitive Bias Detective (challenges you to spot logical fallacies in tricky scenarios)
4. Micro-Expression Decoder (measures high-speed facial empathy recognition)
All results are dynamically scored and stamped directly onto your Holographic Visitor Pass!`;
  }

  if (msg.includes("tour") || msg.includes("guide me") || msg.includes("where should i go") || msg.includes("recommend")) {
    return `I would be delighted to curate a path for you! If you are short on time, try 'The 3-Minute Miracle Tour'. If you are feeling contemplative, I recommend starting with Wing V (Self & Identity) followed by a peaceful session in the Emotion Lounge. Which facet of your own mind are you most curious to dissect today?`;
  }

  if (msg.includes("freud") || msg.includes("dream") || msg.includes("subconscious")) {
    return `Sigmund Freud called dreams 'the royal road to the unconscious.' While modern neurobiology views REM sleep through the activation-synthesis model (the forebrain creating a story out of random brainstem firings), dream symbolism still reflects the emotional themes our waking mind avoids. What recurring motif or feeling have you noticed in your dreamscape?`;
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return `Greetings, ${userProfile?.username || 'esteemed visitor'}! I am Dr. Sophia Vance. How can I illuminate your visit to the museum today? You can ask me to explain any psychological experiment, request a curated tour, or ask deep questions about your own cognitive patterns.`;
  }

  // Contextual fallback response tailored to museum's mission
  return `That touches on a profound question in human psychology. In our museum, we seek to understand how the biological machinery of the brain generates subjective meaning, purposeful action, and social bonds. As you explore the 5 wings, keep in mind: the mind is both the observer and the observed. Is there a specific exhibit, cognitive bias, or psychological conundrum you'd like to explore in depth?`;
}

// AI Guide chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, currentRoom, userProfile } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    // Generate response from Dr. Sophia Vance
    const reply = generateSophiaResponse(message, currentRoom, userProfile);

    // Contextual suggested follow-ups
    const suggestions = [
      "Can we actually trust our own memories?",
      "Why does my brain fall for optical illusions?",
      "How does the Stroop Effect test cognitive control?",
      "Explain the Jungian Shadow archetype.",
      "Give me the 3-Minute Miracle Tour."
    ];

    res.json({
      reply,
      speaker: "Dr. Sophia Vance",
      role: "Chief Neuro-Curator & Cognitive Guide",
      timestamp: new Date().toISOString(),
      suggestions: suggestions.sort(() => 0.5 - Math.random()).slice(0, 3)
    });
  } catch (err) {
    console.error('AI Guide error:', err);
    res.status(500).json({ error: 'AI Guide communication interrupted.' });
  }
});

// Guided tour options
router.get('/tours', (req, res) => {
  res.json(museumKnowledge.quickTours);
});

// Exhibit spotlight audio/text commentary
router.get('/spotlight/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const commentary = museumKnowledge.rooms[roomId] || "Step into this wing to explore the marvels of human cognitive architecture.";
  res.json({
    roomId,
    docentCommentary: commentary,
    speaker: "Dr. Sophia Vance"
  });
});

module.exports = router;

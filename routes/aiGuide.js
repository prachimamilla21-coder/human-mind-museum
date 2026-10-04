const express = require('express');
const router = express.Router();
const db = require('../database');

// Psychological knowledge graph for AI Guide Dr. Sophia Vance across all 7 rooms
const museumKnowledge = {
  greetings: [
    "Welcome to The Human Mind Museum. I am Dr. Sophia Vance, your Chief Neuro-Curator. Here, we don't merely observe artifacts—we turn the lens back upon the observer itself.",
    "Greetings, inquisitive traveler. I am Dr. Sophia Vance. Every corridor in this museum mirrors an intricate structure inside your skull. Which of our seven rooms shall we explore first?",
    "Step closer. I am Dr. Vance. Whether you wish to untangle working memory, explore Plutchik's emotion wheel, shatter optical illusions, or probe cognitive biases, I am here to guide your inquiry."
  ],
  rooms: {
    memory: "In Room 1, The Memory Room, we confront the fluid, reconstructive nature of human recall. From Baddeley's working memory model and Miller's 7±2 law to Ebbinghaus's forgetting curve and Elizabeth Loftus's false memory studies, you will see why memory is not a recorded tape, but an ongoing active reconstruction.",
    emotion: "In Room 2, The Emotion Room, we dismantle the myth that reason and emotion are adversaries. Through Antonio Damasio's somatic marker hypothesis, Paul Ekman's universal facial micro-expressions, and Robert Plutchik's affective color wheel, discover how your limbic system and vagus nerve direct human behavior.",
    perception: "In Room 3, The Perception Room, we examine the sensory engine room. Your brain resides in perpetual pitch-blackness inside your skull, synthesizing an ongoing, top-down predictive hallucination. Explore the Müller-Lyer and Hermann Grid illusions, Gestalt closure laws, and the famous Stroop Effect.",
    personality: "In Room 4, The Personality Room, we analyze the multidimensional architecture of human character. We unpack the empirical Big Five OCEAN traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism), plot your scores on an interactive radar chart, and explore Carl Jung's archetypes and the Shadow.",
    "cognitive-bias": "In Room 5, The Cognitive Bias Room, we enter Daniel Kahneman and Amos Tversky's crucible of bounded rationality. Test your confirmation bias in Peter Wason's 2-4-6 game, discover why anchoring distorts prices, and learn how the sunk cost fallacy traps intelligent minds.",
    "decision-making": "In Room 6, The Decision-Making Room, we examine the mechanics of choice under risk and uncertainty. Engage with Marilyn vos Savant's counter-intuitive Monty Hall 3-Door problem, analyze Prospect Theory's loss aversion curve, and solve the Wason Selection 4-Card logic puzzle.",
    "brain-lab": "In Room 7, The Brain Lab & AI Guide Room, we unite empirical neuroscience with artificial intelligence. Explore 86 billion neurons, neurotransmitter pathways, and our comprehensive Psychology Q&A repository. Ask me anything!"
  },
  psychologyQA: [
    {
      category: "Cognitive Psychology",
      question: "What is Miller's Law and how does 'chunking' bypass it?",
      answer: "In 1956, George Miller proved that immediate working memory holds roughly 7 ± 2 discrete items. 'Chunking' bypasses this limit by grouping isolated stimuli into meaningful conceptual packages (e.g. remembering 'C-A-T-D-O-G' as two animals instead of 6 letters)."
    },
    {
      category: "Neuroscience",
      question: "What did the famous case of Phineas Gage reveal about the brain?",
      answer: "In 1848, an explosion blasted an iron rod through Gage's ventromedial prefrontal cortex. He survived physically, but his personality radically shifted from conscientious and polite to impulsive and profane, proving that specific cortical regions govern executive social conduct and personality."
    },
    {
      category: "Neuroscience",
      question: "Who was Patient H.M. and what did he teach us about memory?",
      answer: "Henry Molaison (H.M.) underwent bilateral removal of his medial temporal lobes (including hippocampi) to treat epilepsy in 1953. He lost the ability to form new episodic or semantic memories (anterograde amnesia), yet could still learn motor skills (procedural memory), demonstrating that declarative and procedural memory rely on distinct anatomical circuits."
    },
    {
      category: "Affective Science",
      question: "What is an 'Amygdala Hijack'?",
      answer: "Coined by Daniel Goleman, an amygdala hijack occurs when an acute emotional stressor causes the amygdala to trigger a fight-or-flight response via the thalamus before the slower, analytical prefrontal cortex can appraise the context and intervene."
    },
    {
      category: "Perception",
      question: "What is the Stroop Effect and why does it occur?",
      answer: "Published by J. Ridley Stroop in 1935, the effect demonstrates that reading printed words is an automatic, involuntary cognitive pathway. When asked to name ink colors of conflicting words (e.g. the word 'RED' printed in blue ink), the brain experiences cognitive interference and delayed reaction time."
    },
    {
      category: "Behavioral Economics",
      question: "What is Loss Aversion in Prospect Theory?",
      answer: "Discovered by Daniel Kahneman and Amos Tversky, loss aversion demonstrates that the psychological sting of losing $100 is roughly 2 to 2.5 times more intense than the pleasure of gaining $100, causing humans to act irrationally to avoid perceived losses."
    },
    {
      category: "Personality",
      question: "Why is the Big Five (OCEAN) considered more scientific than the MBTI?",
      answer: "The Big Five is derived from rigorous statistical factor analysis and measures continuous dimensions with high test-retest reliability and predictive validity. In contrast, MBTI forces continuous traits into arbitrary binary categories (e.g. Introvert vs Extravert) and exhibits poor test-retest consistency."
    },
    {
      category: "Cognitive Bias",
      question: "How does Confirmation Bias skew decision-making?",
      answer: "Confirmation bias is the tendency to search for, interpret, and recall information in a way that confirms prior hypotheses while disregarding counter-evidence. Peter Wason demonstrated this in his 1960 '2-4-6' task, where people rarely tested sequences designed to disprove their rule."
    }
  ],
  quickTours: [
    {
      id: "tour-speed",
      title: "The Core 7-Room Grand Expedition",
      description: "A fast-paced journey through all 7 educational psychology rooms.",
      steps: [
        "1. Memory Room: Miller's 7±2 law and Working Memory matrix.",
        "2. Emotion Room: Plutchik's affective wheel and micro-expressions.",
        "3. Perception Room: Optical illusions and the Stroop Effect.",
        "4. Personality Room: Big Five OCEAN radar psychometrics.",
        "5. Cognitive Bias Room: Wason's 2-4-6 confirmation bias trial.",
        "6. Decision-Making Room: Monty Hall 3-Door probability dilemma.",
        "7. Brain Lab: Deep Q&A with Dr. Sophia Vance."
      ]
    },
    {
      id: "tour-rationality",
      title: "The Rationality & Critical Thinking Tour",
      description: "Focus on deconstructing cognitive blind spots and logical fallacies.",
      steps: [
        "1. Enter Room 5 (Cognitive Bias): Unmask Anchoring and Confirmation Bias.",
        "2. Enter Room 6 (Decision-Making): Play Monty Hall and analyze Prospect Theory.",
        "3. Enter Room 3 (Perception): Observe how sensory heuristics construct illusions."
      ]
    }
  ]
};

// Intelligent psychological reasoning engine for Dr. Sophia Vance
function generateSophiaResponse(message, currentRoom, userProfile) {
  const msg = message.toLowerCase();

  // Room 1: Memory
  if (msg.includes("memory") || msg.includes("forget") || msg.includes("remember") || msg.includes("working memory") || msg.includes("amnesia") || msg.includes("loftus") || msg.includes("ebbinghaus")) {
    return `In Room 1 (The Memory Room), we deconstruct the myth that human memory is a photographic archive. In truth, every act of recall is an act of creation! Baddeley's Working Memory model demonstrates that our active mental workspace holds only 3-4 chunks at a time without rehearsal. And as Elizabeth Loftus showed in her famous 'Lost in the Mall' study, subtle suggestions can manufacture vivid, completely false memories. Have you tried our Working Memory Matrix game yet?`;
  }

  // Room 2: Emotion
  if (msg.includes("emotion") || msg.includes("feeling") || msg.includes("ekman") || msg.includes("plutchik") || msg.includes("facial expression") || msg.includes("micro-expression") || msg.includes("eq") || msg.includes("empathy")) {
    return `Emotions are ancient evolutionary heuristics. In Room 2 (The Emotion Room), Robert Plutchik's Wheel reveals how 8 primary affective states blend like pigments—for example, Joy combined with Trust yields Love, while Fear plus Surprise creates Awe. Meanwhile, Paul Ekman proved that 6 facial expressions are biologically universal. Test your reflex in our Micro-Expression Decoder to see if you can detect emotions flashing in under 1/5th of a second!`;
  }

  // Room 3: Perception
  if (msg.includes("perception") || msg.includes("illusion") || msg.includes("optical") || msg.includes("stroop") || msg.includes("see") || msg.includes("visual") || msg.includes("gestalt")) {
    return `Perception is not a passive video camera; it is a top-down controlled hallucination! In Room 3 (The Perception Room), optical illusions like the Müller-Lyer and Hermann Grid prove that your visual cortex guesses what caused the photons striking your retina. When you take the Stroop Effect test, you'll feel the immediate cognitive friction between your automatic reading reflex and your deliberate color-naming system!`;
  }

  // Room 4: Personality
  if (msg.includes("personality") || msg.includes("ocean") || msg.includes("big five") || msg.includes("mbti") || msg.includes("jung") || msg.includes("archetype") || msg.includes("traits") || msg.includes("shadow")) {
    return `In Room 4 (The Personality Room), we explore the scientific Big Five OCEAN model: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Unlike popular binary type indicators like MBTI, personality traits exist along continuous bell curves. You can take our interactive Big Five self-assessment to view your personalized Holographic Radar Chart!`;
  }

  // Room 5: Cognitive Bias
  if (msg.includes("bias") || msg.includes("heuristic") || msg.includes("fallacy") || msg.includes("confirmation bias") || msg.includes("anchoring") || msg.includes("sunk cost") || msg.includes("dunning-kruger")) {
    return `In Room 5 (The Cognitive Bias Room), we confront bounded rationality. Nobel laureates Daniel Kahneman and Amos Tversky revealed that our intuitive System 1 relies on mental shortcuts that frequently blunder. For example, confirmation bias compels us to seek only data that agrees with our existing beliefs. Try Peter Wason's 2-4-6 rule discovery task in Room 5 to see if you can outsmart your own confirmation bias!`;
  }

  // Room 6: Decision-Making
  if (msg.includes("decision") || msg.includes("monty hall") || msg.includes("risk") || msg.includes("trolley") || msg.includes("prospect theory") || msg.includes("wason selection") || msg.includes("choice")) {
    return `Room 6 (The Decision-Making Room) challenges human intuition with mathematical reality. In the classic Monty Hall 3-Door dilemma, switching doors doubles your win probability from 33.3% to 66.7%! Furthermore, Prospect Theory proves that humans are loss-averse: losing $100 hurts twice as much as gaining $100 feels good. Step into Room 6 to run the live Monty Hall probability simulator!`;
  }

  // Room 7: Brain Lab
  if (msg.includes("brain") || msg.includes("neuroscience") || msg.includes("neuron") || msg.includes("neurotransmitter") || msg.includes("dopamine") || msg.includes("plasticity") || msg.includes("phineas gage")) {
    return `Welcome to the Brain Lab! Inside your skull reside 86 billion neurons communicating through trillions of synaptic connections. Whether it is dopamine modulating reward expectation, acetylcholine consolidating memories in the hippocampus, or neuroplasticity physically rewiring circuits throughout your lifetime, the human brain is the universe's most extraordinary computational organ. What specific neural mystery would you like to investigate?`;
  }

  if (msg.includes("game") || msg.includes("play") || msg.includes("quiz") || msg.includes("score")) {
    return `Each of our 7 rooms offers educational games and mastery quizzes:
1. Memory Matrix & Digit Span in Room 1
2. Micro-Expression Decoder in Room 2
3. The Stroop Effect Challenge in Room 3
4. Big Five OCEAN Radar Assessment in Room 4
5. 2-4-6 Confirmation Bias Task in Room 5
6. Monty Hall Probability Simulator in Room 6
All your progress, badges, and quiz completions are tracked in your Progress Dashboard!`;
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return `Greetings, ${userProfile?.username || 'esteemed visitor'}! I am Dr. Sophia Vance, your AI guide. How can I illuminate your journey through The Human Mind Museum today?`;
  }

  // Contextual fallback response tailored to 7 rooms
  return `That touches on a profound question in psychological science. Across our seven educational rooms—Memory, Emotion, Perception, Personality, Cognitive Bias, Decision-Making, and the Brain Lab—we investigate how neural architecture gives rise to human consciousness and behavior. Which specific room or experiment would you like to explore deeper?`;
}

// AI Guide chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, currentRoom, userProfile } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const reply = generateSophiaResponse(message, currentRoom, userProfile);

    const suggestions = [
      "Explain the Big Five OCEAN personality model",
      "Why should you always switch doors in Monty Hall?",
      "How does the Stroop Effect test executive control?",
      "Can false memories be implanted?",
      "What is the difference between System 1 and System 2?"
    ];

    res.json({
      reply,
      speaker: "Dr. Sophia Vance",
      role: "Chief Neuro-Curator & AI Guide",
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

// Psychology Q&A repository for Room 7 (Brain Lab)
router.get('/qa', (req, res) => {
  res.json(museumKnowledge.psychologyQA);
});

// Exhibit spotlight audio/text commentary
router.get('/spotlight/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const commentary = museumKnowledge.rooms[roomId] || "Step into this room to explore the marvels of human cognitive architecture.";
  res.json({
    roomId,
    docentCommentary: commentary,
    speaker: "Dr. Sophia Vance"
  });
});

module.exports = router;

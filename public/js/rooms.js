// The Human Mind Museum - Seven Educational Psychology Rooms Controller
// Universal Hybrid Engine: Works offline, on GitHub Pages, and with Node/Express backend
const Wings = {
  exhibits: [
  {
    "id": "memory",
    "title": "Memory Room",
    "subtitle": "The cognitive architecture of encoding, consolidation, storage, and retrieval",
    "wingNumber": "1",
    "themeColor": "from-emerald-500/20 to-teal-600/10",
    "accentColor": "#34d399",
    "icon": "archive",
    "curatorQuote": "Memory is not a static recording played back from a disc; every time a memory is recalled, it is actively reconstructed and re-encoded.",
    "pioneers": [
      "Elizabeth Loftus",
      "Hermann Ebbinghaus",
      "Brenda Milner (Patient H.M.)",
      "Alan Baddeley"
    ],
    "brainRegions": [
      "Hippocampus",
      "Entorhinal Cortex",
      "Prefrontal Cortex",
      "Amygdala"
    ],
    "description": "Step into the deep vault of human memory. Deconstruct how fleeting electrical activity in synapses becomes structural biological connections, examine why our working memory is capped at a few discrete units, and explore how ancient mnemonic palaces allow extraordinary feats of recall.",
    "sections": [
      {
        "id": "working-memory",
        "letter": "a",
        "name": "Working Memory",
        "description": "Baddeley and Hitch's multi-component model shows that working memory is an active mental workspace rather than a passive holding pen. It consists of the Central Executive, the Phonological Loop (inner voice), the Visuospatial Sketchpad (inner eye), and the Episodic Buffer.",
        "keyPoints": [
          "Central Executive coordinates attention and suppresses irrelevant distractors.",
          "Phonological Loop retains acoustic and verbal information through subvocal rehearsal.",
          "Visuospatial Sketchpad manipulates visual and spatial representations.",
          "Capacity is typically limited to 3-4 information chunks when active manipulation is required."
        ]
      },
      {
        "id": "short-term-memory",
        "letter": "b",
        "name": "Short-Term Memory",
        "description": "George Miller's landmark 1956 finding revealed that human immediate span is approximately 7 ± 2 items (modern cognitive research estimates 4-5 discrete units without rehearsal). Without active rehearsal, short-term memory traces degrade within 15 to 30 seconds due to decay and interference.",
        "keyPoints": [
          "Miller's Law (7 ± 2 items) can be significantly expanded using strategic 'chunking'.",
          "Chunking groups raw stimuli (e.g. 1-9-8-4-2-0-0-1) into meaningful higher-order units (1984, 2001).",
          "Peterson & Peterson (1959) showed rapid decay occurs if rehearsal is blocked by backward counting."
        ]
      },
      {
        "id": "long-term-memory",
        "letter": "c",
        "name": "Long-Term Memory",
        "description": "Long-term memory branches into Explicit (Declarative) memory—which includes Episodic (autobiographical events) and Semantic (factual knowledge)—and Implicit (Non-declarative) memory—including Procedural skills (riding a bike) and emotional conditioning.",
        "keyPoints": [
          "Long-Term Potentiation (LTP) strengthens synaptic transmission across the hippocampus and cortex.",
          "Ebbinghaus's Forgetting Curve demonstrates that ~70% of new unreviewed data is lost within 24 hours.",
          "Spaced repetition flattens the forgetting curve and accelerates synaptic consolidation.",
          "Elizabeth Loftus demonstrated the 'Misinformation Effect'—memories are malleable and can be rewritten."
        ]
      },
      {
        "id": "memory-games",
        "letter": "d",
        "name": "Memory Games",
        "description": "Interactive neuro-cognitive training modules designed to measure and challenge your Working Memory span and spatial recall capacity under varying interference conditions.",
        "keyPoints": [
          "Spatial Span Memory Matrix: Replicate flashing tile grids of increasing complexity.",
          "Digit Span Forward & Backward: Challenge your phonological loop capacity.",
          "Method of Loci (Memory Palace) Interactive Walkthrough."
        ]
      }
    ],
    "interactiveModules": [
      "memory-matrix",
      "digit-span",
      "forgetting-curve-sim"
    ],
    "thoughtExperiment": {
      "title": "The Lost in the Mall Experiment (Elizabeth Loftus)",
      "scenario": "Psychologist Elizabeth Loftus presented participants with four childhood stories from their families. Three were true; one was completely fabricated: getting lost in a shopping mall at age five and crying until comforted by an elderly stranger.",
      "takeaway": "Over 25% of participants began 'remembering' rich sensory details of the fake event, proving memories are dynamically reconstructed rather than retrieved as immutable video recordings."
    },
    "quiz": [
      {
        "question": "According to Baddeley's model, which component of working memory is responsible for manipulating visual and spatial images?",
        "options": [
          "Phonological Loop",
          "Visuospatial Sketchpad",
          "Episodic Buffer",
          "Broca's Area"
        ],
        "correct": 1,
        "explanation": "The Visuospatial Sketchpad acts as the brain's 'inner eye', responsible for holding and manipulating spatial and visual information."
      },
      {
        "question": "What did George Miller's classic 1956 research identify as the magical span of immediate short-term memory?",
        "options": [
          "3 ± 1 items",
          "7 ± 2 items",
          "12 ± 4 items",
          "20 ± 5 items"
        ],
        "correct": 1,
        "explanation": "George Miller's landmark paper established that immediate short-term memory can typically hold 7 ± 2 items or chunks."
      },
      {
        "question": "Which brain structure was famously demonstrated by Patient H.M. to be crucial for forming new declarative memories?",
        "options": [
          "Cerebellum",
          "Hippocampus",
          "Occipital Lobe",
          "Medulla Oblongata"
        ],
        "correct": 1,
        "explanation": "After bilateral removal of his medial temporal lobes including the hippocampus, Patient H.M. could no longer form new episodic or semantic long-term memories."
      },
      {
        "question": "What is the primary way to prevent the rapid forgetting shown in Ebbinghaus's Forgetting Curve?",
        "options": [
          "Passive reading once",
          "Spaced repetition and active retrieval",
          "Subliminal sleep audio",
          "Hypnosis"
        ],
        "correct": 1,
        "explanation": "Spaced retrieval practice strengthens synaptic consolidation and systematically flattens the rate of forgetting over time."
      }
    ]
  },
  {
    "id": "emotion",
    "title": "Emotion Room",
    "subtitle": "The evolutionary symphony of the limbic system, affective appraisal, and somatic feelings",
    "wingNumber": "2",
    "themeColor": "from-rose-500/20 to-pink-600/10",
    "accentColor": "#fb7185",
    "icon": "heart-pulse",
    "curatorQuote": "Emotions are not irrational disruptions to cognition; they are ancient evolutionary heuristics forged over millions of years to guarantee survival.",
    "pioneers": [
      "Paul Ekman",
      "Robert Plutchik",
      "Lisa Feldman Barrett",
      "Antonio Damasio"
    ],
    "brainRegions": [
      "Amygdala",
      "Anterior Insula",
      "Ventral Striatum",
      "Hypothalamus",
      "Vagus Nerve"
    ],
    "description": "Explore the evolutionary matrix of feeling. Traverse Robert Plutchik's 3D emotional wheel, dissect micro-expressions that escape conscious masking, explore how bodily physiology influences your conscious mood, and test your emotional intelligence (EQ).",
    "sections": [
      {
        "id": "human-emotions",
        "letter": "a",
        "name": "Human Emotions",
        "description": "From William James to modern neuroscience, emotion theory traces how physiological sensations produce affect. Robert Plutchik's Wheel of Emotions identifies 8 primary emotional vectors (Joy, Trust, Fear, Surprise, Sadness, Disgust, Anger, Anticipation) that blend together into complex secondary and tertiary states.",
        "keyPoints": [
          "Plutchik's vectors blend like primary colors (Joy + Trust = Love; Fear + Surprise = Awe).",
          "James-Lange Theory: Bodily arousal occurs first, and the brain interprets the arousal as emotion ('We feel sorry because we cry').",
          "Schachter-Singer Two-Factor Theory: Emotion = Physiological Arousal + Cognitive Appraisal label.",
          "Lisa Feldman Barrett's Constructed Emotion: Emotions are constructed predictions, not hard-wired reactive circuits."
        ]
      },
      {
        "id": "facial-expressions",
        "letter": "b",
        "name": "Facial Expressions",
        "description": "Dr. Paul Ekman's worldwide cross-cultural studies in Papua New Guinea demonstrated that six basic facial expressions are biologically universal rather than culturally learned: Happiness, Sadness, Fear, Anger, Surprise, and Disgust (later adding Contempt).",
        "keyPoints": [
          "Facial Action Coding System (FACS) maps all 43 facial muscle movements into Action Units (AUs).",
          "Micro-expressions flash in 1/25th to 1/5th of a second when an individual attempts to conceal an emotion.",
          "Duchenne smile engages the orbicularis oculi muscle ('crow's feet' around the eyes), distinguishing genuine joy from fake polite smiles."
        ]
      },
      {
        "id": "emotional-intelligence",
        "letter": "c",
        "name": "Emotional Intelligence",
        "description": "Salovey, Mayer, and Daniel Goleman formulated Emotional Intelligence (EQ) as the capacity to recognize, understand, manage, and harness emotions in oneself and others. Damasio's Somatic Marker hypothesis showed that without emotional feedback, rational decision-making collapses.",
        "keyPoints": [
          "Four Pillars: Self-Awareness, Self-Regulation, Social Awareness (Empathy), and Relationship Management.",
          "Amygdala Hijacking: When intense stress causes the amygdala to trigger fight-or-flight before the prefrontal cortex can assess context.",
          "Cognitive Empathy (perspective-taking) vs Affective Empathy (feeling another's pain)."
        ]
      },
      {
        "id": "interactive-activities",
        "letter": "d",
        "name": "Interactive Activities",
        "description": "Hands-on affective labs: Examine the interactive Plutchik Emotion Wheel, test your micro-expression recognition reflex, and engage in the Vagus-pacing autonomic breathing biofeedback simulation.",
        "keyPoints": [
          "Plutchik 3D Color Wheel Explorer: Blend emotions and discover dynamic pairings.",
          "Micro-Expression Flash Test: Identify subtle emotions under time pressure.",
          "Vagus Nerve 4-7-8 Breathing Pacer: Regulate parasympathetic nervous system tone."
        ]
      }
    ],
    "interactiveModules": [
      "plutchik-wheel",
      "micro-expressions",
      "vagus-breathing-pacer"
    ],
    "thoughtExperiment": {
      "title": "The Suspension Bridge Experiment (Dutton & Aron, 1974)",
      "scenario": "Young men crossed either a terrifying, swaying 230-foot suspension bridge or a safe cedar bridge. An attractive female researcher approached them with a questionnaire and her phone number. Far more men from the suspension bridge called her asking for a date.",
      "takeaway": "The brain frequently misattributes autonomic physiological arousal (racing pulse and adrenaline from danger) as romantic attraction—illustrating cognitive appraisal of emotional states."
    },
    "quiz": [
      {
        "question": "Which facial muscle movement characterizes a genuine 'Duchenne smile' versus a posed polite smile?",
        "options": [
          "Contraction around the jawline",
          "Constriction of the pupils",
          "Contraction of orbicularis oculi muscles crinkling the eyes",
          "Flaring of the nostrils"
        ],
        "correct": 2,
        "explanation": "A genuine Duchenne smile involuntarily contracts the orbicularis oculi muscles around the outer eyes, creating distinctive 'crow's feet'."
      },
      {
        "question": "According to Robert Plutchik's Wheel of Emotions, what primary emotion blends with 'Joy' to form 'Love'?",
        "options": [
          "Anger",
          "Trust",
          "Fear",
          "Surprise"
        ],
        "correct": 1,
        "explanation": "In Plutchik's model, the primary dyads consist of adjacent emotions; Joy plus Trust yields the primary blend of Love."
      },
      {
        "question": "What term describes the sudden emotional takeover where the amygdala triggers fight-or-flight before the prefrontal cortex intervenes?",
        "options": [
          "Frontal Lobe Stupor",
          "Amygdala Hijack",
          "Synaptic Glitch",
          "Vagus Lock"
        ],
        "correct": 1,
        "explanation": "Coined by Daniel Goleman, 'Amygdala Hijack' refers to immediate emotional reactions that bypass slower cortical evaluation."
      },
      {
        "question": "How long does a true facial micro-expression typically last on the human face?",
        "options": [
          "Between 2 to 5 seconds",
          "1/25th to 1/5th of a second",
          "At least 1 full second",
          "Over 10 seconds"
        ],
        "correct": 1,
        "explanation": "Micro-expressions are fleeting involuntary facial movements that flash in a fraction of a second (1/25 to 1/5 of a second)."
      }
    ]
  },
  {
    "id": "perception",
    "title": "Perception Room",
    "subtitle": "Optical illusions, sensory gating, and how the brain hallucinates reality",
    "wingNumber": "3",
    "themeColor": "from-cyan-500/20 to-blue-600/10",
    "accentColor": "#38bdf8",
    "icon": "eye",
    "curatorQuote": "We do not see the world as it actually is; we see a controlled top-down hallucination constrained by sensory input.",
    "pioneers": [
      "William James",
      "Hermann von Helmholtz",
      "Max Wertheimer",
      "Kurt Koffka",
      "J. Ridley Stroop"
    ],
    "brainRegions": [
      "Occipital Lobe (V1-V5)",
      "Thalamus (LGN)",
      "Parietal Association Cortex",
      "Fusiform Face Area"
    ],
    "description": "Step into the sensory engine room. Your eyes transmit inverted 2D electrical pulses, yet your brain weaves a seamless, stabilized 3D panorama. Discover optical illusions that reveal where the brain's shortcuts slip, master Gestalt organizational laws, and take the famous Stroop Effect test.",
    "sections": [
      {
        "id": "optical-illusions",
        "letter": "a",
        "name": "Optical Illusions",
        "description": "Optical illusions are not failures of vision; they are proof that the visual cortex relies on top-down heuristics to guess depth, illumination, and geometry. Interactive exhibits feature the Müller-Lyer illusion, Kanizsa Triangle, Hermann Grid, and Café Wall illusion.",
        "keyPoints": [
          "Müller-Lyer Illusion: Identical line lengths appear unequal due to arrowheads signaling inward vs outward perspective corners.",
          "Kanizsa Triangle: The visual system generates illusory contours where none exist, completing familiar shapes automatically.",
          "Hermann Grid: Dark illusory ghost spots appear at intersections due to lateral inhibition in retinal ganglion cells.",
          "Café Wall Illusion: Parallel horizontal lines appear sloping due to alternating black-and-white tile luminance contrasts."
        ]
      },
      {
        "id": "visual-perception",
        "letter": "b",
        "name": "Visual Perception",
        "description": "Sensory organs receive 11 million bits of raw data per second, but conscious awareness processes merely 40-50 bits. Helmholtz described perception as 'Unconscious Inference'. The Gestalt School demonstrated that the whole is different from the sum of its parts.",
        "keyPoints": [
          "Gestalt Principles: Proximity, Similarity, Continuity, Closure, and Figure-Ground segregation.",
          "Depth Perception: Binocular cues (retinal disparity, convergence) combine with monocular cues (linear perspective, relative size, texture gradient).",
          "Dorsal vs Ventral Stream: The 'Where/How' parietal pathway vs the 'What' temporal pathway."
        ]
      },
      {
        "id": "brain-interpretation",
        "letter": "c",
        "name": "Brain Interpretation Exercises",
        "description": "Experience the computational conflict between automatic reflexive processing and intentional executive control. Take the classic 1935 Stroop Test, examine the Thatcher Illusion, and experience inattentional blindness.",
        "keyPoints": [
          "The Stroop Effect: Reading words is an automatic overlearned process that interferes with naming ink colors.",
          "Inattentional Blindness: Simons and Chabris demonstrated 50% of people miss a person in a gorilla suit when counting basketball passes.",
          "Thatcher Illusion: Inverted faces mask severe distortions because facial feature processing is orientation-specific."
        ]
      }
    ],
    "interactiveModules": [
      "stroop",
      "illusion-slider-lab",
      "gestalt-sandbox"
    ],
    "thoughtExperiment": {
      "title": "Mary the Color Scientist (Frank Jackson's Qualia Dilemma)",
      "scenario": "Mary is a brilliant neuroscientist raised in a black-and-white room. She masters every physical, chemical, and neurological fact about color vision. One day, she steps outside and sees a ripe red apple for the first time. Does she learn anything new?",
      "takeaway": "If Mary learns something new, physicalism is incomplete: subjective conscious experience ('qualia') cannot be purely reduced to objective neural equations."
    },
    "quiz": [
      {
        "question": "Why do dark illusory spots appear at the white intersections of the Hermann Grid illusion?",
        "options": [
          "Corneal astigmatism",
          "Lateral inhibition among retinal ganglion cells",
          "Color blindness",
          "Cerebral palsy"
        ],
        "correct": 1,
        "explanation": "Lateral inhibition causes stimulated photoreceptors to diminish the activity of neighboring receptors, darkening intersections where inhibition is highest."
      },
      {
        "question": "In the Stroop Effect test, what causes the delayed reaction time when reading the word 'BLUE' printed in red ink?",
        "options": [
          "Color receptor fatigue in cones",
          "Cognitive conflict between automatic reading and deliberate color naming",
          "Short-term memory loss",
          "Auditory distraction"
        ],
        "correct": 1,
        "explanation": "Reading is an automatic, overlearned process that creates cognitive interference when you must consciously override it to name ink color."
      },
      {
        "question": "Which Gestalt principle explains why your brain perceives a complete white triangle in the Kanizsa illusion even though no outline is drawn?",
        "options": [
          "Closure",
          "Proximity",
          "Common Fate",
          "Motion Parallax"
        ],
        "correct": 0,
        "explanation": "The principle of Closure causes the brain to fill in visual gaps to perceive familiar, complete, coherent shapes."
      },
      {
        "question": "Which visual cortical stream is known as the 'Where / How' pathway?",
        "options": [
          "Ventral Stream to temporal lobe",
          "Dorsal Stream to parietal lobe",
          "Olfactory tract",
          "Cochlear nucleus"
        ],
        "correct": 1,
        "explanation": "The Dorsal Stream projecting into the parietal lobe processes spatial location, motion, and guiding motor action ('Where/How')."
      }
    ]
  },
  {
    "id": "personality",
    "title": "Personality Room",
    "subtitle": "The Big Five traits, psychometric assessment, and archetypes of the self",
    "wingNumber": "4",
    "themeColor": "from-purple-500/20 to-indigo-600/10",
    "accentColor": "#c084fc",
    "icon": "user-check",
    "curatorQuote": "Personality is neither pure biology nor pure culture; it is the enduring pattern of thoughts, feelings, and behaviors that distinguish each human.",
    "pioneers": [
      "Gordon Allport",
      "Raymond Cattell",
      "Carl Jung",
      "Lewis Goldberg (Big Five)",
      "Robert McCrae & Paul Costa"
    ],
    "brainRegions": [
      "Prefrontal Cortex",
      "Default Mode Network",
      "Dopaminergic Reward Circuit",
      "Amygdala"
    ],
    "description": "Stand before the multidimensional mirror of human disposition. Unpack the scientific taxonomy of personality traits, complete an interactive Big Five OCEAN self-assessment with live radar chart visualization, and explore Jungian archetypes and the modern critique of MBTI.",
    "sections": [
      {
        "id": "personality-traits",
        "letter": "a",
        "name": "Personality Traits",
        "description": "Scientific trait theory originated through the Lexical Hypothesis: important human behavioral differences become encoded into everyday language over generations. Modern psychometrics centers upon the robust Big Five (OCEAN) model.",
        "keyPoints": [
          "Openness to Experience: Intellectual curiosity, artistic appreciation, unconventional thinking.",
          "Conscientiousness: Self-discipline, organization, goal-directed persistence, impulse control.",
          "Extraversion: Sociability, assertiveness, positive emotionality, sensitivity to rewards.",
          "Agreeableness: Compassion, trust, cooperation, empathy versus antagonism.",
          "Neuroticism: Emotional instability, anxiety, vulnerability to stress, negative affectivity."
        ]
      },
      {
        "id": "self-assessment-quiz",
        "letter": "b",
        "name": "Self-Assessment Quiz",
        "description": "Take the validated Big Five Mini-IPIP psychometric assessment directly inside the museum exhibit. Receive an immediate breakdown across all 5 dimensions plotted on an interactive holographic radar chart.",
        "keyPoints": [
          "Calibrated 10-item psychometric assessment with balanced positive and reverse-keyed items.",
          "Visualized on an SVG Radar / Spider Chart with percentiles.",
          "Personalized behavioral insights and cognitive strengths breakdown."
        ]
      },
      {
        "id": "personality-types",
        "letter": "c",
        "name": "Personality Types",
        "description": "Contrast the dimensional trait approach with categorical type theories. Trace Carl Jung's 1921 work 'Psychological Types', explore archetypes (Persona, Shadow, Anima/Animus, Self), and examine why modern academic psychology favors continuous traits over rigid MBTI categories.",
        "keyPoints": [
          "Type vs Trait: Personality exists on continuous bell curves (traits), not binary boxes (types).",
          "The Jungian Shadow: Repressed, unrecognized aspects of self that project onto opponents.",
          "The Barnum / Forer Effect: Why people gullibly believe generic, universally applicable personality descriptions."
        ]
      }
    ],
    "interactiveModules": [
      "ocean-test",
      "radar-chart",
      "archetype-explorer"
    ],
    "thoughtExperiment": {
      "title": "The Teletransporter Paradox (Derek Parfit)",
      "scenario": "A futuristic scanner records every subatomic particle in your body, disintegrates you on Earth, and beams the exact blueprint to Mars where a replication chamber rebuilds you molecule-for-molecule. Did you travel to Mars, or did you die on Earth while a clone woke up?",
      "takeaway": "Challenges whether personal identity is an unbroken physical entity or an illusory psychological continuity of memory, personality, and consciousness."
    },
    "quiz": [
      {
        "question": "Which of the Big Five personality dimensions reflects an individual's tendency toward organization, self-discipline, and dependability?",
        "options": [
          "Openness",
          "Conscientiousness",
          "Extraversion",
          "Agreeableness"
        ],
        "correct": 1,
        "explanation": "Conscientiousness describes traits related to impulse control, organization, goal-directed behavior, and persistence."
      },
      {
        "question": "What is the psychological phenomenon where individuals believe vague, generally positive personality descriptions apply specifically to them?",
        "options": [
          "The Barnum / Forer Effect",
          "The Pygmalion Effect",
          "The Hawthorne Effect",
          "The Halo Effect"
        ],
        "correct": 0,
        "explanation": "The Barnum (or Forer) Effect explains why astrology and non-scientific personality tests feel eerily accurate by using universal statements."
      },
      {
        "question": "Why do contemporary academic psychologists prefer the Big Five trait model over the Myers-Briggs Type Indicator (MBTI)?",
        "options": [
          "MBTI is too long to administer",
          "Human traits exist on continuous bell curves rather than artificial either/or dichotomies",
          "MBTI costs too much to compute",
          "The Big Five was invented earlier"
        ],
        "correct": 1,
        "explanation": "Personality characteristics are continuous dimensions normally distributed in the population, whereas MBTI forces continuous scores into artificial binary categories."
      },
      {
        "question": "According to Carl Jung, which archetype represents the hidden, unintegrated, and repressed facets of the psyche?",
        "options": [
          "The Persona",
          "The Shadow",
          "The Wise Old Man",
          "The Hero"
        ],
        "correct": 1,
        "explanation": "The Jungian Shadow encompasses the instinctual, unacceptable, or suppressed aspects of the personal and collective unconscious."
      }
    ]
  },
  {
    "id": "cognitive-bias",
    "title": "Cognitive Bias Room",
    "subtitle": "Heuristics, common thinking errors, and evolutionary shortcuts of the human mind",
    "wingNumber": "5",
    "themeColor": "from-amber-500/20 to-orange-600/10",
    "accentColor": "#fbbf24",
    "icon": "shield-alert",
    "curatorQuote": "We pride ourselves on being logical creatures, yet we are prisoners of ancient cognitive shortcuts designed for survival on the savannah, not modern statistics.",
    "pioneers": [
      "Daniel Kahneman",
      "Amos Tversky",
      "Peter Wason",
      "Dan Ariely",
      "Richard Thaler"
    ],
    "brainRegions": [
      "Dorsolateral Prefrontal Cortex",
      "Orbitofrontal Cortex",
      "Anterior Cingulate Cortex"
    ],
    "description": "Step into the chamber of mental traps. Human rationality is bounded: our brains use System 1 fast heuristics that work well enough in nature, but lead to systematic blunders in the modern world. Uncover confirmation bias, anchoring, and the sunk cost fallacy.",
    "sections": [
      {
        "id": "common-thinking-errors",
        "letter": "a",
        "name": "Common Thinking Errors",
        "description": "Kahneman and Tversky documented dozens of systematic deviations from rational judgment. We rely on heuristics—mental shortcuts that ease cognitive burden but generate predictable illusions.",
        "keyPoints": [
          "Confirmation Bias: Seeking, favoring, and remembering data that confirms preexisting beliefs while ignoring contradictions.",
          "Availability Heuristic: Overestimating the probability of events that easily spring to mind (e.g. plane crashes vs car accidents).",
          "Anchoring Bias: Over-relying on the first piece of information encountered when making estimates.",
          "Sunk Cost Fallacy: Continuing an endeavor once an investment of money, effort, or time has been made, regardless of current utility.",
          "Dunning-Kruger Effect: Low-ability individuals suffer from illusory superiority, overestimating their competence."
        ]
      },
      {
        "id": "bias-demonstrations",
        "letter": "b",
        "name": "Bias Demonstrations",
        "description": "Hands-on experiments where you will personally fall into cognitive traps! Try the interactive 2-4-6 Rule discovery game and the Anchoring Price challenge.",
        "keyPoints": [
          "Peter Wason's 2-4-6 Hypothesis Task: Test your confirmation bias by guessing the hidden number sequence rule.",
          "Anchoring Price Estimator: See how an arbitrary high or low initial number shifts your financial estimates.",
          "System 1 vs System 2 Conflict: The Bat & Ball riddle ($1.10 total, bat costs $1 more than ball)."
        ]
      },
      {
        "id": "real-life-examples",
        "letter": "c",
        "name": "Real-Life Examples",
        "description": "Examine how cognitive biases exert profound consequences across medical diagnoses, courtroom witness testimony, stock market bubbles, and social media polarization.",
        "keyPoints": [
          "Medicine: Diagnostic anchoring causes clinicians to overlook rare diseases after initial quick impressions.",
          "Finance: Loss aversion and overconfidence fuel market panic selling and asset bubbles.",
          "Justice System: Confirmation bias leads investigators to build cases around early suspects, ignoring counter-evidence.",
          "Social Media: Algorithmic echo chambers exploit confirmation bias and outrage heuristics to maximize engagement."
        ]
      }
    ],
    "interactiveModules": [
      "bias-246-task",
      "anchoring-lab",
      "bias-detective"
    ],
    "thoughtExperiment": {
      "title": "The Bat and Ball Problem (System 1 vs System 2)",
      "scenario": "A bat and a ball together cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost?",
      "takeaway": "Over 80% of university students spontaneously answer $0.10. System 1 offers an intuitive shortcut answer, but simple algebra (System 2) reveals the ball is $0.05 ($1.05 + $0.05 = $1.10)."
    },
    "quiz": [
      {
        "question": "Which cognitive bias explains why investors hold onto losing stocks to avoid admitting a loss, throwing good money after bad?",
        "options": [
          "Sunk Cost Fallacy",
          "Hindsight Bias",
          "Halo Effect",
          "Actor-Observer Asymmetry"
        ],
        "correct": 0,
        "explanation": "The Sunk Cost Fallacy compels people to persist in a failing course of action because of unrecoverable resources already committed."
      },
      {
        "question": "When people drastically overestimate the frequency of shark attacks compared to falling coconuts, which heuristic is primarily responsible?",
        "options": [
          "Availability Heuristic",
          "Anchoring Effect",
          "Representativeness Heuristic",
          "Fundamental Attribution Error"
        ],
        "correct": 0,
        "explanation": "The Availability Heuristic causes people to judge likelihood by how easily vivid, dramatic examples (like news stories of shark attacks) are recalled."
      },
      {
        "question": "What did Peter Wason's famous '2-4-6' number task demonstrate about human hypothesis testing?",
        "options": [
          "People are naturally Bayesian statisticians",
          "People primarily test hypotheses by seeking confirming evidence rather than disconfirming tests",
          "Humans cannot recognize ascending sequences",
          "Memory fails after 3 digits"
        ],
        "correct": 1,
        "explanation": "Participants repeatedly proposed sequences fitting their narrow hypothesis (e.g. 'evens increasing by 2') rather than attempting tests that would disprove their assumption."
      },
      {
        "question": "According to Kahneman's dual-process theory, what are the primary characteristics of System 1 thinking?",
        "options": [
          "Slow, effortful, analytical, and rule-governed",
          "Fast, automatic, subconscious, and heuristic-driven",
          "Only active during REM sleep",
          "Strictly mathematical"
        ],
        "correct": 1,
        "explanation": "System 1 operates automatically and swiftly with little or no effort, using evolutionary shortcuts and pattern recognition."
      }
    ]
  },
  {
    "id": "decision-making",
    "title": "Decision-Making Room",
    "subtitle": "Probability paradoxes, risk analysis, and logical reasoning dilemmas",
    "wingNumber": "6",
    "themeColor": "from-blue-500/20 to-indigo-600/10",
    "accentColor": "#60a5fa",
    "icon": "scale",
    "curatorQuote": "Between stimulus and response lies a choice. In that choice lies our human freedom, bounded by our probabilistic blindness.",
    "pioneers": [
      "Daniel Kahneman",
      "Amos Tversky",
      "Herbert Simon (Bounded Rationality)",
      "Marilyn vos Savant"
    ],
    "brainRegions": [
      "Ventromedial Prefrontal Cortex",
      "Anterior Insula",
      "Striatum",
      "Dorsolateral PFC"
    ],
    "description": "Step into the laboratory of choice. Engage with the Monty Hall probability dilemma, explore Kahneman and Tversky's Nobel Prize-winning Prospect Theory, and test your deductive reasoning with the Wason Selection Task.",
    "sections": [
      {
        "id": "decision-simulations",
        "letter": "a",
        "name": "Decision Simulations",
        "description": "Interactive decision dilemmas that pit human intuition against mathematical reality. Experience the Monty Hall 3-Door paradox and the classic Trolley Problem.",
        "keyPoints": [
          "The Monty Hall Problem: In a 3-door game with 1 prize, switching doors after the host reveals a goat doubles your win probability from 33.3% to 66.7%.",
          "The Trolley Problem: Utilitarian logic (switch track to save 5 and kill 1) vs Deontological moral intuition (refusing to actively push a bystander).",
          "Prisoner's Dilemma: Individual self-interest leads to mutually suboptimal outcomes; iterated versions reward 'Tit-for-Tat'."
        ]
      },
      {
        "id": "risk-analysis",
        "letter": "b",
        "name": "Risk Analysis",
        "description": "Classical economics assumed humans are rational utility maximizers. Kahneman and Tversky's Prospect Theory showed that human risk decisions are governed by psychological reference points and loss aversion.",
        "keyPoints": [
          "Loss Aversion: Losses loom roughly 2 to 2.5 times larger than equivalent gains (losing $100 feels worse than winning $100 feels good).",
          "Framing Effect: People are risk-averse when options are framed as gains ('200 lives saved') but risk-seeking when framed as losses ('400 people will die').",
          "Certainty Effect: People disproportionately overvalue absolute certainty compared to high probability."
        ]
      },
      {
        "id": "logical-thinking-activities",
        "letter": "c",
        "name": "Logical Thinking Activities",
        "description": "Hands-on deductive and formal reasoning puzzles. Engage with the Wason 4-Card Selection Task and syllogistic validity tests.",
        "keyPoints": [
          "Wason Selection Task: Test the rule 'If a card has a vowel, it has an even number on the other side' (testing cards [A, D, 4, 7]).",
          "Only ~10% of people select the logically correct cards (A and 7, testing modus ponens and modus tollens).",
          "Evolutionary Social Contract: When framed as a social rule ('Drinking beer requires age 21+'), accuracy skyrockets to over 75%!"
        ]
      }
    ],
    "interactiveModules": [
      "monty-hall-sim",
      "wason-card-task",
      "risk-framing-lab"
    ],
    "thoughtExperiment": {
      "title": "The Asian Disease Problem (Framing Paradox)",
      "scenario": "An unusual disease is expected to kill 600 people. Program A saves 200 people for sure. Program B has a 1/3 chance that 600 people are saved and 2/3 chance no one is saved. When presented this way, 72% choose A (risk-averse). But when presented as: Program C causes 400 people to die, Program D has 1/3 chance nobody dies and 2/3 chance 600 die, 78% choose D (risk-seeking)!",
      "takeaway": "Human risk appetite flips 180 degrees purely based on linguistic framing—gain vs loss—despite identical mathematical outcomes."
    },
    "quiz": [
      {
        "question": "In the classic Monty Hall problem with 3 doors, what happens to your win probability if you choose to SWITCH after the host opens a goat door?",
        "options": [
          "It stays at 33.3%",
          "It drops to 25%",
          "It doubles from 33.3% to 66.7%",
          "It becomes 50% regardless"
        ],
        "correct": 2,
        "explanation": "Your original door had a 1/3 chance of being correct. The remaining unchosen doors had a combined 2/3 chance, which collapses entirely onto the remaining unopened door once Monty reveals a goat."
      },
      {
        "question": "According to Prospect Theory, approximately how much more painful is a financial loss compared to an equivalent financial gain?",
        "options": [
          "Equal (1:1)",
          "Roughly twice as intense (2 to 2.5 times)",
          "Ten times more intense",
          "Half as intense"
        ],
        "correct": 1,
        "explanation": "Empirical experiments demonstrate that loss aversion causes losses to psychologically sting approximately 2 to 2.5 times more than the pleasure of equivalent gains."
      },
      {
        "question": "Given 4 cards showing [E, K, 4, 7], which cards MUST you flip to test the rule: 'If a card has a vowel, it has an even number on the back'?",
        "options": [
          "E and 4",
          "E and 7",
          "E, 4, and 7",
          "Only E"
        ],
        "correct": 1,
        "explanation": "You must flip 'E' (vowel) to verify it has an even number (modus ponens), and '7' (odd number) to verify it does NOT have a vowel (modus tollens). Flipping 4 does not test the rule because the rule does not state even numbers only belong to vowels."
      },
      {
        "question": "Herbert Simon introduced which Nobel Prize-winning concept to describe how humans settle for satisfactory decisions rather than computing optimal ones?",
        "options": [
          "Satisficing (Bounded Rationality)",
          "Absolute Maximization",
          "Darwinian Optimization",
          "Cognitive Inertia"
        ],
        "correct": 0,
        "explanation": "Herbert Simon coined 'Satisficing' within Bounded Rationality—humans seek solutions that meet a threshold of adequacy due to limited time and processing power."
      }
    ]
  },
  {
    "id": "brain-lab",
    "title": "Brain Lab / AI Guide Room",
    "subtitle": "Interactive neuroscience laboratory, neural mapping, and AI psychology docent",
    "wingNumber": "7",
    "themeColor": "from-amber-400/20 to-teal-500/10",
    "accentColor": "#f59e0b",
    "icon": "cpu",
    "curatorQuote": "The human brain is the most complex structure in the known universe: 86 billion neurons, each connected to thousands of others, forming a network with more synaptic states than atoms in the galaxy.",
    "pioneers": [
      "Santiago Ramón y Cajal",
      "Alan Turing",
      "Dr. Sophia Vance (AI Curator)",
      "Eric Kandel"
    ],
    "brainRegions": [
      "Neocortex",
      "Corpus Callosum",
      "Synaptic Cleft",
      "Neurotransmitter Pathways"
    ],
    "description": "Welcome to the central nexus of the museum. Here, human psychology meets modern computational neuroscience and artificial intelligence. Consult your AI Guide Dr. Sophia Vance for deep pedagogical explanations, test your knowledge in the Psychology Q&A repository, and explore neuroplasticity.",
    "sections": [
      {
        "id": "ai-powered-explanations",
        "letter": "a",
        "name": "AI-Powered Explanations",
        "description": "Dr. Sophia Vance is an interactive cognitive guide capable of explaining any psychological concept, synthesizing debates between historical psychoanalysis and contemporary neurobiology, and providing customized explanations suited to your learning level.",
        "keyPoints": [
          "Ask any question regarding psychology, neuropsychology, cognitive biases, or mental wellness.",
          "Synthesizes classical psychology (Freud, Jung, Skinner) with modern fMRI and connectome neuroscience.",
          "Context-aware: Dr. Sophia follows you into any museum room to provide instant exhibit breakdowns."
        ]
      },
      {
        "id": "psychology-qa",
        "letter": "b",
        "name": "Psychology Q&A",
        "description": "Curated interactive repository of foundational psychology inquiries, breakthrough experiments (Milgram, Stanford Prison, Phineas Gage, Little Albert), and neuroscience FAQs.",
        "keyPoints": [
          "Searchable and categorized across Cognitive, Social, Clinical, and Developmental Psychology.",
          "Case Studies: Phineas Gage (prefrontal damage and personality), Patient H.M. (hippocampus and memory).",
          "Neurotransmitter guide: Dopamine, Serotonin, GABA, Glutamate, Acetylcholine, and Endorphins."
        ]
      }
    ],
    "interactiveModules": [
      "ai-docent-console",
      "psychology-qa-vault",
      "neurotransmitter-lab"
    ],
    "thoughtExperiment": {
      "title": "The Chinese Room Argument (John Searle)",
      "scenario": "A person who understands no Chinese sits in a closed room with a rulebook. English instructions tell them: 'When given Chinese character X, reply with Chinese character Y.' To someone outside, the room appears fluent in Chinese. Does the person inside understand Chinese?",
      "takeaway": "Searle argued that syntax (symbol manipulation) does not equal semantics (true intentional understanding), raising deep questions about AI and human consciousness."
    },
    "quiz": [
      {
        "question": "Who is celebrated as the father of modern neuroscience for discovering that neurons are individual discrete cells rather than a continuous net?",
        "options": [
          "Santiago Ramón y Cajal",
          "Sigmund Freud",
          "Ivan Pavlov",
          "Carl Rogers"
        ],
        "correct": 0,
        "explanation": "Santiago Ramón y Cajal proved the 'Neuron Doctrine' using Golgi silver staining, demonstrating that neurons are discrete individual signaling units."
      },
      {
        "question": "What famous 1848 railroad worker's accidental frontal lobe injury provided the earliest evidence that the prefrontal cortex governs social behavior and personality?",
        "options": [
          "Patient H.M.",
          "Phineas Gage",
          "Little Albert",
          "Anna O."
        ],
        "correct": 1,
        "explanation": "Phineas Gage survived an iron rod through his ventromedial prefrontal cortex, which transformed his personality from polite and reliable to profane and impulsive."
      },
      {
        "question": "Which primary neurotransmitter is predominantly responsible for voluntary muscle activation and memory consolidation in the hippocampus?",
        "options": [
          "Acetylcholine",
          "Dopamine",
          "GABA",
          "Serotonin"
        ],
        "correct": 0,
        "explanation": "Acetylcholine (ACh) is essential for motor neuron signaling at neuromuscular junctions and plays a key role in hippocampal memory encoding."
      },
      {
        "question": "What does the term 'Neuroplasticity' describe in contemporary brain science?",
        "options": [
          "The brain is made of synthetic polymer compounds",
          "The brain's ability to reorganize neural pathways and synaptic connections throughout life",
          "The irreversible hardening of brain tissue in adulthood",
          "The speed of electrical conduction along axons"
        ],
        "correct": 1,
        "explanation": "Neuroplasticity refers to the brain's dynamic capacity to rewire synaptic connections, form new circuits, and adapt structurally in response to experience and learning."
      }
    ]
  }
],
  activeWingId: 'memory',
  activeSectionIndex: 0,
  quizAnswers: {},

  async init() {
    try {
      const res = await fetch('/api/exhibits');
      if (res.ok) {
        const liveExhibits = await res.json();
        if (liveExhibits && liveExhibits.length === 7) {
          this.exhibits = liveExhibits;
        }
      }
    } catch (e) {
      console.log('Running in client-side / GitHub Pages mode with embedded educational rooms data.');
    }

    this.renderHomeWings();
    this.renderTabs();
    this.renderActiveWing(this.activeWingId);
  },

  renderHomeWings() {
    const container = document.getElementById('homeWingsContainer');
    if (!container) return;

    container.innerHTML = this.exhibits.map(w => `
      <div onclick="Wings.selectWing('${w.id}')" class="group p-6 rounded-2xl border border-slate-800 bg-museum-900/60 hover:bg-museum-850 hover:border-slate-700 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono font-bold tracking-wider">
              ROOM ${w.wingNumber}
            </span>
            <span class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition">
              <i data-lucide="${w.icon || 'brain'}" class="w-5 h-5"></i>
            </span>
          </div>

          <h3 class="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition mb-2">
            ${w.title}
          </h3>
          <p class="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            ${w.subtitle}
          </p>

          <!-- Sub-sections preview (a, b, c, d) -->
          <div class="space-y-1.5 mb-4">
            ${(w.sections || []).map(s => `
              <div class="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <span class="w-4 h-4 rounded bg-slate-800/80 font-mono text-[10px] text-cyan-400 flex items-center justify-center font-bold">${s.letter}</span>
                <span class="truncate">${s.name}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>${w.sections ? w.sections.length : 4} Sections &bull; Quiz</span>
          <span class="text-cyan-400 flex items-center space-x-1 group-hover:translate-x-1 transition font-semibold">
            <span>Explore Room</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </span>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  renderTabs() {
    const container = document.getElementById('wingsTabsContainer');
    if (!container) return;

    container.innerHTML = this.exhibits.map(w => `
      <button onclick="Wings.selectWing('${w.id}')" data-wing-tab="${w.id}" class="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-2 ${
        this.activeWingId === w.id 
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10' 
          : 'bg-museum-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
      }">
        <span class="font-mono text-[10px] text-slate-400">R-${w.wingNumber}</span>
        <span>${w.title}</span>
      </button>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  selectWing(wingId) {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
    this.activeWingId = wingId;
    this.activeSectionIndex = 0;
    
    // Switch to rooms view if not active
    if (window.App && App.currentView !== 'wings') {
      App.navigateTo('wings');
    }

    this.renderTabs();
    this.renderActiveWing(wingId);

    // Record visit on pass
    if (window.Auth && Auth.recordRoomVisit) {
      Auth.recordRoomVisit(wingId);
    }
  },

  renderActiveWing(wingId) {
    const container = document.getElementById('activeWingContainer');
    if (!container) return;

    let w = this.exhibits.find(e => e.id === wingId) || this.exhibits[0];
    if (!w) return;

    const currentIndex = this.exhibits.findIndex(e => e.id === w.id);
    const prevRoom = currentIndex > 0 ? this.exhibits[currentIndex - 1] : null;
    const nextRoom = currentIndex < this.exhibits.length - 1 ? this.exhibits[currentIndex + 1] : null;

    container.innerHTML = `
      <!-- Room Navigation Bar & Room Walkthrough -->
      <div class="flex items-center justify-between bg-museum-900/60 border border-slate-800 p-3 rounded-2xl">
        <div class="flex items-center space-x-2">
          ${prevRoom ? `
            <button onclick="Wings.selectWing('${prevRoom.id}')" class="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center space-x-1.5 transition">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              <span class="hidden sm:inline">Room ${prevRoom.wingNumber}: ${prevRoom.title}</span>
              <span class="sm:hidden">Prev</span>
            </button>
          ` : `<span class="text-xs font-mono text-slate-600 px-3 py-1.5">First Room</span>`}
        </div>

        <div class="text-center">
          <span class="text-[11px] font-mono uppercase text-cyan-400 tracking-wider font-bold">Room ${w.wingNumber} of 7 &bull; ${w.title}</span>
        </div>

        <div class="flex items-center space-x-2">
          ${nextRoom ? `
            <button onclick="Wings.selectWing('${nextRoom.id}')" class="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center space-x-1.5 transition">
              <span class="hidden sm:inline">Next: ${nextRoom.title}</span>
              <span class="sm:hidden">Next</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          ` : `
            <button onclick="App.navigateTo('dashboard')" class="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-mono flex items-center space-x-1.5">
              <span>View Dashboard</span>
              <i data-lucide="award" class="w-3.5 h-3.5"></i>
            </button>
          `}
        </div>
      </div>

      <!-- Room Hero Banner -->
      <div class="rounded-3xl border border-slate-800 bg-gradient-to-r from-museum-900 via-museum-850 to-museum-900 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div class="max-w-3xl">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span class="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
              ROOM ${w.wingNumber}
            </span>
            <span class="text-xs font-mono text-slate-400 flex items-center space-x-1">
              <i data-lucide="activity" class="w-3.5 h-3.5 text-purple-400"></i>
              <span>Brain Regions: ${(w.brainRegions || []).join(', ')}</span>
            </span>
            <span class="text-xs font-mono text-slate-400 flex items-center space-x-1">
              <i data-lucide="users" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Key Pioneers: ${(w.pioneers || []).slice(0, 2).join(', ')}</span>
            </span>
          </div>

          <h1 class="font-display font-extrabold text-3xl sm:text-5xl text-white mb-3">
            ${w.title}
          </h1>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
            ${w.description}
          </p>

          <blockquote class="border-l-2 border-cyan-400 pl-4 py-1.5 italic text-xs sm:text-sm text-cyan-200/90 mb-6 bg-cyan-500/5 rounded-r-lg">
            "${w.curatorQuote}"
          </blockquote>

          <div class="flex flex-wrap gap-3 items-center">
            <button onclick="Wings.playDocentNarration('${w.id}')" class="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-semibold flex items-center space-x-2 transition">
              <i data-lucide="headphones" class="w-4 h-4"></i>
              <span>Audio Guide Narration</span>
            </button>

            <button onclick="Wings.askAIGuide('${w.id}')" class="px-5 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center space-x-2 transition">
              <i data-lucide="sparkles" class="w-4 h-4 text-purple-400"></i>
              <span>Consult Dr. Sophia</span>
            </button>

            <button onclick="Wings.scrollToQuiz('${w.id}')" class="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center space-x-2 transition">
              <i data-lucide="check-circle-2" class="w-4 h-4"></i>
              <span>Room Mastery Quiz</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Seven Psychology Rooms Sub-sections (a, b, c, d) -->
      <div>
        <div class="flex items-center space-x-2 mb-4">
          <span class="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <i data-lucide="layers" class="w-4 h-4"></i>
          </span>
          <h3 class="font-display font-bold text-xl text-white">Curated Exhibit Sections</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${(w.sections || []).map((sec) => `
            <div class="p-6 rounded-2xl border border-slate-800 bg-museum-900/60 hover:bg-museum-850/80 transition flex flex-col justify-between">
              <div>
                <div class="flex items-center space-x-3 mb-3">
                  <span class="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                    ${sec.letter}
                  </span>
                  <h4 class="font-display font-bold text-lg text-white">${sec.name}</h4>
                </div>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  ${sec.description}
                </p>
                ${sec.keyPoints && sec.keyPoints.length ? `
                  <ul class="space-y-1.5 border-t border-slate-800/80 pt-3">
                    ${sec.keyPoints.map(kp => `
                      <li class="text-xs text-slate-400 flex items-start space-x-2">
                        <span class="text-cyan-400 mt-0.5">&bull;</span>
                        <span>${kp}</span>
                      </li>
                    `).join('')}
                  </ul>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Interactive Phenomenon Lab -->
      <div class="rounded-3xl border border-slate-800 bg-museum-900/80 p-6 sm:p-10 shadow-xl">
        <div class="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
          <span class="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <i data-lucide="binary" class="w-5 h-5"></i>
          </span>
          <div>
            <h3 class="font-display font-bold text-xl text-white">Interactive Hands-on Lab</h3>
            <p class="text-xs text-slate-400">Experience this room's psychological phenomena in real time.</p>
          </div>
        </div>

        <div id="wingInteractiveArea">
          ${this.renderInteractiveModule(wingId)}
        </div>
      </div>

      <!-- Thought Experiment Section -->
      ${w.thoughtExperiment ? `
        <div class="rounded-2xl border border-purple-500/30 bg-purple-950/10 p-6 sm:p-8">
          <div class="flex items-center space-x-2 text-xs font-mono text-purple-400 mb-2">
            <i data-lucide="lightbulb" class="w-4 h-4"></i>
            <span>CURATOR'S THOUGHT EXPERIMENT</span>
          </div>
          <h4 class="font-display font-bold text-xl text-white mb-3">${w.thoughtExperiment.title}</h4>
          <p class="text-slate-300 text-sm leading-relaxed mb-4">${w.thoughtExperiment.scenario}</p>
          <div class="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
            <strong class="font-mono text-purple-300 uppercase tracking-wider block mb-1">Psychological Implication:</strong>
            ${w.thoughtExperiment.takeaway}
          </div>
        </div>
      ` : ''}

      <!-- Interactive Room Mastery Quiz Section -->
      <div id="roomQuizSection" class="rounded-3xl border border-amber-500/30 bg-museum-900/90 p-6 sm:p-10 shadow-2xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3">
            <span class="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <i data-lucide="help-circle" class="w-5 h-5"></i>
            </span>
            <div>
              <h3 class="font-display font-bold text-xl text-white">Room ${w.wingNumber} Mastery Quiz</h3>
              <p class="text-xs text-slate-400">Answer 4 questions to stamp your visitor pass and unlock your room badge.</p>
            </div>
          </div>
          <span class="text-xs font-mono text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
            Passing: 3/4 Correct (75%)
          </span>
        </div>

        <div id="quizContainer-${w.id}">
          ${this.renderQuiz(w)}
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    this.attachInteractiveEventListeners(wingId);
  },

  scrollToQuiz(roomId) {
    const el = document.getElementById('roomQuizSection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  },

  renderQuiz(room) {
    const questions = room.quiz || [];
    if (!questions.length) return `<p class="text-xs text-slate-500">Quiz questions loading...</p>`;

    // Check if user already took this quiz
    const existing = (window.Auth && Auth.currentUser && Auth.currentUser.quizResults) 
      ? Auth.currentUser.quizResults[room.id] 
      : null;

    return `
      ${existing ? `
        <div class="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <span class="text-xs text-amber-300 font-mono">
            Recorded Score: <strong>${existing.score}/${existing.total}</strong> (${Math.round((existing.score/existing.total)*100)}%) ${existing.score >= 3 ? '&bull; Badge Unlocked 🎉' : ''}
          </span>
          <span class="text-[11px] text-slate-400">You can retake anytime!</span>
        </div>
      ` : ''}

      <form id="quizForm-${room.id}" onsubmit="Wings.handleQuizSubmit(event, '${room.id}')" class="space-y-6">
        ${questions.map((q, qIdx) => `
          <div id="qBlock-${room.id}-${qIdx}" class="p-5 rounded-2xl bg-museum-950 border border-slate-800/80 transition-all duration-300">
            <p class="font-semibold text-sm text-white mb-3 flex items-start space-x-2">
              <span class="font-mono text-xs text-amber-400 mt-0.5">Q${qIdx + 1}.</span>
              <span>${q.question}</span>
            </p>
            <div class="space-y-2">
              ${q.options.map((opt, optIdx) => `
                <label id="optLabel-${room.id}-${qIdx}-${optIdx}" class="flex items-center space-x-3 p-3 rounded-xl bg-museum-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
                  <input type="radio" name="q_${qIdx}" value="${optIdx}" required class="text-amber-500 focus:ring-amber-500">
                  <span class="text-xs text-slate-300">${opt}</span>
                </label>
              `).join('')}
            </div>
            <div id="qFeedback-${room.id}-${qIdx}" class="hidden mt-3 p-3 rounded-xl text-xs leading-relaxed font-mono"></div>
          </div>
        `).join('')}

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button type="submit" id="quizSubmitBtn-${room.id}" class="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-museum-950 font-bold text-xs tracking-wider uppercase transition shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2">
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Submit Quiz Answers</span>
          </button>
          
          <div id="quizResult-${room.id}" class="text-xs font-mono"></div>
        </div>
      </form>
    `;
  },

  async handleQuizSubmit(e, roomId) {
    e.preventDefault();
    const room = this.exhibits.find(e => e.id === roomId);
    if (!room || !room.quiz) return;

    let score = 0;
    const total = room.quiz.length;
    const form = e.target;

    // Evaluate each question with visual feedback and explanations
    room.quiz.forEach((q, qIdx) => {
      const selected = form.querySelector(`input[name="q_${qIdx}"]:checked`);
      const userChoice = selected ? parseInt(selected.value) : -1;
      const isCorrect = (userChoice === q.correct);
      if (isCorrect) score++;

      const feedbackEl = document.getElementById(`qFeedback-${roomId}-${qIdx}`);
      const blockEl = document.getElementById(`qBlock-${roomId}-${qIdx}`);

      // Color labels
      q.options.forEach((opt, optIdx) => {
        const label = document.getElementById(`optLabel-${roomId}-${qIdx}-${optIdx}`);
        if (label) {
          if (optIdx === q.correct) {
            label.classList.add('border-emerald-500/60', 'bg-emerald-950/30', 'text-emerald-200');
          } else if (optIdx === userChoice && !isCorrect) {
            label.classList.add('border-rose-500/60', 'bg-rose-950/30', 'text-rose-200');
          }
        }
      });

      if (feedbackEl) {
        feedbackEl.classList.remove('hidden');
        if (isCorrect) {
          feedbackEl.className = 'mt-3 p-3 rounded-xl text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono';
          feedbackEl.innerHTML = `<strong>✓ Correct!</strong> ${q.explanation}`;
        } else {
          feedbackEl.className = 'mt-3 p-3 rounded-xl text-xs bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono';
          feedbackEl.innerHTML = `<strong>✗ Incorrect.</strong> Correct answer: "${q.options[q.correct]}".<br><span class="text-slate-300 font-sans">${q.explanation}</span>`;
        }
      }
    });

    const resultBox = document.getElementById(`quizResult-${roomId}`);
    const percent = Math.round((score / total) * 100);
    const passed = score >= 3;

    // Badges by room
    const badgeMap = {
      memory: 'Memory Architect',
      emotion: 'Empathy Master',
      perception: 'Illusion Breaker',
      personality: 'OCEAN Pioneer',
      'cognitive-bias': 'Bias Hunter',
      'decision-making': 'Strategic Thinker',
      'brain-lab': 'Neuro Scholar'
    };
    const earnedBadge = badgeMap[roomId] || 'Room Scholar';

    // Update visitor user profile in localStorage & memory
    if (!Auth.currentUser) {
      Auth.generateGuestPass();
    }

    if (Auth.currentUser) {
      Auth.currentUser.quizResults = Auth.currentUser.quizResults || {};
      Auth.currentUser.quizResults[roomId] = { score, total, percent, date: new Date().toISOString() };
      
      Auth.currentUser.badges = Auth.currentUser.badges || [];
      if (passed && !Auth.currentUser.badges.includes(earnedBadge)) {
        Auth.currentUser.badges.push(earnedBadge);
      }

      // Check if all 7 quizzes passed
      if (Object.keys(Auth.currentUser.quizResults).length >= 7 && !Auth.currentUser.badges.includes('Master of Mind')) {
        Auth.currentUser.badges.push('Master of Mind');
      }

      localStorage.setItem(Auth.userKey, JSON.stringify(Auth.currentUser));
      Auth.renderHeader();
    }

    if (passed) {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('success');
      resultBox.innerHTML = `
        <div class="text-right">
          <div class="text-emerald-400 font-bold text-sm">🎉 PASSED! ${score}/${total} (${percent}%)</div>
          <div class="text-amber-300 text-[11px] font-mono mt-0.5">🏆 Badge Earned: ${earnedBadge}!</div>
          <button type="button" onclick="Wings.renderActiveWing('${roomId}')" class="mt-2 text-cyan-400 underline text-xs">Retake Quiz</button>
        </div>
      `;
      if (window.App) App.showToast(`🎉 Quiz Passed! Score ${score}/${total}. "${earnedBadge}" badge unlocked!`);
    } else {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
      resultBox.innerHTML = `
        <div class="text-right">
          <div class="text-amber-400 font-bold text-sm">Score: ${score}/${total} (${percent}%)</div>
          <div class="text-slate-400 text-[11px] font-mono mt-0.5">Need 3/4 to pass. Check the explanations above!</div>
          <button type="button" onclick="Wings.renderActiveWing('${roomId}')" class="mt-2 px-3 py-1 rounded bg-amber-500/20 text-amber-300 text-xs">Try Again</button>
        </div>
      `;
    }

    // Attempt backend sync if online
    if (window.Auth && Auth.isLoggedIn()) {
      try {
        const token = Auth.getToken();
        fetch('/api/auth/record-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ roomId, score, total })
        }).catch(() => {});
      } catch (err) {}
    }
  },

  // Generates specific interactive UI for each of the 7 rooms
  renderInteractiveModule(roomId) {
    // 1. Memory Room
    if (roomId === 'memory') {
      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h4 class="font-display font-bold text-lg text-white">Working Memory & Chunking Test</h4>
                <p class="text-xs text-slate-400">Can you remember an 11-digit number without chunking vs with chunking?</p>
              </div>
              <button onclick="Wings.toggleChunkingDemo()" id="chunkBtn" class="mt-2 sm:mt-0 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition">
                Toggle Chunking Strategy
              </button>
            </div>

            <div class="text-center py-6">
              <div id="chunkDisplay" class="font-mono text-3xl font-bold tracking-widest text-cyan-300 mb-3">
                19842001911
              </div>
              <p id="chunkExplanation" class="text-xs font-mono text-slate-400">
                Raw sequence: 11 isolated items — overwhelms Miller's 7±2 immediate span.
              </p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 class="font-display font-bold text-base text-white">Full Memory Matrix Challenge</h4>
              <p class="text-xs text-slate-400">Play the high-speed spatial span test in the Cognitive Arcade.</p>
            </div>
            <button onclick="App.navigateTo('games'); Games.launch('memory-matrix')" class="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 transition">
              <i data-lucide="play" class="w-3.5 h-3.5"></i>
              <span>Launch Memory Matrix</span>
            </button>
          </div>
        </div>
      `;
    }

    // 2. Emotion Room
    if (roomId === 'emotion') {
      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">Plutchik's Primary Emotional Vectors</h4>
            <p class="text-xs text-slate-400 mb-4">Click an emotion to explore its evolutionary function and primary blend pairings:</p>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <button onclick="Wings.selectEmotion('joy')" class="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold text-xs transition hover:scale-105">✨ Joy</button>
              <button onclick="Wings.selectEmotion('trust')" class="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition hover:scale-105">🤝 Trust</button>
              <button onclick="Wings.selectEmotion('fear')" class="p-3 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 font-semibold text-xs transition hover:scale-105">⚡ Fear</button>
              <button onclick="Wings.selectEmotion('surprise')" class="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition hover:scale-105">😲 Surprise</button>
              <button onclick="Wings.selectEmotion('sadness')" class="p-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-semibold text-xs transition hover:scale-105">💧 Sadness</button>
              <button onclick="Wings.selectEmotion('disgust')" class="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-semibold text-xs transition hover:scale-105">🤢 Disgust</button>
              <button onclick="Wings.selectEmotion('anger')" class="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-semibold text-xs transition hover:scale-105">🔥 Anger</button>
              <button onclick="Wings.selectEmotion('anticipation')" class="p-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 font-semibold text-xs transition hover:scale-105">🔭 Anticipation</button>
            </div>

            <div id="emotionDetailBox" class="p-5 rounded-xl bg-museum-900 border border-slate-800 text-sm">
              <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">Emotion Analysis: Joy</span>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                <strong>Evolutionary Vector:</strong> Resource acquisition & social bonding.
              </p>
              <p class="text-slate-400 text-xs">
                <strong>Primary Blend:</strong> Joy + Trust = <span class="text-rose-300 font-bold">Love</span> &bull; Joy + Anticipation = <span class="text-amber-300 font-bold">Optimism</span>.
              </p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800 text-center">
            <h4 class="font-display font-bold text-lg text-white mb-2">Somatic Resonator: 4-7-8 Vagus Breathing Pacer</h4>
            <p class="text-xs text-slate-400 mb-6">Down-regulate sympathetic fight-or-flight by pacing diaphragmatic breathing.</p>
            <div class="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
              <div id="pacerCircle" class="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500/40 to-blue-600/40 border-2 border-cyan-400 flex items-center justify-center shadow-xl transition-all duration-1000">
                <span id="pacerText" class="font-display font-bold text-xs text-white">Inhale (4s)</span>
              </div>
            </div>
            <button onclick="Wings.toggleBreathingPacer()" id="pacerBtn" class="px-6 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition">
              Start Somatic Cycle
            </button>
          </div>
        </div>
      `;
    }

    // 3. Perception Room
    if (roomId === 'perception') {
      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h4 class="font-display font-bold text-lg text-white">Müller-Lyer Illusion Slider</h4>
                <p class="text-xs text-slate-400">Do the two horizontal bars look equal? Use the ruler toggle to reveal their physical length:</p>
              </div>
              <button onclick="Wings.toggleMullerRuler()" class="mt-2 sm:mt-0 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition">
                Toggle Alignment Lines
              </button>
            </div>

            <div class="relative w-full max-w-md mx-auto py-8 bg-slate-900/80 rounded-xl p-6 border border-slate-800 text-center">
              <div class="relative inline-block mb-8">
                <div class="w-64 h-1.5 bg-cyan-400 rounded"></div>
                <span class="absolute -left-3 -top-2 text-cyan-300 font-bold">&gt;</span>
                <span class="absolute -right-3 -top-2 text-cyan-300 font-bold">&lt;</span>
              </div>
              <br>
              <div class="relative inline-block">
                <div class="w-64 h-1.5 bg-cyan-400 rounded"></div>
                <span class="absolute -left-3 -top-2 text-cyan-300 font-bold">&lt;</span>
                <span class="absolute -right-3 -top-2 text-cyan-300 font-bold">&gt;</span>
              </div>
              <div id="mullerRuler" class="hidden absolute inset-0 border-x-2 border-dashed border-rose-500 pointer-events-none mx-auto w-64"></div>
            </div>
            <p class="text-center text-xs text-slate-400 mt-3 font-mono">
              Inward fins signal depth receding into distance; outward fins signal closer corners.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 class="font-display font-bold text-base text-white">Interactive Stroop Effect Test</h4>
              <p class="text-xs text-slate-400">Measure your millisecond cognitive interference in the Cognitive Arcade.</p>
            </div>
            <button onclick="App.navigateTo('games'); Games.launch('stroop')" class="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center space-x-2 transition">
              <i data-lucide="play" class="w-3.5 h-3.5"></i>
              <span>Launch Stroop Test</span>
            </button>
          </div>
        </div>
      `;
    }

    // 4. Personality Room
    if (roomId === 'personality') {
      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">The Big Five (OCEAN) Interactive Explorer</h4>
            <p class="text-xs text-slate-400 mb-6">Explore the 5 continuous dimensions of human personality:</p>

            <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
              <button onclick="Wings.selectOcean('O')" class="p-4 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">O</span>
                <span class="font-bold text-sm block text-white">Openness</span>
                <span class="text-[10px] text-slate-400">Curiosity & Ideas</span>
              </button>
              <button onclick="Wings.selectOcean('C')" class="p-4 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">C</span>
                <span class="font-bold text-sm block text-white">Conscientious</span>
                <span class="text-[10px] text-slate-400">Discipline & Plans</span>
              </button>
              <button onclick="Wings.selectOcean('E')" class="p-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">E</span>
                <span class="font-bold text-sm block text-white">Extraversion</span>
                <span class="text-[10px] text-slate-400">Sociability & Vitality</span>
              </button>
              <button onclick="Wings.selectOcean('A')" class="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">A</span>
                <span class="font-bold text-sm block text-white">Agreeable</span>
                <span class="text-[10px] text-slate-400">Empathy & Trust</span>
              </button>
              <button onclick="Wings.selectOcean('N')" class="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">N</span>
                <span class="font-bold text-sm block text-white">Neuroticism</span>
                <span class="text-[10px] text-slate-400">Stress Reactivity</span>
              </button>
            </div>

            <div id="oceanDetailBox" class="p-5 rounded-xl bg-museum-900 border border-slate-800 text-sm">
              <span class="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">Dimension: Openness to Experience</span>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                Individuals high in Openness exhibit an appetite for novelty, intellectual curiosity, artistic appreciation, and unconventional perspectives.
              </p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 class="font-display font-bold text-base text-white">Big Five Radar Psychometric Assessment</h4>
              <p class="text-xs text-slate-400">Map your personal OCEAN scores on a dynamic holographic radar chart.</p>
            </div>
            <button onclick="App.navigateTo('games'); Games.launch('ocean-test')" class="px-5 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center space-x-2 transition">
              <i data-lucide="radar" class="w-3.5 h-3.5"></i>
              <span>Take OCEAN Assessment</span>
            </button>
          </div>
        </div>
      `;
    }

    // 5. Cognitive Bias Room
    if (roomId === 'cognitive-bias') {
      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">Peter Wason's 2-4-6 Confirmation Bias Task</h4>
            <p class="text-xs text-slate-400 mb-4">The sequence <strong>2, 4, 6</strong> conforms to a secret rule. Propose three numbers to test if they follow the rule:</p>

            <div class="flex items-center space-x-3 mb-4">
              <input type="number" id="wasonN1" placeholder="8" class="w-20 bg-museum-900 border border-slate-800 rounded-xl p-2.5 text-center text-sm text-white focus:border-amber-400 focus:outline-none">
              <input type="number" id="wasonN2" placeholder="10" class="w-20 bg-museum-900 border border-slate-800 rounded-xl p-2.5 text-center text-sm text-white focus:border-amber-400 focus:outline-none">
              <input type="number" id="wasonN3" placeholder="12" class="w-20 bg-museum-900 border border-slate-800 rounded-xl p-2.5 text-center text-sm text-white focus:border-amber-400 focus:outline-none">
              <button onclick="Wings.testWason246()" class="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition">
                Test Sequence
              </button>
            </div>

            <div id="wasonResultBox" class="p-4 rounded-xl bg-museum-900 border border-slate-800 text-xs text-slate-300 font-mono">
              Most people test sequences like 8, 10, 12 or 100, 102, 104 assuming the rule is "even numbers increasing by 2". But the true rule is simply: <strong class="text-amber-400">"Any ascending numbers"</strong>! To discover it, you must test disconfirming sequences like 1, 2, 3 or 5, 10, 20.
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 class="font-display font-bold text-base text-white">Full Cognitive Bias Detective</h4>
              <p class="text-xs text-slate-400">Hunt down logical fallacies and heuristics across realistic dilemmas.</p>
            </div>
            <button onclick="App.navigateTo('games'); Games.launch('bias-detective')" class="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center space-x-2 transition">
              <i data-lucide="play" class="w-3.5 h-3.5"></i>
              <span>Launch Bias Detective</span>
            </button>
          </div>
        </div>
      `;
    }

    // 6. Decision-Making Room
    if (roomId === 'decision-making') {
      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">The Monty Hall 3-Door Dilemma</h4>
            <p class="text-xs text-slate-400 mb-6">Behind one door is a luxury car; behind two doors are goats. Choose a door:</p>

            <div class="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6" id="montyDoorsGrid">
              <div onclick="Wings.pickMontyDoor(0)" id="door-0" class="h-32 rounded-2xl bg-museum-900 border-2 border-slate-700 hover:border-blue-400 cursor-pointer flex flex-col items-center justify-center transition">
                <i data-lucide="door-closed" class="w-8 h-8 text-blue-400 mb-2"></i>
                <span class="font-mono text-xs text-white font-bold">Door 1</span>
              </div>
              <div onclick="Wings.pickMontyDoor(1)" id="door-1" class="h-32 rounded-2xl bg-museum-900 border-2 border-slate-700 hover:border-blue-400 cursor-pointer flex flex-col items-center justify-center transition">
                <i data-lucide="door-closed" class="w-8 h-8 text-blue-400 mb-2"></i>
                <span class="font-mono text-xs text-white font-bold">Door 2</span>
              </div>
              <div onclick="Wings.pickMontyDoor(2)" id="door-2" class="h-32 rounded-2xl bg-museum-900 border-2 border-slate-700 hover:border-blue-400 cursor-pointer flex flex-col items-center justify-center transition">
                <i data-lucide="door-closed" class="w-8 h-8 text-blue-400 mb-2"></i>
                <span class="font-mono text-xs text-white font-bold">Door 3</span>
              </div>
            </div>

            <div id="montyStatusBox" class="p-4 rounded-xl bg-museum-900 border border-slate-800 text-center text-xs text-slate-300">
              Select one of the three doors to start the probability trial.
            </div>
          </div>
        </div>
      `;
    }

    // 7. Brain Lab / AI Guide Room
    if (roomId === 'brain-lab') {
      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <i data-lucide="cpu" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-display font-bold text-lg text-white">AI Psychology Docent Console</h4>
                <p class="text-xs text-slate-400">Dr. Sophia Vance is ready to explain any psychological research in depth.</p>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-museum-900 border border-slate-800 flex items-center justify-between">
              <span class="text-xs text-slate-300">Have a question about neurochemistry, sleep consolidation, or split-brain theory?</span>
              <button onclick="App.navigateTo('ai-guide')" class="px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center space-x-1.5 transition">
                <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                <span>Open AI Docent Salon</span>
              </button>
            </div>
          </div>

          <!-- Psychology Q&A Section -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">Psychology Q&A Repository</h4>
            <p class="text-xs text-slate-400 mb-4">Key foundational questions & answers in psychology and neuroscience:</p>

            <div class="space-y-3" id="psychologyQAList">
              <div class="p-4 rounded-xl bg-museum-900 border border-slate-800">
                <div class="font-bold text-xs text-cyan-300 mb-1">What did Patient H.M. reveal about memory?</div>
                <div class="text-xs text-slate-300 leading-relaxed">After bilateral hippocampal resection in 1953, he suffered severe anterograde amnesia (unable to form new declarative memories), yet his procedural motor learning remained intact—proving memory systems are anatomically segregated.</div>
              </div>
              <div class="p-4 rounded-xl bg-museum-900 border border-slate-800">
                <div class="font-bold text-xs text-amber-300 mb-1">What was the significance of Phineas Gage's accident?</div>
                <div class="text-xs text-slate-300 leading-relaxed">In 1848, an iron rod pierced Gage's ventromedial prefrontal cortex. His physical recovery was swift, but his personality shifted from polite and reliable to profane and reckless, providing the earliest clinical evidence linking frontal lobes to social regulation.</div>
              </div>
              <div class="p-4 rounded-xl bg-museum-900 border border-slate-800">
                <div class="font-bold text-xs text-emerald-300 mb-1">What is Neuroplasticity?</div>
                <div class="text-xs text-slate-300 leading-relaxed">The brain's lifelong ability to dynamically reorganize synaptic connections and neural pathways in response to learning, experience, and recovery from injury.</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  },

  attachInteractiveEventListeners(wingId) {
    if (wingId === 'decision-making') {
      this.initMontyHall();
    }
  },

  // Interactive Helpers
  toggleChunkingDemo() {
    const disp = document.getElementById('chunkDisplay');
    const exp = document.getElementById('chunkExplanation');
    const btn = document.getElementById('chunkBtn');
    if (!disp) return;

    if (disp.textContent.includes('-')) {
      disp.textContent = '19842001911';
      exp.textContent = "Raw sequence: 11 isolated items — overwhelms Miller's 7±2 immediate span.";
      btn.textContent = 'Toggle Chunking Strategy';
    } else {
      disp.textContent = '1984 - 2001 - 911';
      exp.textContent = "Chunked into 3 meaningful semantic concepts (1984, 2001, 911) — fits easily in working memory!";
      btn.textContent = 'Revert to Raw Digits';
    }
  },

  toggleMullerRuler() {
    const r = document.getElementById('mullerRuler');
    if (r) r.classList.toggle('hidden');
  },

  selectEmotion(emotion) {
    const box = document.getElementById('emotionDetailBox');
    if (!box) return;

    const data = {
      joy: { title: "Joy", func: "Resource acquisition & social bonding", blend: "Joy + Trust = Love • Joy + Anticipation = Optimism" },
      trust: { title: "Trust", func: "Alliance formation & safety mutualism", blend: "Trust + Joy = Love • Trust + Fear = Submission" },
      fear: { title: "Fear", func: "Threat evasion & autonomic survival mobilization", blend: "Fear + Surprise = Awe • Fear + Trust = Submission" },
      surprise: { title: "Surprise", func: "Orientation reflex to novel stimuli", blend: "Surprise + Fear = Awe • Surprise + Sadness = Disapproval" },
      sadness: { title: "Sadness", func: "Conserves energy & elicits social empathy/care", blend: "Sadness + Disgust = Remorse • Sadness + Anger = Envy" },
      disgust: { title: "Disgust", func: "Pathogen and contamination avoidance", blend: "Disgust + Anger = Contempt • Disgust + Sadness = Remorse" },
      anger: { title: "Anger", func: "Obstacle removal & defense of resources", blend: "Anger + Disgust = Contempt • Anger + Anticipation = Aggressiveness" },
      anticipation: { title: "Anticipation", func: "Preparation and proactive planning", blend: "Anticipation + Joy = Optimism • Anticipation + Anger = Aggressiveness" }
    }[emotion] || { title: "Emotion", func: "Survival orientation", blend: "Dynamic Affective Coordinates" };

    box.innerHTML = `
      <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">Emotion Analysis: ${data.title}</span>
      <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
        <strong>Evolutionary Vector:</strong> ${data.func}.
      </p>
      <p class="text-slate-400 text-xs">
        <strong>Primary Blend:</strong> ${data.blend}.
      </p>
    `;
  },

  selectOcean(letter) {
    const box = document.getElementById('oceanDetailBox');
    if (!box) return;

    const oceanData = {
      O: { name: "Openness to Experience", desc: "Intellectual curiosity, artistic sensitivity, unconventional ideas, and vivid imagination vs practical, conventional pragmatism." },
      C: { name: "Conscientiousness", desc: "Goal-directed behavior, impulse control, self-discipline, systematic planning, and reliability vs spontaneity and carelessness." },
      E: { name: "Extraversion", desc: "Sensitivity to dopamine rewards, sociability, assertiveness, enthusiasm, and high energy vs quiet introversion and solitary recharge." },
      A: { name: "Agreeableness", desc: "Prosocial orientation, empathy, altruism, cooperativeness, and trust vs competitive skepticism and antagonism." },
      N: { name: "Neuroticism", desc: "Vulnerability to negative affect, threat vigilance, anxiety, emotional volatility, and stress reactivity vs calm emotional stability." }
    }[letter];

    box.innerHTML = `
      <span class="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">Dimension: ${oceanData.name}</span>
      <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
        ${oceanData.desc}
      </p>
    `;
  },

  testWason246() {
    const n1 = parseFloat(document.getElementById('wasonN1').value);
    const n2 = parseFloat(document.getElementById('wasonN2').value);
    const n3 = parseFloat(document.getElementById('wasonN3').value);
    const box = document.getElementById('wasonResultBox');
    if (!box) return;

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      box.textContent = "Please enter three valid numbers to test.";
      return;
    }

    const fitsRule = (n1 < n2 && n2 < n3);
    if (fitsRule) {
      box.innerHTML = `<span class="text-emerald-400 font-bold">YES! (${n1}, ${n2}, ${n3}) conforms to the secret rule.</span><br>Did you test to confirm an assumption, or to disprove your rule? Remember, the true rule is: <em>"Any ascending numbers"</em>.`;
    } else {
      box.innerHTML = `<span class="text-rose-400 font-bold">NO! (${n1}, ${n2}, ${n3}) does NOT conform to the rule.</span><br>Congratulations on testing a disconfirming hypothesis!`;
    }
  },

  // Breathing pacer
  pacerTimer: null,
  isPacing: false,
  toggleBreathingPacer() {
    const btn = document.getElementById('pacerBtn');
    const circle = document.getElementById('pacerCircle');
    const text = document.getElementById('pacerText');
    if (!btn || !circle || !text) return;

    if (this.isPacing) {
      clearInterval(this.pacerTimer);
      this.isPacing = false;
      btn.textContent = 'Start Somatic Cycle';
      text.textContent = 'Ready';
      circle.style.transform = 'scale(1)';
      return;
    }

    this.isPacing = true;
    btn.textContent = 'Stop Cycle';
    let phase = 0; // 0 = Inhale (4s), 1 = Hold (7s), 2 = Exhale (8s)

    const runPhase = () => {
      if (!this.isPacing) return;
      if (phase === 0) {
        text.textContent = 'Inhale (4s)';
        circle.style.transform = 'scale(1.4)';
        circle.style.transitionDuration = '4s';
        this.pacerTimer = setTimeout(() => { phase = 1; runPhase(); }, 4000);
      } else if (phase === 1) {
        text.textContent = 'Hold (7s)';
        circle.style.transitionDuration = '0s';
        this.pacerTimer = setTimeout(() => { phase = 2; runPhase(); }, 7000);
      } else {
        text.textContent = 'Exhale (8s)';
        circle.style.transform = 'scale(1)';
        circle.style.transitionDuration = '8s';
        this.pacerTimer = setTimeout(() => { phase = 0; runPhase(); }, 8000);
      }
    };
    runPhase();
  },

  // Monty Hall State
  montyState: { carDoor: 0, pickedDoor: null, revealedGoat: null, stage: 0 },
  initMontyHall() {
    this.montyState.carDoor = Math.floor(Math.random() * 3);
    this.montyState.pickedDoor = null;
    this.montyState.revealedGoat = null;
    this.montyState.stage = 0;
  },

  pickMontyDoor(doorIndex) {
    const status = document.getElementById('montyStatusBox');
    if (!status) return;

    if (this.montyState.stage === 0) {
      this.montyState.pickedDoor = doorIndex;
      const otherDoors = [0, 1, 2].filter(d => d !== doorIndex && d !== this.montyState.carDoor);
      const hostDoor = otherDoors[Math.floor(Math.random() * otherDoors.length)];
      this.montyState.revealedGoat = hostDoor;
      this.montyState.stage = 1;

      document.getElementById(`door-${doorIndex}`).classList.add('border-cyan-400', 'bg-cyan-950/40');
      const goatDoorEl = document.getElementById(`door-${hostDoor}`);
      goatDoorEl.innerHTML = `
        <span class="text-2xl mb-1">🐐</span>
        <span class="font-mono text-xs text-rose-300 font-bold">Goat Revealed!</span>
      `;
      goatDoorEl.classList.add('border-rose-500/50', 'bg-rose-950/20');

      const remainingDoor = [0, 1, 2].find(d => d !== doorIndex && d !== hostDoor);

      status.innerHTML = `
        <p class="font-semibold text-white mb-2">You picked Door ${doorIndex + 1}. Host Monty opened Door ${hostDoor + 1} to reveal a GOAT!</p>
        <p class="text-cyan-300 font-mono text-xs mb-3">Do you want to STAY with Door ${doorIndex + 1} or SWITCH to Door ${remainingDoor + 1}?</p>
        <div class="flex justify-center space-x-3">
          <button onclick="Wings.finalizeMonty(false)" class="px-4 py-2 rounded-lg bg-museum-950 border border-slate-700 text-slate-300 text-xs font-mono">STAY (Door ${doorIndex + 1})</button>
          <button onclick="Wings.finalizeMonty(true)" class="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">SWITCH (Door ${remainingDoor + 1})</button>
        </div>
      `;
    }
  },

  finalizeMonty(didSwitch) {
    const status = document.getElementById('montyStatusBox');
    if (!status) return;

    const remainingDoor = [0, 1, 2].find(d => d !== this.montyState.pickedDoor && d !== this.montyState.revealedGoat);
    const finalDoor = didSwitch ? remainingDoor : this.montyState.pickedDoor;
    const won = finalDoor === this.montyState.carDoor;

    const carEl = document.getElementById(`door-${this.montyState.carDoor}`);
    if (carEl) {
      carEl.innerHTML = `
        <span class="text-2xl mb-1">🏎️</span>
        <span class="font-mono text-xs text-amber-300 font-bold">CAR!</span>
      `;
      carEl.classList.add('border-amber-400', 'bg-amber-950/30');
    }

    if (won) {
      status.innerHTML = `
        <span class="text-emerald-400 font-bold text-sm block mb-1">🎉 YOU WON THE CAR!</span>
        <span class="text-slate-300 text-xs">Switching doors gives you a <strong>66.7% win probability</strong> (vs 33.3% if you stay). Bayesian reasoning triumphs!</span>
        <div class="mt-3"><button onclick="Wings.initMontyHall(); Wings.selectWing('decision-making')" class="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono">Play Again</button></div>
      `;
    } else {
      status.innerHTML = `
        <span class="text-rose-400 font-bold text-sm block mb-1">Behind this door was a goat! 🐐</span>
        <span class="text-slate-300 text-xs">Statistically, switching is twice as likely to win. Try another trial to watch the probability curve emerge!</span>
        <div class="mt-3"><button onclick="Wings.initMontyHall(); Wings.selectWing('decision-making')" class="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono">Play Again</button></div>
      `;
    }
  },

  // Audio & Docent integration
  playDocentNarration(wingId) {
    const room = this.exhibits.find(e => e.id === wingId);
    const title = room ? room.title : wingId;
    if (window.AudioAmbiance) {
      AudioAmbiance.speak(`Welcome to ${title}. Step inside and observe the psychological exhibits.`);
    }
    if (window.App) {
      App.showToast(`Audio Guide: Dr. Sophia Vance narration active for ${title}.`);
    }
  },

  askAIGuide(wingId) {
    if (window.App) App.navigateTo('ai-guide');
    if (window.AIGuide) {
      const input = document.getElementById('aiGuideInput');
      if (input) {
        input.value = `Tell me more about the psychological phenomena in the ${wingId} room.`;
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.Wings = Wings;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Wings;
}

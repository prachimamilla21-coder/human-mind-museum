// Psychology Rooms & Interactive Exhibits Controller
const Wings = {
  exhibits: [],
  activeWingId: 'consciousness',

  async init() {
    try {
      const res = await fetch('/api/exhibits');
      if (res.ok) {
        this.exhibits = await res.json();
      } else {
        throw new Error('Using offline exhibits');
      }
    } catch (e) {
      // Fallback for GitHub Pages static hosting
      this.exhibits = [
        {
          id: "consciousness",
          title: "The Hall of Consciousness & Perception",
          subtitle: "How 86 billion neurons weave the illusion of subjective reality",
          wingNumber: "I",
          themeColor: "from-cyan-500/20 to-blue-600/10",
          accentColor: "#38bdf8",
          icon: "eye",
          curatorQuote: "We do not see things as they are, we see them as we are wired to interpret them.",
          pioneers: ["William James", "David Chalmers", "V.S. Ramachandran"],
          brainRegions: ["Occipital Lobe", "Thalamus", "Default Mode Network (DMN)"],
          description: "Consciousness remains the ultimate frontier of human science-often called the 'Hard Problem'. In this wing, step through the sensory filter, examine optical illusions where your brain hallucinates stability, and investigate the phenomenon of sensory gating.",
          keyConcepts: [
            { name: "Sensory Gating & Thalamic Filtering", summary: "Every second, your sensory organs receive 11 million bits of information, but your conscious mind can only process approximately 50 bits per second." },
            { name: "Gestalt Principles of Organization", summary: "The brain instinctively groups disconnected visual inputs into cohesive shapes through proximity, similarity, continuity, and closure." },
            { name: "The Predictive Brain Hypothesis", summary: "Perception is not a passive camera feed; it is an active top-down controlled hallucination constrained by sensory feedback." }
          ],
          interactiveModules: ["optical-illusions", "sensory-gate-sim", "gestalt-sandbox"],
          thoughtExperiment: {
            title: "Mary the Color Scientist (Frank Jackson's Dilemma)",
            scenario: "Mary is a brilliant neuroscientist who lives in a black-and-white room and learns every physical and neurological fact about color perception. One day, she steps outside and sees a ripe red apple for the first time. Does she learn anything new?",
            takeaway: "If Mary learns something new, physicalism is incomplete: subjective conscious experience ('qualia') cannot be purely reduced to objective neural equations."
          }
        },
        {
          id: "emotions",
          title: "The Gallery of Emotions & Affect",
          subtitle: "The visceral symphony of the limbic system and emotional architecture",
          wingNumber: "II",
          themeColor: "from-rose-500/20 to-pink-600/10",
          accentColor: "#fb7185",
          icon: "heart-pulse",
          curatorQuote: "Emotions are not irrational disruptions; they are ancient biological heuristics forged over millions of years for survival.",
          pioneers: ["Paul Ekman", "Robert Plutchik", "Lisa Feldman Barrett"],
          brainRegions: ["Amygdala", "Anterior Insula", "Ventral Striatum"],
          description: "Explore the evolutionary matrix of feeling. Traverse Robert Plutchik's 3D emotional wheel, dissect micro-expressions, and experience somatic feedback connecting the vagus nerve to gut-brain intuition.",
          keyConcepts: [
            { name: "Plutchik's Vector of Affect", summary: "Emotions blend like primary colors. Fear combined with Surprise yields Awe; Joy blended with Trust blossoms into Love." },
            { name: "The Somatic Marker Hypothesis", summary: "Damasio showed that without bodily emotional sensations, human decision-making becomes paralyzed, even when logic is intact." },
            { name: "Constructed Emotion Theory", summary: "Emotions are concepts constructed by the brain in real-time to make sense of bodily sensations." }
          ],
          interactiveModules: ["plutchik-wheel", "vagus-breathing-pacer", "mood-frequency-generator"],
          thoughtExperiment: {
            title: "The Bridge of Capilano (Dutton & Aron Misattribution Experiment)",
            scenario: "Young men crossed either a terrifying, swaying 230-foot suspension bridge or a safe cedar bridge. An attractive experimenter interviewed them and offered her phone number. Far more men from the suspension bridge called her back.",
            takeaway: "The brain frequently misattributes autonomic physiological arousal (racing heart from fear) as romantic attraction."
          }
        },
        {
          id: "memory",
          title: "The Memory Archive & Subconscious Vault",
          subtitle: "The fragile tapestry of encoding, storage, retrieval, and confabulation",
          wingNumber: "III",
          themeColor: "from-emerald-500/20 to-teal-600/10",
          accentColor: "#34d399",
          icon: "archive",
          curatorQuote: "Memory is not a video recording stored in a vault; every time you remember something, you rewrite the file.",
          pioneers: ["Elizabeth Loftus", "Hermann Ebbinghaus", "Brenda Milner"],
          brainRegions: ["Hippocampus", "Entorhinal Cortex", "Prefrontal Cortex"],
          description: "Step into the deep vault of recollections. Witness how synaptic plasticity encodes fleeting moments, why reconsolidation leaves memories vulnerable to alteration, and how the Method of Loci enables feats of recall.",
          keyConcepts: [
            { name: "Long-Term Potentiation (LTP)", summary: "Neurons that fire together wire together. High-frequency signals crystallize transient experiences into physical brain structure." },
            { name: "False Memories & Misinformation", summary: "Dr. Elizabeth Loftus proved that subtle misinformation can manufacture vivid, completely false memories of events that never occurred." },
            { name: "Working Memory vs Consolidation", summary: "Working memory holds roughly 4 to 7 chunks of data for seconds before hippocampal replay consolidates them during slow-wave sleep." }
          ],
          interactiveModules: ["false-memory-lab", "method-of-loci-room", "forgetting-curve-sim"],
          thoughtExperiment: {
            title: "The Lost in the Mall Experiment",
            scenario: "Psychologist Elizabeth Loftus told participants four childhood stories provided by their families. Three were true; one was completely fabricated: getting lost in a shopping mall at age five and rescued by an elderly woman.",
            takeaway: "Over 25% of participants began 'remembering' rich details of the fake event, proving memories are reconstructed rather than played back."
          }
        },
        {
          id: "decisions",
          title: "The Cognitive Lab & Decision Chamber",
          subtitle: "Dual-process rationality, behavioral traps, and moral architecture",
          wingNumber: "IV",
          themeColor: "from-amber-500/20 to-orange-600/10",
          accentColor: "#fbbf24",
          icon: "scale",
          curatorQuote: "We pride ourselves on our intellect, yet our decisions are guided by ancient shortcuts and invisible biases.",
          pioneers: ["Daniel Kahneman", "Amos Tversky", "Richard Thaler"],
          brainRegions: ["Dorsolateral Prefrontal Cortex", "Orbitofrontal Cortex"],
          description: "Enter the crucible of choice. Experience Kahneman's System 1 wrestling with System 2. Face moral dilemmas like the Trolley Problem, and test your resistance to framing effects and sunk cost fallacies.",
          keyConcepts: [
            { name: "System 1 vs System 2", summary: "System 1 operates effortlessly and makes lightning pattern judgments; System 2 is logical but energetically expensive and quick to fatigue." },
            { name: "Loss Aversion", summary: "The psychological pain of losing $100 is twice as potent as the joy of gaining $100, driving humans into irrational risk hedging." },
            { name: "The Framing Effect", summary: "Identical statistical outcomes yield polar opposite decisions when framed as '90% survival' vs '10% mortality'." }
          ],
          interactiveModules: ["trolley-dilemma-chamber", "anchoring-experiment", "bias-matrix"],
          thoughtExperiment: {
            title: "The Asian Disease Problem (Kahneman & Tversky)",
            scenario: "When told a disease will kill 600 people, Program A saves 200 people with certainty (chosen by 72%). But when framed as '400 people will die' (Program C), 78% reject it and gamble—despite mathematical equivalence.",
            takeaway: "Humans are risk-averse when framed as gains, but risk-seeking when the identical outcome is framed as a loss."
          }
        },
        {
          id: "identity",
          title: "The Mirror Maze of Self & Identity",
          subtitle: "The narrative ego, split-brain paradoxes, and the Jungian psyche",
          wingNumber: "V",
          themeColor: "from-purple-500/20 to-indigo-600/10",
          accentColor: "#c084fc",
          icon: "sparkles",
          curatorQuote: "The self is not a static object inside the skull; it is a captivating story your brain invents to stay coherent.",
          pioneers: ["Carl Jung", "Michael Gazzaniga", "Roger Sperry"],
          brainRegions: ["Medial Prefrontal Cortex", "Corpus Callosum"],
          description: "Stand before the infinity mirrors of identity. What happens when the corpus callosum is severed? Delve into Jung's Persona and Shadow archetypes, and evaluate the narrative fiction of the ego.",
          keyConcepts: [
            { name: "The Split-Brain Experiments", summary: "When the corpus callosum is cut, the left hemisphere acts as an 'interpreter'-concocting rationalizations for actions initiated by the right brain." },
            { name: "Jungian Archetypes & The Shadow", summary: "The Persona is the social mask we wear; the Shadow contains the repressed aspects of self that project onto others." },
            { name: "The Narrative Self", summary: "The 'I' is not a single commander, but a storytelling module constructing continuous autobiographical meaning." }
          ],
          interactiveModules: ["jungian-archetype-test", "split-brain-simulator", "shadow-reflection"],
          thoughtExperiment: {
            title: "The Teletransporter Paradox (Derek Parfit)",
            scenario: "A machine scans every atom in your body, destroys your physical form on Earth, and beams the exact blueprint to Mars where a replication chamber reconstitutes you atom-for-atom. Did you travel to Mars, or did you die on Earth while a clone woke up?",
            takeaway: "Challenges whether the self is an unbroken physical entity or an illusory continuity of memory and consciousness."
          }
        }
      ];
    }
    this.renderHomeCards();
    this.renderTabs();
    this.renderActiveWing(this.activeWingId);
  },

  renderHomeCards() {
    const container = document.getElementById('homeWingsContainer');
    if (!container) return;

    container.innerHTML = this.exhibits.map(w => `
      <div onclick="Wings.selectWing('${w.id}')" class="group relative rounded-2xl border border-slate-800 bg-museum-900/60 hover:bg-museum-900 p-6 transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 cursor-pointer flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono font-bold tracking-wider">
              WING ${w.wingNumber}
            </span>
            <span class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition">
              <i data-lucide="${w.icon}" class="w-5 h-5"></i>
            </span>
          </div>

          <h3 class="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition mb-2">
            ${w.title}
          </h3>
          <p class="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            ${w.subtitle}
          </p>
        </div>

        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>${w.interactiveModules.length} Interactive Modules</span>
          <span class="text-cyan-400 flex items-center space-x-1 group-hover:translate-x-1 transition">
            <span>Explore</span>
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
      <button onclick="Wings.selectWing('${w.id}')" data-wing-tab="${w.id}" class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-2 ${
        this.activeWingId === w.id 
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10' 
          : 'bg-museum-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
      }">
        <span class="font-mono text-[10px] text-slate-400">W-${w.wingNumber}</span>
        <span>${w.title.replace('The Hall of ', '').replace('The Gallery of ', '').replace('The ', '')}</span>
      </button>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  selectWing(wingId) {
    AudioAmbiance.playSfx('click');
    this.activeWingId = wingId;
    App.navigateTo('wings');
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

    container.innerHTML = `
        <!-- Wing Hero Banner -->
        <div class="rounded-3xl border border-slate-800 bg-gradient-to-r from-museum-900 via-museum-850 to-museum-900 p-8 relative overflow-hidden">
          <div class="max-w-3xl">
            <div class="flex items-center space-x-3 mb-3">
              <span class="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                WING ${w.wingNumber}
              </span>
              <span class="text-xs font-mono text-slate-400 flex items-center space-x-1">
                <i data-lucide="activity" class="w-3.5 h-3.5 text-purple-400"></i>
                <span>Regions: ${w.brainRegions.join(', ')}</span>
              </span>
            </div>

            <h1 class="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
              ${w.title}
            </h1>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              ${w.description}
            </p>

            <blockquote class="border-l-2 border-cyan-400 pl-4 py-1 italic text-xs sm:text-sm text-cyan-200/90 mb-6 bg-cyan-500/5 rounded-r-lg">
              "${w.curatorQuote}"
            </blockquote>

            <div class="flex flex-wrap gap-3 items-center">
              <button onclick="Wings.playDocentNarration('${w.id}')" class="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-semibold flex items-center space-x-2 transition">
                <i data-lucide="headphones" class="w-4 h-4"></i>
                <span>Listen to Dr. Vance's Wing Commentary</span>
              </button>
              
              <button onclick="Wings.askAIGuide('${w.id}')" class="px-5 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center space-x-2 transition">
                <i data-lucide="sparkles" class="w-4 h-4 text-purple-400"></i>
                <span>Consult Dr. Vance in Salon</span>
              </button>

              <button onclick="Journal.openNewModal('${w.id}')" class="px-5 py-2.5 rounded-xl bg-museum-800 hover:bg-slate-700/60 text-slate-300 text-xs font-semibold flex items-center space-x-2 transition">
                <i data-lucide="edit-3" class="w-4 h-4 text-emerald-400"></i>
                <span>Archive a Reflection</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Key Scientific Concepts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${w.keyConcepts.map(c => `
            <div class="p-6 rounded-2xl border border-slate-800 bg-museum-900/50 flex flex-col justify-between">
              <div>
                <h4 class="font-display font-bold text-base text-white mb-2">${c.name}</h4>
                <p class="text-xs text-slate-400 leading-relaxed">${c.summary}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Interactive Exhibits Module Container -->
        <div class="rounded-3xl border border-slate-800 bg-museum-900/80 p-6 sm:p-10 shadow-xl">
          <div class="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
            <span class="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <i data-lucide="binary" class="w-5 h-5"></i>
            </span>
            <div>
              <h3 class="font-display font-bold text-xl text-white">Interactive Phenomenon Demonstrator</h3>
              <p class="text-xs text-slate-400">Engage hands-on with live psychological phenomena.</p>
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
      `;

      if (window.lucide) lucide.createIcons();
      this.attachInteractiveEventListeners(wingId);
    } catch (e) {
      console.error('Error rendering active wing:', e);
    }
  },

  // Generates specific interactive UI for each of the 5 wings
  renderInteractiveModule(wingId) {
    if (wingId === 'consciousness') {
      return `
        <div class="space-y-8">
          <!-- Illusion 1: Checker Shadow Comparison Slider -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h4 class="font-display font-bold text-lg text-white">1. Adelson's Checker Shadow Illusion</h4>
                <p class="text-xs text-slate-400">Square A looks dark; Square B looks light white. Yet their RGB values are 100% IDENTICAL!</p>
              </div>
              <button onclick="Wings.toggleBridge()" class="mt-2 sm:mt-0 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition">
                Toggle Connection Bridge
              </button>
            </div>

            <div class="relative w-full max-w-md mx-auto h-64 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-slate-800">
              <div class="grid grid-cols-3 gap-2 w-56 h-56">
                <div class="bg-zinc-800 flex items-center justify-center font-bold text-white text-lg rounded">A</div>
                <div class="bg-zinc-300 flex items-center justify-center font-bold text-zinc-900 text-lg rounded"></div>
                <div class="bg-zinc-800 flex items-center justify-center font-bold text-white text-lg rounded"></div>
                
                <div class="bg-zinc-300 flex items-center justify-center font-bold text-zinc-900 text-lg rounded"></div>
                <div id="tileB" class="bg-zinc-500 flex items-center justify-center font-bold text-white text-lg rounded relative">
                  B
                  <span class="absolute text-[9px] -bottom-3 text-cyan-300 font-mono">Shadowed</span>
                </div>
                <div class="bg-zinc-300 flex items-center justify-center font-bold text-zinc-900 text-lg rounded"></div>

                <div class="bg-zinc-800 flex items-center justify-center font-bold text-white text-lg rounded"></div>
                <div class="bg-zinc-300 flex items-center justify-center font-bold text-zinc-900 text-lg rounded"></div>
                <div class="bg-zinc-800 flex items-center justify-center font-bold text-white text-lg rounded"></div>
              </div>

              <!-- Connecting Bar that reveals identical luminance -->
              <div id="bridgeBar" class="hidden absolute w-48 h-8 bg-zinc-500 border-2 border-cyan-400 rounded shadow-lg z-20 flex items-center justify-center text-[10px] font-mono text-cyan-200">
                #787878 Identical Luminance
              </div>
            </div>
            <p class="text-center text-xs text-slate-400 mt-3 font-mono">
              The brain discounts shadows based on lighting context, actively fabricating the brightness of B.
            </p>
          </div>

          <!-- Illusion 2: Hermann Grid Lateral Inhibition -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">2. Hermann Grid: Lateral Inhibition</h4>
            <p class="text-xs text-slate-400 mb-4">Gaze across the grid: ghost-like grey smudges appear at the intersections, but vanish when looked at directly!</p>
            
            <div class="hermann-grid rounded-xl">
              <div class="hermann-square"></div><div class="hermann-square"></div><div class="hermann-square"></div><div class="hermann-square"></div>
              <div class="hermann-square"></div><div class="hermann-square"></div><div class="hermann-square"></div><div class="hermann-square"></div>
              <div class="hermann-square"></div><div class="hermann-square"></div><div class="hermann-square"></div><div class="hermann-square"></div>
              <div class="hermann-square"></div><div class="hermann-square"></div><div class="hermann-square"></div><div class="hermann-square"></div>
            </div>
            <p class="text-center text-xs text-slate-400 mt-3 font-mono">
              Caused by receptive fields of retinal ganglion cells inhibiting neighboring receptors.
            </p>
          </div>
        </div>
      `;
    }

    if (wingId === 'emotions') {
      return `
        <div class="space-y-8">
          <!-- Plutchik's Emotion Wheel Matrix -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">1. Plutchik's Primary Emotional Vectors</h4>
            <p class="text-xs text-slate-400 mb-6">Select an emotion to inspect its evolutionary purpose and bodily signature:</p>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6" id="plutchikPills">
              <button onclick="Wings.selectEmotion('joy')" class="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold text-xs transition hover:scale-105">✨ Joy / Ecstasy</button>
              <button onclick="Wings.selectEmotion('trust')" class="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition hover:scale-105">🤝 Trust / Acceptance</button>
              <button onclick="Wings.selectEmotion('fear')" class="p-3 rounded-xl bg-emerald-700/20 border border-emerald-600/40 text-teal-300 font-semibold text-xs transition hover:scale-105">⚡ Fear / Terror</button>
              <button onclick="Wings.selectEmotion('surprise')" class="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition hover:scale-105">😲 Surprise / Awe</button>
              <button onclick="Wings.selectEmotion('sadness')" class="p-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-semibold text-xs transition hover:scale-105">💧 Sadness / Grief</button>
              <button onclick="Wings.selectEmotion('disgust')" class="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-semibold text-xs transition hover:scale-105">🤢 Disgust / Loathing</button>
              <button onclick="Wings.selectEmotion('anger')" class="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-semibold text-xs transition hover:scale-105">🔥 Anger / Rage</button>
              <button onclick="Wings.selectEmotion('anticipation')" class="p-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 font-semibold text-xs transition hover:scale-105">🔭 Anticipation / Vigilance</button>
            </div>

            <div id="emotionDetailBox" class="p-5 rounded-xl bg-museum-900 border border-slate-800 text-sm">
              <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">Emotion Analysis: Joy</span>
              <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                <strong>Evolutionary Function:</strong> Reinforces resource acquisition, social bonding, and reproductive success.
              </p>
              <p class="text-slate-400 text-xs">
                <strong>Neurochemical Cascade:</strong> Dopaminergic reward surges in nucleus accumbens, endorphin release, and lowered cortisol.
              </p>
            </div>
          </div>

          <!-- Somatic Vagus Nerve Breathing Pacer -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800 text-center">
            <h4 class="font-display font-bold text-lg text-white mb-2">2. Somatic Resonator: 4-7-8 Vagus Nerve Pacer</h4>
            <p class="text-xs text-slate-400 mb-6">Down-regulate sympathetic flight-or-fight response by stimulating the vagus nerve.</p>

            <div class="relative w-48 h-48 mx-auto flex items-center justify-center mb-6">
              <div id="pacerCircle" class="breath-circle w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500/40 to-blue-600/40 border-2 border-cyan-400 flex items-center justify-center shadow-xl">
                <span id="pacerText" class="font-display font-bold text-sm text-white">Inhale (4s)</span>
              </div>
            </div>

            <button onclick="Wings.toggleBreathingPacer()" id="pacerBtn" class="px-6 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition">
              Start Somatic Cycle
            </button>
          </div>
        </div>
      `;
    }

    if (wingId === 'memory') {
      return `
        <div class="space-y-8">
          <!-- Elizabeth Loftus False Memory Lab -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">1. The Elizabeth Loftus Confabulation Lab</h4>
            <p class="text-xs text-slate-400 mb-4">Can a single misleading word change your recollection of physical reality? Test it now:</p>
            
            <div id="falseMemoryContainer" class="p-5 rounded-xl bg-museum-900 border border-slate-800 text-sm">
              <p class="text-slate-200 mb-4">Imagine you witnessed a collision between two cars at an intersection. One group of eyewitnesses is asked:</p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <button onclick="Wings.testLoftus('smashed')" class="p-4 rounded-xl bg-museum-950 border border-slate-800 hover:border-cyan-500/50 text-left transition">
                  <div class="font-bold text-white text-xs mb-1">Group A phrasing:</div>
                  <div class="text-xs text-cyan-300">"How fast were the cars going when they <span class="underline font-bold">smashed</span> into each other?"</div>
                </button>
                <button onclick="Wings.testLoftus('contacted')" class="p-4 rounded-xl bg-museum-950 border border-slate-800 hover:border-cyan-500/50 text-left transition">
                  <div class="font-bold text-white text-xs mb-1">Group B phrasing:</div>
                  <div class="text-xs text-amber-300">"How fast were the cars going when they <span class="underline font-bold">contacted</span> each other?"</div>
                </button>
              </div>

              <div id="loftusResult" class="hidden p-4 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                <!-- Result dynamically shown -->
              </div>
            </div>
          </div>

          <!-- Method of Loci / Memory Palace Walkthrough -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">2. The Ancient Method of Loci (Memory Palace)</h4>
            <p class="text-xs text-slate-400 mb-4">Since hunter-gatherer times, the human brain evolved spatial mapping (hippocampal place cells). Place bizarre items in rooms to remember them effortlessly:</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-3 rounded-xl bg-museum-900 border border-slate-800 text-center">
                <span class="text-[10px] font-mono text-cyan-400 uppercase">Room 1: The Front Door</span>
                <p class="font-bold text-xs text-white mt-1">A Giant Neon Octopus wearing a top hat</p>
              </div>
              <div class="p-3 rounded-xl bg-museum-900 border border-slate-800 text-center">
                <span class="text-[10px] font-mono text-cyan-400 uppercase">Room 2: The Grand Hallway</span>
                <p class="font-bold text-xs text-white mt-1">A waterfall made of sparkling amber honey</p>
              </div>
              <div class="p-3 rounded-xl bg-museum-900 border border-slate-800 text-center">
                <span class="text-[10px] font-mono text-cyan-400 uppercase">Room 3: The Dining Table</span>
                <p class="font-bold text-xs text-white mt-1">Albert Einstein playing violin on a unicycle</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (wingId === 'decisions') {
      return `
        <div class="space-y-8">
          <!-- The Trolley Dilemma Simulator -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">1. The Trolley Problem: Utilitarian vs Deontological Trial</h4>
            <p class="text-xs text-slate-400 mb-4">A runaway trolley speeds toward 5 workers. You stand beside a lever. If you pull it, the trolley diverts onto a side track killing 1 worker instead. What do you do?</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button onclick="Wings.voteTrolley('pull')" class="p-5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-left transition">
                <div class="font-bold text-emerald-300 text-sm mb-1">Pull the Switch</div>
                <div class="text-xs text-slate-300">Actively sacrifice 1 life to save 5. (Utilitarian calculation: Jeremy Bentham)</div>
              </button>
              <button onclick="Wings.voteTrolley('refrain')" class="p-5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-left transition">
                <div class="font-bold text-rose-300 text-sm mb-1">Do Not Pull</div>
                <div class="text-xs text-slate-300">Refuse to become the moral agent of death. (Deontological duty: Immanuel Kant)</div>
              </button>
            </div>

            <div id="trolleyStatsBox" class="hidden p-4 rounded-xl bg-museum-900 border border-slate-800 text-xs">
              <div class="flex justify-between font-mono text-slate-300 mb-2">
                <span>Community Choice: Pull Lever (89%)</span>
                <span>Refrain (11%)</span>
              </div>
              <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
                <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style="width: 89%"></div>
              </div>
              <p class="text-slate-400">
                Notice: When asked whether to physically push a heavy man off a bridge to stop the trolley, 85% refuse—even though the math is identical! Frontal lobe emotional aversion overrides cold utilitarian logic.
              </p>
            </div>
          </div>

          <!-- Anchoring Effect Sandbox -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">2. The Anchoring Bias Sandbox</h4>
            <p class="text-xs text-slate-400 mb-4">Notice how an arbitrary number anchors subsequent subjective judgments:</p>
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <input type="range" id="anchorSlider" min="10" max="500" value="250" oninput="Wings.updateAnchorVal(this.value)" class="w-full sm:w-64 accent-amber-400">
              <span class="font-mono text-sm text-amber-300">Arbitrary Anchor: $<span id="anchorVal">250</span></span>
            </div>
            <p class="text-xs text-slate-400 mt-2 font-mono">
              In Kahneman & Tversky's trials, spinning a wheel of fortune with high numbers biased participants' estimates of UNRELATED questions by up to 45%!
            </p>
          </div>
        </div>
      `;
    }

    if (wingId === 'identity') {
      return `
        <div class="space-y-8">
          <!-- Jungian Archetype Mini-Evaluator -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">1. Jungian Archetype Evaluator</h4>
            <p class="text-xs text-slate-400 mb-4">Which primordial blueprint guides your subconscious persona?</p>

            <div id="archetypeQuizContainer">
              <p class="text-sm text-slate-200 mb-3">When facing a profound mystery or life crisis, your primal instinct is to:</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button onclick="Wings.showArchetype('Sage')" class="p-3 rounded-xl bg-museum-900 border border-slate-800 hover:border-purple-500/50 text-left text-xs text-slate-200 transition">
                  Seek hidden truth, study and illuminate knowledge (The Sage)
                </button>
                <button onclick="Wings.showArchetype('Hero')" class="p-3 rounded-xl bg-museum-900 border border-slate-800 hover:border-purple-500/50 text-left text-xs text-slate-200 transition">
                  Confront the danger directly with courage and will (The Hero)
                </button>
                <button onclick="Wings.showArchetype('Explorer')" class="p-3 rounded-xl bg-museum-900 border border-slate-800 hover:border-purple-500/50 text-left text-xs text-slate-200 transition">
                  Break boundaries and discover untrodden horizons (The Explorer)
                </button>
                <button onclick="Wings.showArchetype('Shadow')" class="p-3 rounded-xl bg-museum-900 border border-slate-800 hover:border-purple-500/50 text-left text-xs text-slate-200 transition">
                  Question the rules and integrate taboo truths (The Rebel / Shadow)
                </button>
              </div>
            </div>

            <div id="archetypeCard" class="hidden p-6 rounded-2xl bg-purple-950/20 border border-purple-500/40 text-center">
              <span class="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">Your Dominant Blueprint</span>
              <h5 id="archetypeName" class="font-display font-bold text-2xl text-white mb-2">The Sage</h5>
              <p id="archetypeDesc" class="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                Driven by understanding and truth. Your challenge is overcoming analysis paralysis and living the truth you discover.
              </p>
            </div>
          </div>

          <!-- The Split Brain Simulator -->
          <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
            <h4 class="font-display font-bold text-lg text-white mb-2">2. Sperry & Gazzaniga's Split-Brain Paradox</h4>
            <p class="text-xs text-slate-400 mb-4">When a patient's corpus callosum is cut, a picture of a shovel flashed to the left visual field (right brain) causes the left hand to draw a shovel. But when asked why, the verbal left brain says: "Oh, I drew a shovel because you need to clean a chicken coop!"</p>
            <p class="text-xs text-cyan-300 font-mono">
              The Left Hemisphere's "Interpreter" effortlessly manufactures rational explanations for behaviors it did not initiate!
            </p>
          </div>
        </div>
      `;
    }

    return `<p class="text-slate-400 text-sm">Interactive module active.</p>`;
  },

  attachInteractiveEventListeners(wingId) {
    // Any dynamic timers or canvas attachments
  },

  toggleBridge() {
    AudioAmbiance.playSfx('click');
    const bridge = document.getElementById('bridgeBar');
    if (bridge) {
      bridge.classList.toggle('hidden');
    }
  },

  selectEmotion(emotionKey) {
    AudioAmbiance.playSfx('click');
    const box = document.getElementById('emotionDetailBox');
    if (!box) return;

    const data = {
      joy: { title: "Joy / Ecstasy", purpose: "Reinforces survival behaviors and builds enduring social resources (Barbara Fredrickson).", bio: "Nucleus accumbens dopamine release, endorphins, parasympathetic tone." },
      trust: { title: "Trust / Acceptance", purpose: "Enables group cohesion, mutual defense, and trade beyond immediate kin.", bio: "Hypothalamic oxytocin release and down-regulated amygdaloid vigilance." },
      fear: { title: "Fear / Terror", purpose: "Immediate survival threat evasion (fight or flight activation).", bio: "Basolateral amygdala activation, epinephrine rush, bronchial dilation." },
      surprise: { title: "Surprise / Awe", purpose: "Pauses ongoing cognition to rapidly update the brain's internal world model.", bio: "Noradrenaline spike from locus coeruleus, widened pupils." },
      sadness: { title: "Sadness / Grief", purpose: "Signals distress to conspecifics to solicit social care and prompts withdrawal to conserve energy.", bio: "Subgenual anterior cingulate activation, decreased serotonin." },
      disgust: { title: "Disgust / Loathing", purpose: "Disease avoidance: prevents ingestion of pathogens, poisons, and toxic social behaviors.", bio: "Anterior insula activation, vagal deceleration, olfactory aversion." },
      anger: { title: "Anger / Rage", purpose: "Overcomes obstacles, defends territorial or reputational boundaries.", bio: "Amygdala-hypothalamic-periaqueductal gray axis, testosterone, elevated blood pressure." },
      anticipation: { title: "Anticipation / Vigilance", purpose: "Prepares organism for future contingencies and resource harvesting.", bio: "Prefrontal dopaminergic projection, heightened sensory gating." }
    }[emotionKey];

    if (data) {
      box.innerHTML = `
        <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">Emotion Analysis: ${data.title}</span>
        <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2"><strong>Evolutionary Function:</strong> ${data.purpose}</p>
        <p class="text-slate-400 text-xs"><strong>Neurochemical Cascade:</strong> ${data.bio}</p>
      `;
    }
  },

  pacerInterval: null,
  isPacing: false,
  toggleBreathingPacer() {
    AudioAmbiance.playSfx('click');
    const circle = document.getElementById('pacerCircle');
    const text = document.getElementById('pacerText');
    const btn = document.getElementById('pacerBtn');

    if (this.isPacing) {
      clearInterval(this.pacerInterval);
      this.isPacing = false;
      if (circle) circle.className = 'breath-circle w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500/40 to-blue-600/40 border-2 border-cyan-400 flex items-center justify-center shadow-xl';
      if (text) text.textContent = 'Ready';
      if (btn) btn.textContent = 'Start Somatic Cycle';
      return;
    }

    this.isPacing = true;
    if (btn) btn.textContent = 'Stop Breathing Pacer';

    let phase = 0; // 0: inhale (4s), 1: hold (7s), 2: exhale (8s)
    const runCycle = () => {
      if (phase === 0) {
        if (text) text.textContent = 'Inhale (4s)';
        if (circle) {
          circle.className = 'breath-circle inhale w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500/60 to-blue-600/60 border-2 border-cyan-400 flex items-center justify-center shadow-xl';
        }
        AudioAmbiance.playSfx('click');
        setTimeout(() => { if (this.isPacing) { phase = 1; runCycle(); } }, 4000);
      } else if (phase === 1) {
        if (text) text.textContent = 'Hold (7s)';
        if (circle) {
          circle.className = 'breath-circle hold w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500/60 to-indigo-600/60 border-2 border-purple-400 flex items-center justify-center shadow-xl';
        }
        setTimeout(() => { if (this.isPacing) { phase = 2; runCycle(); } }, 7000);
      } else if (phase === 2) {
        if (text) text.textContent = 'Exhale (8s)';
        if (circle) {
          circle.className = 'breath-circle exhale w-28 h-28 rounded-full bg-gradient-to-tr from-teal-500/40 to-blue-600/40 border-2 border-teal-400 flex items-center justify-center shadow-xl';
        }
        setTimeout(() => { if (this.isPacing) { phase = 0; runCycle(); } }, 8000);
      }
    };
    runCycle();
  },

  testLoftus(word) {
    AudioAmbiance.playSfx('click');
    const resBox = document.getElementById('loftusResult');
    if (!resBox) return;

    resBox.classList.remove('hidden');
    if (word === 'smashed') {
      resBox.innerHTML = `
        <strong class="font-bold text-cyan-300 block mb-1">Result: Estimated Speed 40.5 mph</strong>
        When Dr. Loftus used the word 'smashed', participants estimated the speed significantly higher, and a week later, <strong>32% falsely remembered seeing broken glass</strong> at the scene (there was no broken glass).
      `;
    } else {
      resBox.innerHTML = `
        <strong class="font-bold text-amber-300 block mb-1">Result: Estimated Speed 31.8 mph</strong>
        When the word 'contacted' was used, speed estimates dropped by ~25%, and less than 10% remembered broken glass. Language literally edits sensory memory!
      `;
    }
  },

  voteTrolley(choice) {
    AudioAmbiance.playSfx('click');
    const box = document.getElementById('trolleyStatsBox');
    if (box) box.classList.remove('hidden');
    App.showToast(`Moral choice logged: ${choice === 'pull' ? 'Lever Pulled' : 'Refrained'}`);
  },

  updateAnchorVal(v) {
    const el = document.getElementById('anchorVal');
    if (el) el.textContent = v;
  },

  showArchetype(type) {
    AudioAmbiance.playSfx('badge');
    const card = document.getElementById('archetypeCard');
    const name = document.getElementById('archetypeName');
    const desc = document.getElementById('archetypeDesc');
    if (!card) return;

    card.classList.remove('hidden');
    name.textContent = `The ${type}`;
    if (type === 'Sage') {
      desc.textContent = "Driven by understanding and truth. Your gift is discernment; your challenge is integrating action alongside pure thought.";
    } else if (type === 'Hero') {
      desc.textContent = "Driven by overcoming adversity. Your gift is courage; your shadow challenge is acknowledging vulnerability.";
    } else if (type === 'Explorer') {
      desc.textContent = "Driven by freedom and discovery. Your gift is nonconformity; your challenge is discovering inner stillness.";
    } else {
      desc.textContent = "The Shadow & Rebel: Willing to disrupt stagnant orthodoxy. Your gift is fearless authenticity; your challenge is constructive integration.";
    }
  },

  playDocentNarration(wingId) {
    AudioAmbiance.playSfx('click');
    const w = this.exhibits.find(e => e.id === wingId);
    if (!w) return;
    const text = `Welcome to Wing ${w.wingNumber}: ${w.title}. ${w.curatorQuote} In this wing, we explore ${w.subtitle}.`;
    AIGuide.speak(text);
    App.showToast(`Dr. Vance is narrating Wing ${w.wingNumber}...`);
  },

  askAIGuide(wingId) {
    App.navigateTo('ai-guide');
    const w = this.exhibits.find(e => e.id === wingId);
    if (w) {
      AIGuide.sendDirectPrompt(`Dr. Vance, can you give me a personalized tour of Wing ${w.wingNumber}: ${w.title}?`);
    }
  },

  narrateAll() {
    AudioAmbiance.playSfx('click');
    AIGuide.speak("Welcome to the Five Psychology Wings of The Human Mind Museum. Across these halls, explore Consciousness, Emotions, Memory, Decisions, and Identity.");
    App.showToast("Introductory narration playing...");
  }
};

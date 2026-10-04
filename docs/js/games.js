// Interactive Cognitive Psychology Games Engine (All 6 Educational Games)
const Games = {
  activeGame: 'stroop',
  catalog: [
    {
      id: "stroop",
      room: "perception",
      title: "The Stroop Effect Challenge",
      subtitle: "Frontal Lobe Conflict & Cognitive Interference Test",
      metricName: "Interference Delay (ms) & Accuracy"
    },
    {
      id: "memory-matrix",
      room: "memory",
      title: "The Working Memory Matrix",
      subtitle: "Spatial Span & Miller's 7±2 Law Experiment",
      metricName: "Span Capacity Level"
    },
    {
      id: "micro-expressions",
      room: "emotion",
      title: "Micro-Expression Emotion Decoder",
      subtitle: "Paul Ekman's High-Speed Facial Action Coding Test",
      metricName: "Empathy Recognition Index"
    },
    {
      id: "ocean-test",
      room: "personality",
      title: "Big Five OCEAN Assessment",
      subtitle: "Psychometric Trait Mapping & Holographic Radar Analysis",
      metricName: "OCEAN Profile Radar"
    },
    {
      id: "bias-detective",
      room: "cognitive-bias",
      title: "Cognitive Bias Detective",
      subtitle: "Peter Wason's Confirmation Bias Trial & Heuristic Hunter",
      metricName: "Deductive Rationality Score"
    },
    {
      id: "monty-hall",
      room: "decision-making",
      title: "Monty Hall Bayesian Dilemma",
      subtitle: "Conditional Probability Paradox & Risk Simulator",
      metricName: "Bayesian Win Rate (%)"
    }
  ],

  async init() {
    try {
      const res = await fetch('/api/games/catalog');
      if (res.ok) {
        this.catalog = await res.json();
      }
    } catch (e) {
      // offline fallback
    }
    this.renderCatalogGrid();
    this.launch(this.activeGame);
  },

  renderCatalogGrid() {
    const grid = document.getElementById('gamesSelectorGrid');
    if (!grid) return;

    grid.innerHTML = this.catalog.map(g => `
      <div onclick="Games.launch('${g.id}')" class="p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        this.activeGame === g.id
          ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/10'
          : 'bg-museum-900/60 border-slate-800 hover:border-slate-700'
      }">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-museum-950 border border-slate-800 text-amber-400">Lab Challenge</span>
          </div>
          <h4 class="font-display font-bold text-base text-white mb-1">${g.title}</h4>
          <p class="text-xs text-slate-400 line-clamp-2 mb-3">${g.subtitle}</p>
        </div>
        <div class="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-amber-300/80 flex items-center justify-between">
          <span>${g.metricName}</span>
          <i data-lucide="play" class="w-3.5 h-3.5"></i>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  launch(gameId) {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
    this.activeGame = gameId;
    this.renderCatalogGrid();

    if (gameId === 'stroop') this.initStroop();
    else if (gameId === 'memory-matrix') this.initMemoryMatrix();
    else if (gameId === 'bias-detective') this.initBiasDetective();
    else if (gameId === 'micro-expressions') this.initMicroExpressions();
    else if (gameId === 'ocean-test') this.initOceanTest();
    else if (gameId === 'monty-hall') this.initMontyHallGame();
  },

  /* ==========================================
     GAME 1: THE STROOP EFFECT CHALLENGE
     ========================================== */
  stroopState: {
    round: 0,
    maxRounds: 10,
    startTime: 0,
    reactionTimes: [],
    correctCount: 0,
    currentWord: '',
    currentColor: '',
    isRunning: false
  },

  initStroop() {
    const area = document.getElementById('gameActiveContainer');
    if (!area) return;

    area.innerHTML = `
      <div class="w-full max-w-xl text-center space-y-6">
        <div>
          <span class="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase">
            Executive Inhibitory Control Test
          </span>
          <h3 class="font-display font-bold text-2xl text-white mt-2">The Stroop Effect Challenge</h3>
          <p class="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
            Name the <strong>INK COLOR</strong> of the word displayed below as rapidly as possible. Resist the reflex to read the word text!
          </p>
        </div>

        <div id="stroopDisplay" class="h-40 rounded-2xl bg-museum-950 border border-slate-800 flex items-center justify-center p-6 shadow-inner">
          <span id="stroopWord" class="font-display font-black text-4xl sm:text-5xl tracking-widest text-slate-500 select-none">
            READY?
          </span>
        </div>

        <div id="stroopControls" class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
          <button onclick="Games.handleStroopAnswer('RED')" class="py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/50 text-rose-300 font-bold text-xs tracking-wider transition">RED</button>
          <button onclick="Games.handleStroopAnswer('BLUE')" class="py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/50 text-blue-300 font-bold text-xs tracking-wider transition">BLUE</button>
          <button onclick="Games.handleStroopAnswer('GREEN')" class="py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/50 text-emerald-300 font-bold text-xs tracking-wider transition">GREEN</button>
          <button onclick="Games.handleStroopAnswer('YELLOW')" class="py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/50 text-amber-300 font-bold text-xs tracking-wider transition">YELLOW</button>
        </div>

        <div class="flex items-center justify-center space-x-4">
          <button id="stroopStartBtn" onclick="Games.startStroop()" class="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition">
            Start 10-Trial Test
          </button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  startStroop() {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
    this.stroopState = {
      round: 0,
      maxRounds: 10,
      startTime: 0,
      reactionTimes: [],
      correctCount: 0,
      currentWord: '',
      currentColor: '',
      isRunning: true
    };
    document.getElementById('stroopStartBtn').classList.add('hidden');
    this.nextStroopTrial();
  },

  nextStroopTrial() {
    if (this.stroopState.round >= this.stroopState.maxRounds) {
      this.finishStroop();
      return;
    }

    this.stroopState.round++;
    const words = ['RED', 'BLUE', 'GREEN', 'YELLOW'];
    const colors = [
      { name: 'RED', css: '#f43f5e' },
      { name: 'BLUE', css: '#38bdf8' },
      { name: 'GREEN', css: '#10b981' },
      { name: 'YELLOW', css: '#fbbf24' }
    ];

    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    this.stroopState.currentWord = randomWord;
    this.stroopState.currentColor = randomColor.name;

    const display = document.getElementById('stroopWord');
    display.textContent = randomWord;
    display.style.color = randomColor.css;
    display.classList.add('scale-110');
    setTimeout(() => display.classList.remove('scale-110'), 100);

    this.stroopState.startTime = performance.now();
  },

  handleStroopAnswer(chosenColor) {
    if (!this.stroopState.isRunning) return;

    const rt = performance.now() - this.stroopState.startTime;
    this.stroopState.reactionTimes.push(rt);

    if (chosenColor === this.stroopState.currentColor) {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('success');
      this.stroopState.correctCount++;
    } else {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('error');
    }

    this.nextStroopTrial();
  },

  async finishStroop() {
    this.stroopState.isRunning = false;
    const avgRt = Math.round(this.stroopState.reactionTimes.reduce((a, b) => a + b, 0) / this.stroopState.reactionTimes.length);
    const accuracy = Math.round((this.stroopState.correctCount / this.stroopState.maxRounds) * 100);
    const score = Math.max(100, Math.round((1000 - avgRt) * 2 + accuracy * 10));

    if (window.AudioAmbiance) AudioAmbiance.playSfx('badge');

    const area = document.getElementById('gameActiveContainer');
    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-300">
          <i data-lucide="check" class="w-8 h-8"></i>
        </div>
        <h3 class="font-display font-bold text-2xl text-white">Stroop Trial Complete</h3>
        
        <div class="grid grid-cols-3 gap-3">
          <div class="p-3 rounded-xl bg-museum-950 border border-slate-800">
            <span class="text-[10px] font-mono text-slate-400 uppercase">Avg Speed</span>
            <div class="font-display font-bold text-lg text-cyan-400 mt-1">${avgRt} ms</div>
          </div>
          <div class="p-3 rounded-xl bg-museum-950 border border-slate-800">
            <span class="text-[10px] font-mono text-slate-400 uppercase">Accuracy</span>
            <div class="font-display font-bold text-lg text-emerald-400 mt-1">${accuracy}%</div>
          </div>
          <div class="p-3 rounded-xl bg-museum-950 border border-slate-800">
            <span class="text-[10px] font-mono text-slate-400 uppercase">Neural Score</span>
            <div class="font-display font-bold text-lg text-amber-400 mt-1">${score}</div>
          </div>
        </div>

        <div class="flex gap-3 justify-center">
          <button onclick="Games.initStroop()" class="px-5 py-2.5 rounded-xl bg-museum-950 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-slate-700 transition">
            Test Again
          </button>
          <button onclick="Games.submitScore('stroop', ${score}, ${avgRt}, ${accuracy})" class="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-museum-950 font-bold text-xs transition shadow-lg shadow-cyan-500/20">
            Archive to Visitor Pass
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  /* ==========================================
     GAME 2: WORKING MEMORY MATRIX (CORSI SPAN)
     ========================================== */
  matrixState: {
    level: 3,
    sequence: [],
    userSequence: [],
    isShowing: false,
    score: 0
  },

  initMemoryMatrix() {
    const area = document.getElementById('gameActiveContainer');
    if (!area) return;

    this.matrixState.level = 3;
    this.matrixState.score = 0;

    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <div>
          <span class="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase">
            Spatial Working Memory
          </span>
          <h3 class="font-display font-bold text-2xl text-white mt-2">Working Memory Matrix</h3>
          <p class="text-xs text-slate-300 mt-1">Memorize the flashing tile sequence and replicate it in order.</p>
        </div>

        <div id="matrixGrid" class="grid grid-cols-3 gap-3 w-64 h-64 mx-auto p-3 bg-museum-950 rounded-2xl border border-slate-800">
          ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `
            <div id="mtile-${i}" onclick="Games.handleTileClick(${i})" class="rounded-xl bg-slate-800/80 border border-slate-700/60 transition cursor-pointer hover:bg-slate-700"></div>
          `).join('')}
        </div>

        <div id="matrixControls">
          <button onclick="Games.startMatrixRound()" class="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white font-bold text-xs tracking-wider transition shadow-lg shadow-emerald-500/20">
            Start Sequence (Level ${this.matrixState.level})
          </button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  startMatrixRound() {
    const controls = document.getElementById('matrixControls');
    if (controls) controls.innerHTML = `<span class="text-xs font-mono text-emerald-400 animate-pulse">Memorizing...</span>`;

    this.matrixState.sequence = [];
    this.matrixState.userSequence = [];
    this.matrixState.isShowing = true;

    for (let i = 0; i < this.matrixState.level; i++) {
      this.matrixState.sequence.push(Math.floor(Math.random() * 9));
    }

    let delay = 600;
    this.matrixState.sequence.forEach((tileIdx, step) => {
      setTimeout(() => {
        const el = document.getElementById(`mtile-${tileIdx}`);
        if (el) {
          el.classList.add('bg-emerald-400', 'shadow-lg', 'shadow-emerald-500/50');
          if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
          setTimeout(() => {
            el.classList.remove('bg-emerald-400', 'shadow-lg', 'shadow-emerald-500/50');
          }, 400);
        }
      }, (step + 1) * delay);
    });

    setTimeout(() => {
      this.matrixState.isShowing = false;
      if (controls) controls.innerHTML = `<span class="text-xs font-mono text-cyan-300">Your turn: Tap ${this.matrixState.level} tiles!</span>`;
    }, (this.matrixState.sequence.length + 1) * delay);
  },

  handleTileClick(tileIdx) {
    if (this.matrixState.isShowing) return;

    const el = document.getElementById(`mtile-${tileIdx}`);
    if (el) {
      el.classList.add('bg-cyan-400');
      setTimeout(() => el.classList.remove('bg-cyan-400'), 250);
    }

    this.matrixState.userSequence.push(tileIdx);
    const currStep = this.matrixState.userSequence.length - 1;

    if (this.matrixState.userSequence[currStep] !== this.matrixState.sequence[currStep]) {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('error');
      this.finishMatrix(false);
      return;
    }

    if (this.matrixState.userSequence.length === this.matrixState.sequence.length) {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('success');
      this.matrixState.score += this.matrixState.level * 100;
      this.matrixState.level++;
      const controls = document.getElementById('matrixControls');
      if (controls) {
        controls.innerHTML = `
          <button onclick="Games.startMatrixRound()" class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-museum-950 font-bold text-xs transition">
            Level ${this.matrixState.level} Passed! Next Sequence &rarr;
          </button>
        `;
      }
    }
  },

  finishMatrix(won) {
    const area = document.getElementById('gameActiveContainer');
    const finalScore = this.matrixState.score || 100;
    const finalSpan = this.matrixState.level - 1;

    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <h3 class="font-display font-bold text-2xl text-white">Memory Test Completed</h3>
        <div class="p-5 rounded-2xl bg-museum-950 border border-slate-800">
          <span class="text-xs font-mono text-slate-400 uppercase">Working Memory Span</span>
          <div class="font-display font-black text-4xl text-emerald-400 mt-1">${finalSpan} Items</div>
          <p class="text-xs text-slate-400 mt-2">Miller's Law predicts human immediate span is 7 ± 2 items.</p>
        </div>
        <div class="flex gap-3 justify-center">
          <button onclick="Games.initMemoryMatrix()" class="px-5 py-2.5 rounded-xl bg-museum-950 border border-slate-800 text-xs text-white">Try Again</button>
          <button onclick="Games.submitScore('memory-matrix', ${finalScore}, null, 100)" class="px-6 py-2.5 rounded-xl bg-emerald-500 text-museum-950 font-bold text-xs">Save to Pass</button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  /* ==========================================
     GAME 3: MICRO-EXPRESSIONS
     ========================================== */
  microTrials: [
    { emotion: "Contempt", cue: "Unilateral lip sneer", faceEmoji: "😏" },
    { emotion: "Genuine Joy", cue: "Duchenne eye crinkle", faceEmoji: "😊" },
    { emotion: "Fear", cue: "Eyebrows raised and pulled together", faceEmoji: "😨" },
    { emotion: "Disgust", cue: "Nose wrinkling, raised lip", faceEmoji: "🤢" }
  ],
  microIndex: 0,
  microScore: 0,

  initMicroExpressions() {
    this.microIndex = 0;
    this.microScore = 0;
    this.renderMicroTrial();
  },

  renderMicroTrial() {
    const area = document.getElementById('gameActiveContainer');
    if (!area) return;

    if (this.microIndex >= this.microTrials.length) {
      this.finishMicro();
      return;
    }

    const t = this.microTrials[this.microIndex];
    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <div>
          <span class="px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase">Paul Ekman FACS Test</span>
          <h3 class="font-display font-bold text-2xl text-white mt-2">Micro-Expression Decoder</h3>
          <p class="text-xs text-slate-300 mt-1">Trial ${this.microIndex + 1} of ${this.microTrials.length}: Click Flash to reveal for 400ms.</p>
        </div>
        <div id="microFaceBox" class="w-40 h-40 rounded-3xl bg-museum-950 border border-slate-800 flex items-center justify-center mx-auto text-6xl select-none">😐</div>
        <button id="flashBtn" onclick="Games.flashMicroFace('${t.faceEmoji}')" class="px-6 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition">
          Flash Micro-Expression (400ms)
        </button>
        <div id="microOptions" class="hidden grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <button onclick="Games.checkMicro('Contempt')" class="p-3 rounded-xl bg-museum-950 border border-slate-800 hover:border-rose-400 text-xs text-white">Contempt</button>
          <button onclick="Games.checkMicro('Genuine Joy')" class="p-3 rounded-xl bg-museum-950 border border-slate-800 hover:border-rose-400 text-xs text-white">Genuine Joy</button>
          <button onclick="Games.checkMicro('Fear')" class="p-3 rounded-xl bg-museum-950 border border-slate-800 hover:border-rose-400 text-xs text-white">Fear</button>
          <button onclick="Games.checkMicro('Disgust')" class="p-3 rounded-xl bg-museum-950 border border-slate-800 hover:border-rose-400 text-xs text-white">Disgust</button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  flashMicroFace(emoji) {
    const box = document.getElementById('microFaceBox');
    const flashBtn = document.getElementById('flashBtn');
    const options = document.getElementById('microOptions');
    box.textContent = emoji;
    setTimeout(() => {
      box.textContent = '😐';
      if (flashBtn) flashBtn.classList.add('hidden');
      if (options) options.classList.remove('hidden');
    }, 400);
  },

  checkMicro(choice) {
    const t = this.microTrials[this.microIndex];
    if (choice === t.emotion) {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('success');
      this.microScore += 250;
    } else {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('error');
    }
    this.microIndex++;
    setTimeout(() => this.renderMicroTrial(), 400);
  },

  finishMicro() {
    const area = document.getElementById('gameActiveContainer');
    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <h3 class="font-display font-bold text-2xl text-white">Affective Recognition Index</h3>
        <div class="p-5 rounded-2xl bg-museum-950 border border-slate-800">
          <div class="font-display font-black text-4xl text-rose-400">${this.microScore} / 1000</div>
          <p class="text-xs text-slate-400 mt-2">Recognizing sub-second micro-expressions reflects affective empathy.</p>
        </div>
        <div class="flex gap-3 justify-center">
          <button onclick="Games.initMicroExpressions()" class="px-5 py-2.5 rounded-xl bg-museum-950 border border-slate-800 text-xs text-white">Try Again</button>
          <button onclick="Games.submitScore('micro-expressions', ${this.microScore}, null, 95)" class="px-6 py-2.5 rounded-xl bg-rose-500 text-museum-950 font-bold text-xs">Save to Pass</button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  /* ==========================================
     GAME 4: BIG FIVE OCEAN RADAR ASSESSMENT
     ========================================== */
  oceanQuestions: [
    { text: "I have a vibrant, active imagination and enjoy artistic, abstract ideas.", trait: "O" },
    { text: "I keep my workspace orderly, meet deadlines reliably, and follow plans.", trait: "C" },
    { text: "I feel energized in groups and readily strike up conversations.", trait: "E" },
    { text: "I sympathize with others' feelings and prioritize cooperation over competition.", trait: "A" },
    { text: "I frequently experience worry, stress, or shifts in mood under pressure.", trait: "N" }
  ],
  oceanScores: { O: 50, C: 50, E: 50, A: 50, N: 50 },

  initOceanTest() {
    const area = document.getElementById('gameActiveContainer');
    if (!area) return;

    area.innerHTML = `
      <div class="w-full max-w-xl space-y-6">
        <div class="text-center">
          <span class="px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs uppercase">Psychometric Trait Model</span>
          <h3 class="font-display font-bold text-2xl text-white mt-2">Big Five (OCEAN) Radar Test</h3>
          <p class="text-xs text-slate-300 mt-1">Rate how strongly each statement describes your natural tendencies (1-5):</p>
        </div>

        <form id="oceanForm" onsubmit="Games.handleOceanSubmit(event)" class="space-y-4">
          ${this.oceanQuestions.map((q, idx) => `
            <div class="p-4 rounded-xl bg-museum-950 border border-slate-800">
              <p class="text-xs text-slate-200 mb-3 font-semibold">${idx + 1}. ${q.text}</p>
              <div class="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                <span>Strongly Disagree</span>
                <div class="flex space-x-3">
                  ${[1, 2, 3, 4, 5].map(val => `
                    <label class="cursor-pointer flex flex-col items-center">
                      <input type="radio" name="ocean_${q.trait}" value="${val * 20}" required class="text-purple-500">
                      <span class="text-[10px] text-slate-500 mt-1">${val}</span>
                    </label>
                  `).join('')}
                </div>
                <span>Strongly Agree</span>
              </div>
            </div>
          `).join('')}

          <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-500/20">
            Compute Holographic Radar Chart
          </button>
        </form>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  handleOceanSubmit(e) {
    e.preventDefault();
    const form = e.target;
    this.oceanScores.O = parseInt(form.querySelector('input[name="ocean_O"]:checked').value);
    this.oceanScores.C = parseInt(form.querySelector('input[name="ocean_C"]:checked').value);
    this.oceanScores.E = parseInt(form.querySelector('input[name="ocean_E"]:checked').value);
    this.oceanScores.A = parseInt(form.querySelector('input[name="ocean_A"]:checked').value);
    this.oceanScores.N = parseInt(form.querySelector('input[name="ocean_N"]:checked').value);

    if (window.AudioAmbiance) AudioAmbiance.playSfx('badge');

    const area = document.getElementById('gameActiveContainer');
    area.innerHTML = `
      <div class="w-full max-w-lg text-center space-y-6">
        <h3 class="font-display font-bold text-2xl text-white">Your Holographic OCEAN Profile</h3>
        
        <!-- Interactive SVG Radar Chart -->
        <div class="w-64 h-64 mx-auto relative flex items-center justify-center p-2 bg-museum-950 rounded-full border border-slate-800">
          <svg viewBox="0 0 200 200" class="w-full h-full">
            <!-- Radar concentric circles -->
            <circle cx="100" cy="100" r="30" fill="none" stroke="#334155" stroke-dasharray="2,2"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#334155" stroke-dasharray="2,2"/>
            <circle cx="100" cy="100" r="85" fill="none" stroke="#475569" stroke-width="1.5"/>
            <!-- Spokes -->
            <line x1="100" y1="100" x2="100" y2="15" stroke="#475569" stroke-width="1"/>
            <line x1="100" y1="100" x2="180" y2="70" stroke="#475569" stroke-width="1"/>
            <line x1="100" y1="100" x2="150" y2="165" stroke="#475569" stroke-width="1"/>
            <line x1="100" y1="100" x2="50" y2="165" stroke="#475569" stroke-width="1"/>
            <line x1="100" y1="100" x2="20" y2="70" stroke="#475569" stroke-width="1"/>
            <!-- Data polygon -->
            <polygon points="
              100,${100 - (this.oceanScores.O * 0.85)}
              ${100 + (this.oceanScores.C * 0.8)},${100 - (this.oceanScores.C * 0.3)}
              ${100 + (this.oceanScores.E * 0.5)},${100 + (this.oceanScores.E * 0.65)}
              ${100 - (this.oceanScores.A * 0.5)},${100 + (this.oceanScores.A * 0.65)}
              ${100 - (this.oceanScores.N * 0.8)},${100 - (this.oceanScores.N * 0.3)}
            " fill="rgba(168, 85, 247, 0.35)" stroke="#c084fc" stroke-width="2"/>
          </svg>
        </div>

        <div class="grid grid-cols-5 gap-2 text-center text-xs font-mono">
          <div class="p-2 bg-museum-950 rounded-lg border border-purple-500/30">O: ${this.oceanScores.O}%</div>
          <div class="p-2 bg-museum-950 rounded-lg border border-blue-500/30">C: ${this.oceanScores.C}%</div>
          <div class="p-2 bg-museum-950 rounded-lg border border-amber-500/30">E: ${this.oceanScores.E}%</div>
          <div class="p-2 bg-museum-950 rounded-lg border border-emerald-500/30">A: ${this.oceanScores.A}%</div>
          <div class="p-2 bg-museum-950 rounded-lg border border-rose-500/30">N: ${this.oceanScores.N}%</div>
        </div>

        <div class="flex gap-3 justify-center">
          <button onclick="Games.initOceanTest()" class="px-5 py-2.5 rounded-xl bg-museum-950 border border-slate-800 text-xs text-white">Retake</button>
          <button onclick="Games.submitScore('ocean-test', 850, null, 100)" class="px-6 py-2.5 rounded-xl bg-purple-500 text-museum-950 font-bold text-xs">Save to Pass</button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  /* ==========================================
     GAME 5: BIAS DETECTIVE
     ========================================== */
  biasCases: [
    {
      caseText: "A movie enthusiast spent $15 on a terrible cinema ticket. Even though the movie gave them a headache within 20 minutes, they refused to leave early, stating: 'I cannot waste my $15!'",
      correct: "Sunk Cost Fallacy",
      options: ["Sunk Cost Fallacy", "Anchoring Bias", "Confirmation Bias", "Gambler's Fallacy"],
      explanation: "The $15 is already unrecoverable. Staying only wastes additional valuable time and well-being."
    },
    {
      caseText: "A roulette wheel has landed on RED seven consecutive times. A player confidently bets their remaining chips on BLACK, insisting: 'Black is overdue to balance the universe!'",
      correct: "Gambler's Fallacy",
      options: ["Gambler's Fallacy", "Confirmation Bias", "Availability Heuristic", "Framing Effect"],
      explanation: "Each spin of a fair roulette wheel is an independent event with identical odds. The universe possesses no memory of past spins."
    },
    {
      caseText: "After viewing an intense 24-hour news report covering a rare plane crash, a traveler chooses to drive 1,500 miles instead, convinced commercial flying is far too lethal.",
      correct: "Availability Heuristic",
      options: ["Availability Heuristic", "Hindsight Bias", "Loss Aversion", "Dunning-Kruger Effect"],
      explanation: "The Availability Heuristic causes people to estimate probability based on how easily vivid emotional examples come to mind."
    },
    {
      caseText: "A manager only reads customer reviews that praise his favorite feature while dismissing negative reviews as 'anomalies written by competitors'.",
      correct: "Confirmation Bias",
      options: ["Confirmation Bias", "Halo Effect", "Actor-Observer Asymmetry", "Status Quo Bias"],
      explanation: "Confirmation bias is the tendency to search for, interpret, and recall information in a way that confirms prior beliefs."
    }
  ],
  biasIndex: 0,
  biasScore: 0,

  initBiasDetective() {
    this.biasIndex = 0;
    this.biasScore = 0;
    this.renderBiasQuestion();
  },

  renderBiasQuestion() {
    const area = document.getElementById('gameActiveContainer');
    if (!area) return;

    if (this.biasIndex >= this.biasCases.length) {
      this.finishBiasDetective();
      return;
    }

    const c = this.biasCases[this.biasIndex];
    area.innerHTML = `
      <div class="w-full max-w-xl space-y-6">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <span class="text-xs font-mono text-amber-400">Case ${this.biasIndex + 1} of ${this.biasCases.length}</span>
          <span class="text-xs font-mono text-slate-400">Score: ${this.biasScore} pts</span>
        </div>
        <div class="p-6 rounded-2xl bg-museum-950 border border-slate-800">
          <h4 class="font-display font-bold text-lg text-white mb-2">Diagnostic Scenario:</h4>
          <p class="text-sm text-slate-300 leading-relaxed font-light">"${c.caseText}"</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${c.options.map(opt => `
            <button onclick="Games.checkBiasAnswer('${opt}')" class="p-3.5 rounded-xl bg-museum-950 border border-slate-800 hover:border-amber-500/50 text-left text-xs font-semibold text-slate-200 transition">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  checkBiasAnswer(choice) {
    const c = this.biasCases[this.biasIndex];
    const isCorrect = choice === c.correct;
    if (isCorrect) {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('success');
      this.biasScore += 250;
    } else {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('error');
    }
    this.biasIndex++;
    setTimeout(() => this.renderBiasQuestion(), 500);
  },

  finishBiasDetective() {
    const area = document.getElementById('gameActiveContainer');
    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <h3 class="font-display font-bold text-2xl text-white">Trial Completed</h3>
        <div class="p-5 rounded-2xl bg-museum-950 border border-slate-800">
          <div class="font-display font-black text-4xl text-amber-400">${this.biasScore} / 1000</div>
          <p class="text-xs text-slate-400 mt-2">Critical discernment unmasks bounded rationality.</p>
        </div>
        <div class="flex gap-3 justify-center">
          <button onclick="Games.initBiasDetective()" class="px-5 py-2.5 rounded-xl bg-museum-950 border border-slate-800 text-xs text-white">Retrial</button>
          <button onclick="Games.submitScore('bias-detective', ${this.biasScore}, null, 100)" class="px-6 py-2.5 rounded-xl bg-amber-500 text-museum-950 font-bold text-xs">Save to Pass</button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  /* ==========================================
     GAME 6: MONTY HALL PROBABILITY SIMULATOR
     ========================================== */
  montySim: { trials: 0, switchWins: 0, stayWins: 0 },

  initMontyHallGame() {
    const area = document.getElementById('gameActiveContainer');
    if (!area) return;

    area.innerHTML = `
      <div class="w-full max-w-xl text-center space-y-6">
        <div>
          <span class="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs uppercase">Bayesian Probability</span>
          <h3 class="font-display font-bold text-2xl text-white mt-2">Monty Hall Fast Probability Simulator</h3>
          <p class="text-xs text-slate-300 mt-1">Simulate 100 trials of Switching vs Staying to observe the 66.7% law emerge in real time!</p>
        </div>

        <div class="flex gap-4 justify-center">
          <button onclick="Games.runMontyBatch(10)" class="px-5 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold transition">
            Simulate 10 Trials
          </button>
          <button onclick="Games.runMontyBatch(100)" class="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition">
            Simulate 100 Trials
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div class="p-4 rounded-xl bg-museum-950 border border-slate-800">
            <span class="text-xs font-mono text-slate-400 block mb-1">Switching Strategy</span>
            <div id="simSwitchRate" class="font-display font-bold text-2xl text-emerald-400">66.7%</div>
            <span id="simSwitchWins" class="text-[11px] font-mono text-slate-500">Wins: 0</span>
          </div>
          <div class="p-4 rounded-xl bg-museum-950 border border-slate-800">
            <span class="text-xs font-mono text-slate-400 block mb-1">Staying Strategy</span>
            <div id="simStayRate" class="font-display font-bold text-2xl text-rose-400">33.3%</div>
            <span id="simStayWins" class="text-[11px] font-mono text-slate-500">Wins: 0</span>
          </div>
        </div>

        <div class="flex justify-center">
          <button onclick="Games.submitScore('monty-hall', 67, null, 100)" class="px-6 py-2.5 rounded-xl bg-blue-500 text-white font-bold text-xs">
            Archive Probability Metric to Pass
          </button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  runMontyBatch(count) {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
    for (let i = 0; i < count; i++) {
      const car = Math.floor(Math.random() * 3);
      const pick = Math.floor(Math.random() * 3);
      if (car === pick) {
        this.montySim.stayWins++;
      } else {
        this.montySim.switchWins++;
      }
      this.montySim.trials++;
    }

    const switchPct = Math.round((this.montySim.switchWins / this.montySim.trials) * 100);
    const stayPct = Math.round((this.montySim.stayWins / this.montySim.trials) * 100);

    document.getElementById('simSwitchRate').textContent = `${switchPct}%`;
    document.getElementById('simStayRate').textContent = `${stayPct}%`;
    document.getElementById('simSwitchWins').textContent = `Wins: ${this.montySim.switchWins} / ${this.montySim.trials}`;
    document.getElementById('simStayWins').textContent = `Wins: ${this.montySim.stayWins} / ${this.montySim.trials}`;
  },

  /* Score submission & Leaderboard */
  getLocalScores() {
    return JSON.parse(localStorage.getItem('hmm_my_scores') || '[]');
  },

  async submitScore(gameId, score, rt, acc) {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('click');

    if (!Auth.isLoggedIn()) {
      Auth.generateGuestPass();
    }

    const u = Auth.currentUser || { username: 'Explorer', id: 'usr_guest' };
    const scoreRecord = {
      id: `sc_${Date.now()}`,
      userId: u.id,
      username: u.username,
      gameId,
      score: Number(score),
      reactionTimeMs: rt ? Number(rt) : null,
      accuracy: acc !== undefined ? Number(acc) : 100,
      timestamp: new Date().toISOString()
    };

    const myScores = this.getLocalScores();
    myScores.push(scoreRecord);
    localStorage.setItem('hmm_my_scores', JSON.stringify(myScores));

    const leaderboard = JSON.parse(localStorage.getItem('hmm_leaderboard') || '[]');
    leaderboard.push(scoreRecord);
    localStorage.setItem('hmm_leaderboard', JSON.stringify(leaderboard));

    if (window.AudioAmbiance) AudioAmbiance.playSfx('badge');
    if (window.App) App.showToast(`Neural score archived to your pass! (${score} pts)`);
  },

  async showLeaderboardModal() {
    const modal = document.getElementById('leaderboardModal');
    const container = document.getElementById('leaderboardRowsContainer');
    if (!modal || !container) return;

    modal.classList.remove('hidden');

    let scores = [];
    try {
      const res = await fetch('/api/games/leaderboard');
      if (res.ok) scores = await res.json();
    } catch (e) {}

    if (!scores || scores.length === 0) {
      const defaultScores = [
        { username: "Dr. Vance", gameId: "stroop", score: 1850, reactionTimeMs: 420 },
        { username: "Dr. Vance", gameId: "bias-detective", score: 950 },
        { username: "Prachi (Architect)", gameId: "memory-matrix", score: 1200 },
        { username: "NeuroNaut", gameId: "micro-expressions", score: 900 }
      ];
      const localLeaderboard = JSON.parse(localStorage.getItem('hmm_leaderboard') || '[]');
      scores = [...localLeaderboard, ...defaultScores].sort((a, b) => b.score - a.score).slice(0, 10);
    }

    container.innerHTML = scores.map((s, i) => `
      <div class="p-3 rounded-xl bg-museum-950 border border-slate-800 flex items-center justify-between text-xs">
        <div class="flex items-center space-x-3">
          <span class="w-6 h-6 rounded-full font-bold text-[10px] flex items-center justify-center ${i === 0 ? 'bg-amber-400 text-museum-950' : 'bg-slate-800 text-slate-400'}">
            ${i + 1}
          </span>
          <div>
            <div class="font-bold text-white">${s.username}</div>
            <div class="font-mono text-[10px] text-slate-400">${s.gameId}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-mono font-bold text-amber-300">${s.score} pts</div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  closeLeaderboardModal() {
    const modal = document.getElementById('leaderboardModal');
    if (modal) modal.classList.add('hidden');
  }
};

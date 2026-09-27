// Interactive Cognitive Psychology Games Engine
const Games = {
  activeGame: 'stroop',
  catalog: [],

  async init() {
    try {
      const res = await fetch('/api/games/catalog');
      if (res.ok) {
        this.catalog = await res.json();
      } else {
        throw new Error('Using offline catalog');
      }
    } catch (e) {
      this.catalog = [
        {
          id: "stroop",
          title: "The Stroop Effect Challenge",
          subtitle: "Frontal Lobe Conflict & Cognitive Interference Test",
          metricName: "Interference Delay (ms) & Accuracy"
        },
        {
          id: "memory-matrix",
          title: "The Working Memory Matrix",
          subtitle: "Spatial Span & Miller's 7±2 Law Experiment",
          metricName: "Span Capacity Level"
        },
        {
          id: "bias-detective",
          title: "Cognitive Bias Detective",
          subtitle: "Rationality Trial & Fallacy Diagnostics",
          metricName: "Deductive Rationality Score"
        },
        {
          id: "micro-expressions",
          title: "Micro-Expression Emotion Decoder",
          subtitle: "Paul Ekman's High-Speed Facial Action Coding Test",
          metricName: "Empathy Recognition Index"
        }
      ];
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
    AudioAmbiance.playSfx('click');
    this.activeGame = gameId;
    this.renderCatalogGrid();

    if (gameId === 'stroop') this.initStroop();
    else if (gameId === 'memory-matrix') this.initMemoryMatrix();
    else if (gameId === 'bias-detective') this.initBiasDetective();
    else if (gameId === 'micro-expressions') this.initMicroExpressions();
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
          <button onclick="Games.handleStroopAnswer('RED')" class="py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/50 text-rose-300 font-bold text-xs tracking-wider transition">RED (1)</button>
          <button onclick="Games.handleStroopAnswer('BLUE')" class="py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/50 text-blue-300 font-bold text-xs tracking-wider transition">BLUE (2)</button>
          <button onclick="Games.handleStroopAnswer('GREEN')" class="py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/50 text-emerald-300 font-bold text-xs tracking-wider transition">GREEN (3)</button>
          <button onclick="Games.handleStroopAnswer('YELLOW')" class="py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/50 text-amber-300 font-bold text-xs tracking-wider transition">YELLOW (4)</button>
        </div>

        <div class="flex items-center justify-center space-x-4">
          <button id="stroopStartBtn" onclick="Games.startStroop()" class="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition">
            Start 10-Trial Test
          </button>
        </div>
      </div>
    `;
  },

  startStroop() {
    AudioAmbiance.playSfx('click');
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
      AudioAmbiance.playSfx('success');
      this.stroopState.correctCount++;
    } else {
      AudioAmbiance.playSfx('error');
    }

    this.nextStroopTrial();
  },

  async finishStroop() {
    this.stroopState.isRunning = false;
    const avgRt = Math.round(this.stroopState.reactionTimes.reduce((a, b) => a + b, 0) / this.stroopState.reactionTimes.length);
    const accuracy = Math.round((this.stroopState.correctCount / this.stroopState.maxRounds) * 100);
    const score = Math.max(100, Math.round((1000 - avgRt) * 2 + accuracy * 10));

    AudioAmbiance.playSfx('badge');

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

        <p class="text-xs text-slate-300 leading-relaxed font-light">
          ${avgRt < 600 ? '⚡ Outstanding executive inhibition! Your prefrontal cortex effortlessly suppressed automated reading reflexes.' : 'Strong effort! Slower latencies reflect normal cognitive interference (the Stroop conflict effect).'}
        </p>

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
    level: 3, // starts at 3-tile span
    sequence: [],
    userIndex: 0,
    isInputAllowed: false
  },

  initMemoryMatrix() {
    const area = document.getElementById('gameActiveContainer');
    if (!area) return;

    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <div>
          <span class="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase">
            Working Memory Span Test (Miller's Law)
          </span>
          <h3 class="font-display font-bold text-2xl text-white mt-2">The Working Memory Matrix</h3>
          <p id="matrixInstruction" class="text-xs text-slate-300 mt-1">
            Observe the tiles flashing in sequence, then click them in the exact same order.
          </p>
        </div>

        <div class="matrix-grid" id="matrixGridContainer">
          ${[0,1,2,3,4,5,6,7,8].map(i => `
            <div id="tile-${i}" onclick="Games.handleMatrixClick(${i})" class="matrix-tile"></div>
          `).join('')}
        </div>

        <div class="flex items-center justify-between max-w-xs mx-auto text-xs font-mono text-slate-400">
          <span>Current Span: <strong id="matrixSpanLabel" class="text-emerald-400">Level 3</strong></span>
          <span>Target: 7±2 chunks</span>
        </div>

        <button id="matrixStartBtn" onclick="Games.startMatrixRound()" class="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white font-bold text-xs tracking-wider shadow-lg shadow-emerald-500/25 transition">
          Start Memory Sequence
        </button>
      </div>
    `;
    this.matrixState.level = 3;
  },

  async startMatrixRound() {
    AudioAmbiance.playSfx('click');
    const btn = document.getElementById('matrixStartBtn');
    const instruction = document.getElementById('matrixInstruction');
    const spanLabel = document.getElementById('matrixSpanLabel');
    if (btn) btn.classList.add('hidden');
    if (instruction) instruction.textContent = 'Memorize the flashing sequence...';
    if (spanLabel) spanLabel.textContent = `Level ${this.matrixState.level}`;

    this.matrixState.isInputAllowed = false;
    this.matrixState.sequence = [];
    this.matrixState.userIndex = 0;

    for (let i = 0; i < this.matrixState.level; i++) {
      this.matrixState.sequence.push(Math.floor(Math.random() * 9));
    }

    // Playback sequence
    for (let i = 0; i < this.matrixState.sequence.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      const tileIndex = this.matrixState.sequence[i];
      const tileEl = document.getElementById(`tile-${tileIndex}`);
      if (tileEl) {
        tileEl.classList.add('active-flash');
        AudioAmbiance.playSfx('click');
        await new Promise(r => setTimeout(r, 450));
        tileEl.classList.remove('active-flash');
      }
    }

    if (instruction) instruction.textContent = 'Now click the tiles in the exact sequence!';
    this.matrixState.isInputAllowed = true;
  },

  handleMatrixClick(index) {
    if (!this.matrixState.isInputAllowed) return;

    const tileEl = document.getElementById(`tile-${index}`);
    const expected = this.matrixState.sequence[this.matrixState.userIndex];

    if (index === expected) {
      AudioAmbiance.playSfx('success');
      tileEl.classList.add('correct');
      setTimeout(() => tileEl.classList.remove('correct'), 250);

      this.matrixState.userIndex++;
      if (this.matrixState.userIndex >= this.matrixState.sequence.length) {
        // Level cleared!
        AudioAmbiance.playSfx('badge');
        this.matrixState.level++;
        const instruction = document.getElementById('matrixInstruction');
        if (instruction) instruction.textContent = `Excellent! Level ${this.matrixState.level - 1} mastered. Advancing to Level ${this.matrixState.level}...`;
        this.matrixState.isInputAllowed = false;
        setTimeout(() => this.startMatrixRound(), 1200);
      }
    } else {
      // Mistake: game over
      AudioAmbiance.playSfx('error');
      tileEl.classList.add('wrong');
      this.matrixState.isInputAllowed = false;
      setTimeout(() => this.finishMatrix(), 600);
    }
  },

  finishMatrix() {
    const finalSpan = this.matrixState.level - 1;
    const score = finalSpan * 150;
    AudioAmbiance.playSfx('badge');

    const area = document.getElementById('gameActiveContainer');
    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
          <i data-lucide="award" class="w-8 h-8"></i>
        </div>
        <h3 class="font-display font-bold text-2xl text-white">Working Memory Span Evaluated</h3>
        
        <div class="p-5 rounded-2xl bg-museum-950 border border-slate-800">
          <span class="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">Max Visuospatial Span</span>
          <div class="font-display font-black text-4xl text-emerald-400">${finalSpan} Items</div>
          <p class="text-xs text-slate-400 mt-2">
            Average human working memory capacity is <strong>7 ± 2 chunks</strong> (George Miller, 1956).
          </p>
        </div>

        <div class="flex gap-3 justify-center">
          <button onclick="Games.initMemoryMatrix()" class="px-5 py-2.5 rounded-xl bg-museum-950 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-slate-700 transition">
            Retry Matrix
          </button>
          <button onclick="Games.submitScore('memory-matrix', ${finalSpan}, null, 100)" class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-museum-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20">
            Archive to Visitor Pass
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  /* ==========================================
     GAME 3: COGNITIVE BIAS DETECTIVE
     ========================================== */
  biasCases: [
    {
      caseText: "A startup founder has invested \$200,000 and two grueling years into a doomed product. Despite zero active users, she says: 'We have to keep going, otherwise all that money and sweat was wasted!'",
      correct: "Sunk Cost Fallacy",
      options: ["Sunk Cost Fallacy", "Anchoring Bias", "Survivorship Bias", "Fundamental Attribution Error"],
      explanation: "The Sunk Cost Fallacy occurs when people continue a behavior as a result of previously invested resources that cannot be recovered."
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
      explanation: "The Availability Heuristic causes people to estimate probability based on how easily vivid emotional examples come to mind, rather than statistical reality."
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

        <p class="text-xs font-mono text-slate-400 text-center uppercase tracking-wider">Identify the Cognitive Bias:</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${c.options.map(opt => `
            <button onclick="Games.checkBiasAnswer('${opt}')" class="p-3.5 rounded-xl bg-museum-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/40 text-left text-xs font-semibold text-slate-200 transition">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkBiasAnswer(choice) {
    const c = this.biasCases[this.biasIndex];
    const isCorrect = choice === c.correct;

    if (isCorrect) {
      AudioAmbiance.playSfx('success');
      this.biasScore += 250;
    } else {
      AudioAmbiance.playSfx('error');
    }

    const area = document.getElementById('gameActiveContainer');
    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-5">
        <div class="w-12 h-12 rounded-full ${isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' : 'bg-rose-500/20 text-rose-400 border border-rose-500'} flex items-center justify-center mx-auto">
          <i data-lucide="${isCorrect ? 'check' : 'x'}" class="w-6 h-6"></i>
        </div>
        <h4 class="font-display font-bold text-xl text-white">${isCorrect ? 'Correct Diagnosis!' : 'Incorrect Fallacy'}</h4>
        <p class="text-xs text-amber-300 font-mono">Actual Bias: ${c.correct}</p>
        <p class="text-xs text-slate-300 leading-relaxed bg-museum-950 p-4 rounded-xl border border-slate-800">${c.explanation}</p>
        <button onclick="Games.advanceBias()" class="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-museum-950 font-bold text-xs transition">
          Next Scenario
        </button>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  advanceBias() {
    AudioAmbiance.playSfx('click');
    this.biasIndex++;
    this.renderBiasQuestion();
  },

  finishBiasDetective() {
    AudioAmbiance.playSfx('badge');
    const area = document.getElementById('gameActiveContainer');
    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-300">
          <i data-lucide="shield-check" class="w-8 h-8"></i>
        </div>
        <h3 class="font-display font-bold text-2xl text-white">Trial Completed</h3>
        
        <div class="p-5 rounded-2xl bg-museum-950 border border-slate-800">
          <span class="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">Rationality Score</span>
          <div class="font-display font-black text-4xl text-amber-400">${this.biasScore} / 1000</div>
          <p class="text-xs text-slate-400 mt-2">
            ${this.biasScore >= 750 ? 'Exceptional critical discernment! You possess strong resistance to cognitive heuristics.' : 'Insightful effort! Review Wing IV to sharpen your System 2 defenses.'}
          </p>
        </div>

        <div class="flex gap-3 justify-center">
          <button onclick="Games.initBiasDetective()" class="px-5 py-2.5 rounded-xl bg-museum-950 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-slate-700 transition">
            Retrial
          </button>
          <button onclick="Games.submitScore('bias-detective', ${this.biasScore}, null, Math.round((this.biasScore/1000)*100))" class="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-museum-950 font-bold text-xs transition shadow-lg shadow-amber-500/20">
            Archive to Visitor Pass
          </button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  /* ==========================================
     GAME 4: MICRO-EXPRESSION EMOTION DECODER
     ========================================== */
  microTrials: [
    { emotion: "Contempt", cue: "Unilateral lip corner tightener and slight sneer on one side", faceEmoji: "😏" },
    { emotion: "Genuine Joy", cue: "Duchenne marker: orbicularis oculi contraction with crow's feet and symmetric smile", faceEmoji: "😊" },
    { emotion: "Fear", cue: "Eyebrows raised and pulled together, upper eyelids tensed, mouth slightly open", faceEmoji: "😨" },
    { emotion: "Disgust", cue: "Nose wrinkling, raised upper lip, narrowed eyes", faceEmoji: "🤢" }
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
          <span class="px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase">
            Paul Ekman FACS Test
          </span>
          <h3 class="font-display font-bold text-2xl text-white mt-2">Micro-Expression Decoder</h3>
          <p class="text-xs text-slate-300 mt-1">
            Trial ${this.microIndex + 1} of ${this.microTrials.length}: Press reveal to flash the high-speed involuntary expression for 400ms.
          </p>
        </div>

        <div id="microFaceBox" class="w-40 h-40 rounded-3xl bg-museum-950 border border-slate-800 flex items-center justify-center mx-auto text-6xl shadow-inner select-none transition-all">
          😐
        </div>

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
  },

  flashMicroFace(emoji) {
    AudioAmbiance.playSfx('click');
    const box = document.getElementById('microFaceBox');
    const flashBtn = document.getElementById('flashBtn');
    const options = document.getElementById('microOptions');

    box.textContent = emoji;
    box.classList.add('border-rose-500', 'scale-105');

    setTimeout(() => {
      box.textContent = '😐';
      box.classList.remove('border-rose-500', 'scale-105');
      if (flashBtn) flashBtn.classList.add('hidden');
      if (options) options.classList.remove('hidden');
    }, 400);
  },

  checkMicro(choice) {
    const t = this.microTrials[this.microIndex];
    const isCorrect = choice === t.emotion;

    if (isCorrect) {
      AudioAmbiance.playSfx('success');
      this.microScore += 250;
    } else {
      AudioAmbiance.playSfx('error');
    }

    this.microIndex++;
    setTimeout(() => this.renderMicroTrial(), 500);
  },

  finishMicro() {
    AudioAmbiance.playSfx('badge');
    const area = document.getElementById('gameActiveContainer');
    area.innerHTML = `
      <div class="w-full max-w-md text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center mx-auto text-rose-300">
          <i data-lucide="smile" class="w-8 h-8"></i>
        </div>
        <h3 class="font-display font-bold text-2xl text-white">Affective Recognition Index</h3>
        
        <div class="p-5 rounded-2xl bg-museum-950 border border-slate-800">
          <span class="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">Score</span>
          <div class="font-display font-black text-4xl text-rose-400">${this.microScore} / 1000</div>
          <p class="text-xs text-slate-400 mt-2">
            In Paul Ekman's studies, recognizing sub-second micro-expressions correlates directly with high affective empathy and deception detection.
          </p>
        </div>

        <div class="flex gap-3 justify-center">
          <button onclick="Games.initMicroExpressions()" class="px-5 py-2.5 rounded-xl bg-museum-950 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-slate-700 transition">
            Test Again
          </button>
          <button onclick="Games.submitScore('micro-expressions', ${this.microScore}, null, Math.round((this.microScore/1000)*100))" class="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-museum-950 font-bold text-xs transition shadow-lg shadow-rose-500/20">
            Archive to Visitor Pass
          </button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  getLocalScores() {
    return JSON.parse(localStorage.getItem('hmm_my_scores') || '[]');
  },

  async submitScore(gameId, score, rt, acc) {
    AudioAmbiance.playSfx('click');

    // Auto-create guest pass if user not signed in
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

    // Save to local scores
    const myScores = this.getLocalScores();
    myScores.push(scoreRecord);
    localStorage.setItem('hmm_my_scores', JSON.stringify(myScores));

    // Save to local leaderboard
    const leaderboard = JSON.parse(localStorage.getItem('hmm_leaderboard') || '[]');
    leaderboard.push(scoreRecord);
    localStorage.setItem('hmm_leaderboard', JSON.stringify(leaderboard));

    // Award badges
    let user = Auth.currentUser;
    let newBadges = [];
    if (user) {
      const currentBadges = user.badges || [];
      if (gameId === 'stroop' && score >= 1200 && !currentBadges.includes('Neural Overdrive')) {
        currentBadges.push('Neural Overdrive');
        newBadges.push('Neural Overdrive');
      }
      if (gameId === 'memory-matrix' && score >= 5 && !currentBadges.includes('Hippocampal Prodigy')) {
        currentBadges.push('Hippocampal Prodigy');
        newBadges.push('Hippocampal Prodigy');
      }
      if (gameId === 'bias-detective' && score >= 500 && !currentBadges.includes('Bias Hunter')) {
        currentBadges.push('Bias Hunter');
        newBadges.push('Bias Hunter');
      }
      if (gameId === 'micro-expressions' && score >= 500 && !currentBadges.includes('Affective Empath')) {
        currentBadges.push('Affective Empath');
        newBadges.push('Affective Empath');
      }

      if (myScores.length >= 3 && user.visitorLevel === 'Novice Explorer') {
        user.visitorLevel = 'Cognitive Apprentice';
      }
      if (myScores.length >= 6) {
        user.visitorLevel = 'Senior Neuro-Investigator';
      }

      user.badges = currentBadges;
      localStorage.setItem(Auth.userKey, JSON.stringify(user));
      Auth.renderHeader();
    }

    // Try server sync
    const token = Auth.getToken();
    if (token) {
      fetch('/api/games/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ gameId, score, reactionTimeMs: rt, accuracy: acc })
      }).catch(() => {});
    }

    AudioAmbiance.playSfx('badge');
    App.showToast(`Neural score archived to your pass! (${score} pts)`);
    if (newBadges.length > 0) {
      setTimeout(() => App.showToast(`🏆 Medal Unlocked: ${newBadges[0]}!`), 1000);
    }
  },

  async showLeaderboardModal() {
    AudioAmbiance.playSfx('click');
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
      // Default curated leaderboard + user's local scores
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
          <span class="w-6 h-6 rounded-full ${i === 0 ? 'bg-amber-400 text-museum-950 font-bold' : (i === 1 ? 'bg-slate-300 text-museum-950 font-bold' : (i === 2 ? 'bg-amber-700 text-white font-bold' : 'text-slate-500 font-mono'))} flex items-center justify-center text-[10px]">
            ${i + 1}
          </span>
          <div>
            <div class="font-bold text-white">${s.username}</div>
            <div class="font-mono text-[10px] text-slate-400">${s.gameId}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-mono font-bold text-amber-300">${s.score} pts</div>
          ${s.reactionTimeMs ? `<div class="font-mono text-[10px] text-slate-500">${s.reactionTimeMs}ms</div>` : ''}
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

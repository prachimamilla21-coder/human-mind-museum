// The Human Mind Museum - Seven Educational Psychology Rooms Controller
const Wings = {
  exhibits: [],
  activeWingId: 'memory',
  activeSectionIndex: 0,
  activeQuizRoom: null,
  quizAnswers: {},

  async init() {
    try {
      const res = await fetch('/api/exhibits');
      if (res.ok) {
        this.exhibits = await res.json();
      } else {
        throw new Error('Using offline exhibits');
      }
    } catch (e) {
      console.warn('Using client-side fallback for 7 psychology rooms');
      this.exhibits = this.getFallbackExhibits();
    }

    this.renderHomeWings();
    this.renderTabs();
    this.selectWing(this.activeWingId);
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

          <!-- Sub-sections preview -->
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
    
    // Check if we need to switch view
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
          <span class="text-[11px] font-mono uppercase text-cyan-400 tracking-wider font-bold">Room ${w.wingNumber} of 7</span>
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
          ${(w.sections || []).map((sec, idx) => `
            <div class="p-6 rounded-2xl border border-slate-800 bg-museum-900/60 hover:bg-museum-850/80 transition flex flex-col justify-between">
              <div>
                <div class="flex items-center space-x-3 mb-3">
                  <span class="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
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
            Passing: 3/4 Correct
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
    if (!questions.length) return `<p class="text-xs text-slate-500">Quiz coming soon.</p>`;

    return `
      <form id="quizForm-${room.id}" onsubmit="Wings.handleQuizSubmit(event, '${room.id}')" class="space-y-6">
        ${questions.map((q, qIdx) => `
          <div class="p-5 rounded-2xl bg-museum-950 border border-slate-800/80">
            <p class="font-semibold text-sm text-white mb-3 flex items-start space-x-2">
              <span class="font-mono text-xs text-amber-400 mt-0.5">Q${qIdx + 1}.</span>
              <span>${q.question}</span>
            </p>
            <div class="space-y-2">
              ${q.options.map((opt, optIdx) => `
                <label class="flex items-center space-x-3 p-3 rounded-xl bg-museum-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
                  <input type="radio" name="q_${qIdx}" value="${optIdx}" required class="text-amber-500 focus:ring-amber-500">
                  <span class="text-xs text-slate-300">${opt}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div class="flex items-center justify-between pt-4">
          <button type="submit" class="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-museum-950 font-bold text-xs tracking-wider uppercase transition shadow-lg shadow-amber-500/20 flex items-center space-x-2">
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

    room.quiz.forEach((q, qIdx) => {
      const selected = form.querySelector(`input[name="q_${qIdx}"]:checked`);
      if (selected && parseInt(selected.value) === q.correct) {
        score++;
      }
    });

    const resultBox = document.getElementById(`quizResult-${roomId}`);
    const percent = Math.round((score / total) * 100);
    const passed = score >= 3;

    if (passed) {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('success');
      resultBox.innerHTML = `
        <span class="text-emerald-400 font-bold">🎉 Passed! ${score}/${total} (${percent}%) — Badge Awarded!</span>
      `;
      if (window.App) App.showToast(`Quiz Passed! Score: ${score}/${total}. Room badge earned!`);
    } else {
      if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
      resultBox.innerHTML = `
        <span class="text-amber-400 font-bold">Score: ${score}/${total} (${percent}%). Review and try again!</span>
      `;
    }

    // Save quiz result to backend or localStorage
    if (window.Auth && Auth.isLoggedIn()) {
      try {
        const token = Auth.getToken();
        await fetch('/api/auth/record-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ roomId, score, total })
        });
      } catch (err) {
        console.error('Quiz record error:', err);
      }
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
                <p class="text-xs text-slate-400">Can you remember a 10-digit number without chunking vs with chunking?</p>
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
                <p class="text-xs text-slate-400">Do the two horizontal bars look equal? Use the slider to reveal their physical length:</p>
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
                <span class="text-[10px] text-slate-400">Curiosity & Imagination</span>
              </button>
              <button onclick="Wings.selectOcean('C')" class="p-4 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">C</span>
                <span class="font-bold text-sm block text-white">Conscientious</span>
                <span class="text-[10px] text-slate-400">Discipline & Order</span>
              </button>
              <button onclick="Wings.selectOcean('E')" class="p-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">E</span>
                <span class="font-bold text-sm block text-white">Extraversion</span>
                <span class="text-[10px] text-slate-400">Sociability & Energy</span>
              </button>
              <button onclick="Wings.selectOcean('A')" class="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">A</span>
                <span class="font-bold text-sm block text-white">Agreeable</span>
                <span class="text-[10px] text-slate-400">Empathy & Trust</span>
              </button>
              <button onclick="Wings.selectOcean('N')" class="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-left transition hover:scale-105">
                <span class="font-mono text-xs font-bold block mb-1">N</span>
                <span class="font-bold text-sm block text-white">Neuroticism</span>
                <span class="text-[10px] text-slate-400">Sensitivity & Reactivity</span>
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
      // Host reveals goat behind one of the OTHER doors
      const otherDoors = [0, 1, 2].filter(d => d !== doorIndex && d !== this.montyState.carDoor);
      const hostDoor = otherDoors[Math.floor(Math.random() * otherDoors.length)];
      this.montyState.revealedGoat = hostDoor;
      this.montyState.stage = 1;

      // Update UI
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

    // Reveal car door
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
    if (window.AudioAmbiance) {
      AudioAmbiance.speak(`Welcome to Room ${wingId}. Step inside and observe the exhibits.`);
    }
    if (window.App) {
      App.showToast(`Audio Guide: Dr. Sophia Vance narration active.`);
    }
  },

  askAIGuide(wingId) {
    if (window.App) App.navigateTo('ai-guide');
    if (window.AIGuide) {
      const input = document.getElementById('aiGuideInput');
      if (input) {
        input.value = `Tell me more about the experiments in the ${wingId} room.`;
      }
    }
  },

  getFallbackExhibits() {
    return [
      { id: "memory", wingNumber: "1", title: "Memory Room", subtitle: "Working memory, short-term recall, and long-term consolidation", icon: "archive" },
      { id: "emotion", wingNumber: "2", title: "Emotion Room", subtitle: "Human emotions, facial expressions, and emotional intelligence", icon: "heart-pulse" },
      { id: "perception", wingNumber: "3", title: "Perception Room", subtitle: "Optical illusions, visual perception, and brain interpretation", icon: "eye" },
      { id: "personality", wingNumber: "4", title: "Personality Room", subtitle: "Big Five traits, self-assessment, and personality types", icon: "user-check" },
      { id: "cognitive-bias", wingNumber: "5", title: "Cognitive Bias Room", subtitle: "Thinking errors, bias demonstrations, and real-life examples", icon: "shield-alert" },
      { id: "decision-making", wingNumber: "6", title: "Decision-Making Room", subtitle: "Decision simulations, risk analysis, and logical puzzles", icon: "scale" },
      { id: "brain-lab", wingNumber: "7", title: "Brain Lab / AI Guide Room", subtitle: "AI-powered explanations and psychology Q&A repository", icon: "cpu" }
    ];
  }
};

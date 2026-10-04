// Master Application Coordinator, Navigation & Progress Dashboard
const App = {
  currentView: 'home',

  init() {
    // Hash routing listener
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      this.navigateTo(hash, false);
    });

    // Check initial hash
    const initialHash = window.location.hash.replace('#', '') || 'home';
    this.navigateTo(initialHash, false);

    // Initialize subsystems
    Auth.init();
    Wings.init();
    Games.init();
    AIGuide.init();
    Journal.init();

    if (window.lucide) lucide.createIcons();
  },

  navigateTo(viewId, updateHash = true) {
    if (updateHash) {
      window.location.hash = viewId;
    }
    this.currentView = viewId;

    // Hide all view panels
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.add('hidden');
    });

    // Show target view panel
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav button styles
    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.nav === viewId) {
        btn.className = 'nav-btn px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition text-cyan-400 bg-cyan-500/10 flex items-center space-x-2';
      } else {
        btn.className = 'nav-btn px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center space-x-2';
      }
    });

    if (viewId === 'dashboard') {
      this.renderDashboard();
    }

    if (window.lucide) lucide.createIcons();
  },

  toggleMobileMenu() {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
  },

  showToast(message) {
    const toast = document.getElementById('toastNotification');
    const msg = document.getElementById('toastMessage');
    if (!toast || !msg) return;

    msg.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3500);
  },

  openThoughtExperiment(wingId) {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('click');
    Wings.selectWing(wingId);
  },

  /* ========================================================
     PROGRESS DASHBOARD CONTROLLER
     ======================================================== */
  renderDashboard() {
    const container = document.getElementById('dashboardContentContainer');
    if (!container) return;

    const user = Auth.currentUser || {
      username: 'Guest Explorer',
      visitorBadgeId: 'HMM-GUEST',
      visitorLevel: 'Novice Explorer',
      joinDate: new Date().toISOString(),
      visitedRooms: [],
      badges: ['Museum Visitor Pass'],
      quizResults: {}
    };

    const visitedRooms = user.visitedRooms || [];
    const quizResults = user.quizResults || {};
    const scores = Games.getLocalScores();
    const badges = user.badges || [];

    const totalRooms = 7;
    const roomsCount = Math.min(totalRooms, visitedRooms.length);
    const roomsPercent = Math.round((roomsCount / totalRooms) * 100);

    const quizzesCompleted = Object.keys(quizResults).length;
    const quizzesPercent = Math.round((quizzesCompleted / totalRooms) * 100);

    const roomDefs = [
      { id: 'memory', num: '1', title: 'Memory Room', icon: 'archive' },
      { id: 'emotion', num: '2', title: 'Emotion Room', icon: 'heart-pulse' },
      { id: 'perception', num: '3', title: 'Perception Room', icon: 'eye' },
      { id: 'personality', num: '4', title: 'Personality Room', icon: 'user-check' },
      { id: 'cognitive-bias', num: '5', title: 'Cognitive Bias Room', icon: 'shield-alert' },
      { id: 'decision-making', num: '6', title: 'Decision-Making Room', icon: 'scale' },
      { id: 'brain-lab', num: '7', title: 'Brain Lab & AI Room', icon: 'cpu' }
    ];

    container.innerHTML = `
      <!-- Visitor Profile Card & Status -->
      <div class="rounded-3xl border border-slate-800 bg-gradient-to-r from-museum-900 via-museum-850 to-museum-900 p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 shadow-lg shadow-cyan-500/20 flex-shrink-0">
              <div class="w-full h-full bg-museum-950 rounded-[14px] flex items-center justify-center font-display font-bold text-2xl text-cyan-400">
                ${user.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="font-display font-bold text-2xl text-white">${user.username}</h3>
                <span class="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                  ${user.visitorBadgeId}
                </span>
              </div>
              <p class="text-xs text-purple-300 font-mono mt-0.5">${user.visitorLevel || 'Novice Explorer'}</p>
              <p class="text-[11px] text-slate-400 mt-1">Visitor since: ${new Date(user.joinDate || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <button onclick="App.showCertificate()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-museum-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition">
              <i data-lucide="award" class="w-4 h-4"></i>
              <span>View Official Certificate</span>
            </button>
            <button onclick="Auth.openVisitorPassModal()" class="px-4 py-2.5 rounded-xl bg-museum-950 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-mono flex items-center space-x-2 transition">
              <i data-lucide="id-card" class="w-4 h-4 text-cyan-400"></i>
              <span>Digital Pass</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Overall Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="p-5 rounded-2xl bg-museum-900/60 border border-slate-800">
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Rooms Explored</span>
            <i data-lucide="layers" class="w-4 h-4 text-cyan-400"></i>
          </div>
          <div class="font-display font-bold text-3xl text-white">${roomsCount} / ${totalRooms}</div>
          <div class="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div class="h-full bg-cyan-400 rounded-full transition-all duration-500" style="width: ${roomsPercent}%"></div>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-museum-900/60 border border-slate-800">
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Quizzes Passed</span>
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>
          </div>
          <div class="font-display font-bold text-3xl text-emerald-400">${quizzesCompleted} / ${totalRooms}</div>
          <div class="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div class="h-full bg-emerald-400 rounded-full transition-all duration-500" style="width: ${quizzesPercent}%"></div>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-museum-900/60 border border-slate-800">
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Badges Earned</span>
            <i data-lucide="shield-check" class="w-4 h-4 text-amber-400"></i>
          </div>
          <div class="font-display font-bold text-3xl text-amber-400">${badges.length}</div>
          <span class="text-[10px] font-mono text-slate-500 mt-2 block">Cortex & Mastery Honors</span>
        </div>

        <div class="p-5 rounded-2xl bg-museum-900/60 border border-slate-800">
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Arcade Records</span>
            <i data-lucide="gamepad-2" class="w-4 h-4 text-purple-400"></i>
          </div>
          <div class="font-display font-bold text-3xl text-purple-400">${scores.length}</div>
          <span class="text-[10px] font-mono text-slate-500 mt-2 block">Cognitive Tests Completed</span>
        </div>
      </div>

      <!-- Seven Rooms Status Cards -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-display font-bold text-xl text-white">Seven Educational Psychology Rooms Status</h4>
          <span class="text-xs font-mono text-slate-400">Completion Tracker</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${roomDefs.map(r => {
            const isVisited = visitedRooms.includes(r.id);
            const quiz = quizResults[r.id];
            return `
              <div class="p-5 rounded-2xl border ${isVisited ? 'border-cyan-500/40 bg-museum-900/80 shadow-md shadow-cyan-500/5' : 'border-slate-800 bg-museum-950/60'} flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold ${isVisited ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}">
                      ROOM ${r.num}
                    </span>
                    <span class="text-xs font-mono flex items-center space-x-1 ${isVisited ? 'text-emerald-400' : 'text-slate-500'}">
                      <i data-lucide="${isVisited ? 'check-circle' : 'circle'}" class="w-3.5 h-3.5"></i>
                      <span>${isVisited ? 'Explored' : 'Unvisited'}</span>
                    </span>
                  </div>

                  <h5 class="font-display font-bold text-base text-white mb-2 flex items-center space-x-2">
                    <i data-lucide="${r.icon}" class="w-4 h-4 text-cyan-400"></i>
                    <span>${r.title}</span>
                  </h5>

                  <div class="text-xs font-mono text-slate-400 mb-4">
                    Quiz Score: ${quiz ? `<span class="text-amber-300 font-bold">${quiz.score}/${quiz.total} Passed</span>` : '<span class="text-slate-500">Not attempted</span>'}
                  </div>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <button onclick="Wings.selectWing('${r.id}')" class="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 transition font-mono font-bold">
                    <span>Enter Room</span>
                    <i data-lucide="arrow-right" class="w-3 h-3"></i>
                  </button>
                  <button onclick="Wings.selectWing('${r.id}'); setTimeout(() => Wings.scrollToQuiz('${r.id}'), 300)" class="text-xs text-amber-400 hover:text-amber-300 transition font-mono">
                    Take Quiz
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Badges Showcase -->
      <div class="p-6 rounded-2xl bg-museum-900/60 border border-slate-800 mb-10">
        <h4 class="font-display font-bold text-xl text-white mb-4">Earned Museum Badges & Honors</h4>
        <div class="flex flex-wrap gap-2.5">
          ${badges.map(b => `
            <span class="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center space-x-1.5 shadow-sm">
              <i data-lucide="award" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>${b}</span>
            </span>
          `).join('')}
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  /* ========================================================
     CERTIFICATE GENERATOR
     ======================================================== */
  showCertificate() {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('badge');
    const modal = document.getElementById('certificateModal');
    const body = document.getElementById('certificateModalBody');
    if (!modal || !body) return;

    const user = Auth.currentUser || { username: 'Inquisitive Explorer', visitorBadgeId: 'HMM-VIS-8842', joinDate: new Date().toISOString() };
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    body.innerHTML = `
      <div class="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-museum-950 via-museum-900 to-museum-950 border-4 border-amber-500/40 text-center shadow-2xl max-w-2xl mx-auto">
        <!-- Certificate Watermark -->
        <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <i data-lucide="brain" class="w-96 h-96 text-white"></i>
        </div>

        <div class="relative z-10">
          <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <span>OFFICIAL NEURO-PSYCHOLOGICAL CREDENTIAL</span>
          </div>

          <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-wide mb-2 uppercase">
            Certificate of Psychological Exploration
          </h2>
          <p class="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-6">
            The Human Mind Museum &bull; Foundation of Cognitive Neuroscience
          </p>

          <p class="text-xs text-slate-400 mb-2">This is to certify that esteemed scholar</p>
          <div class="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-200 to-amber-400 my-3">
            ${user.username}
          </div>
          <p class="text-xs font-mono text-slate-400 mb-6">
            Visitor Pass ID: <strong class="text-cyan-300 font-bold">${user.visitorBadgeId || 'HMM-VIS-2026'}</strong>
          </p>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto mb-8 font-light">
            has rigorously explored the Seven Educational Psychology Rooms—Memory, Emotion, Perception, Personality, Cognitive Bias, Decision-Making, and the Brain Lab—demonstrating profound inquiry into the cognitive architecture of human consciousness.
          </p>

          <div class="grid grid-cols-2 gap-8 border-t border-slate-800 pt-6 max-w-md mx-auto text-left text-xs font-mono">
            <div>
              <span class="text-slate-500 block text-[10px] uppercase">Curator Endorsement</span>
              <strong class="text-purple-300 block text-sm font-display mt-0.5">Dr. Sophia Vance</strong>
              <span class="text-[10px] text-slate-400">Chief Neuro-Curator</span>
            </div>
            <div class="text-right">
              <span class="text-slate-500 block text-[10px] uppercase">Awarded On</span>
              <strong class="text-slate-200 block text-xs mt-0.5">${dateStr}</strong>
              <span class="text-[10px] text-emerald-400">Verified & Sealed</span>
            </div>
          </div>

          <div class="mt-8 flex gap-3 justify-center">
            <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-museum-950 font-bold text-xs transition flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>Print / Save as PDF</span>
            </button>
            <button onclick="App.closeCertificateModal()" class="px-5 py-2.5 rounded-xl bg-museum-900 border border-slate-800 text-slate-300 text-xs hover:border-slate-700 transition">
              Close
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    modal.classList.remove('hidden');
  },

  closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) modal.classList.add('hidden');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

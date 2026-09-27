// Visitor Authentication & Holographic Pass System
const Auth = {
  tokenKey: 'hmm_token',
  userKey: 'hmm_user',
  currentUser: null,

  init() {
    const token = localStorage.getItem(this.tokenKey);
    const user = localStorage.getItem(this.userKey);
    if (token && user) {
      try {
        this.currentUser = JSON.parse(user);
        this.fetchProfile();
      } catch (e) {
        this.logout();
      }
    }
    this.renderHeader();
  },

  getToken() {
    return localStorage.getItem(this.tokenKey);
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  async fetchProfile() {
    const token = this.getToken();
    if (!token) return;
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        this.currentUser = data.user;
        localStorage.setItem(this.userKey, JSON.stringify(data.user));
        this.renderHeader();
        return data;
      } else {
        this.logout();
      }
    } catch (e) {
      console.warn('Could not sync visitor profile:', e);
    }
  },

  renderHeader() {
    const container = document.getElementById('authHeaderContainer');
    if (!container) return;

    if (this.isLoggedIn() && this.currentUser) {
      container.innerHTML = `
        <button onclick="Auth.openVisitorPassModal()" class="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition group shadow-sm shadow-cyan-500/10">
          <div class="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping"></div>
          <span class="font-bold tracking-wide">${this.currentUser.visitorBadgeId || 'HMM-VIS'}</span>
          <i data-lucide="id-card" class="w-3.5 h-3.5 text-cyan-400"></i>
        </button>
      `;
    } else {
      container.innerHTML = `
        <button onclick="Auth.openAuthModal('login')" class="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition">
          <i data-lucide="ticket" class="w-3.5 h-3.5"></i>
          <span>Visitor Pass</span>
        </button>
      `;
    }
    if (window.lucide) lucide.createIcons();
  },

  openAuthModal(tab = 'login') {
    AudioAmbiance.playSfx('click');
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.classList.remove('hidden');
      this.switchAuthTab(tab);
    }
  },

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('hidden');
  },

  switchAuthTab(tab) {
    const tabLogin = document.getElementById('authTabLogin');
    const tabRegister = document.getElementById('authTabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const title = document.getElementById('authModalTitle');

    if (tab === 'login') {
      tabLogin.className = 'flex-1 py-2 text-xs font-semibold rounded-lg bg-cyan-500/20 text-cyan-300 transition';
      tabRegister.className = 'flex-1 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      title.textContent = 'Visitor Authentication';
    } else {
      tabRegister.className = 'flex-1 py-2 text-xs font-semibold rounded-lg bg-cyan-500/20 text-cyan-300 transition';
      tabLogin.className = 'flex-1 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      title.textContent = 'Mint Holographic Visitor Pass';
    }
  },

  async handleLogin(e) {
    e.preventDefault();
    const identifier = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.userKey, JSON.stringify(data.user));
        this.currentUser = data.user;
        this.closeAuthModal();
        this.renderHeader();
        AudioAmbiance.playSfx('badge');
        App.showToast(`Welcome back, ${data.user.username}!`);
      } else {
        AudioAmbiance.playSfx('error');
        alert(data.error || 'Authentication failed');
      }
    } catch (err) {
      alert('Network error connecting to Museum verification server.');
    }
  },

  async handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.userKey, JSON.stringify(data.user));
        this.currentUser = data.user;
        this.closeAuthModal();
        this.renderHeader();
        AudioAmbiance.playSfx('badge');
        App.showToast(`Pass Minted! Welcome, ${data.user.username}!`);
        this.openVisitorPassModal();
      } else {
        AudioAmbiance.playSfx('error');
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      alert('Network error communicating with museum registry.');
    }
  },

  async generateGuestPass() {
    try {
      AudioAmbiance.playSfx('click');
      const res = await fetch('/api/auth/guest', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.userKey, JSON.stringify(data.user));
        this.currentUser = data.user;
        this.closeAuthModal();
        this.renderHeader();
        AudioAmbiance.playSfx('badge');
        App.showToast('Temporary 24h holographic pass minted!');
        this.openVisitorPassModal();
      }
    } catch (err) {
      alert('Could not issue guest credentials.');
    }
  },

  async openVisitorPassModal() {
    AudioAmbiance.playSfx('click');
    const modal = document.getElementById('visitorPassModal');
    const body = document.getElementById('visitorPassCardBody');
    if (!modal || !body) return;

    modal.classList.remove('hidden');

    // Fetch freshest profile & stats
    const profileData = await this.fetchProfile();
    const u = this.currentUser || {};
    const scores = profileData?.scores || [];
    const visited = u.visitedRooms || [];
    const badges = u.badges || ['First Step: Museum Admission'];

    body.innerHTML = `
      <div class="holographic-pass rounded-2xl p-6 sm:p-8 text-white relative z-10 mb-6">
        <!-- Pass Header -->
        <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <i data-lucide="brain" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="font-display font-bold text-sm tracking-wider text-slate-100">THE HUMAN MIND MUSEUM</div>
              <div class="font-mono text-[10px] text-cyan-300">OFFICIAL ACCREDITED ACCESS PASS</div>
            </div>
          </div>
          <span class="font-mono text-xs px-2.5 py-1 rounded bg-white/10 border border-white/20 text-cyan-300 tracking-wider">
            ${u.visitorBadgeId || 'HMM-VIS-0000'}
          </span>
        </div>

        <!-- Visitor Info Grid -->
        <div class="grid grid-cols-2 gap-4 mb-5">
          <div>
            <span class="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">VISITOR NAME</span>
            <span class="font-display font-bold text-lg text-white">${u.username || 'Explorer'}</span>
          </div>
          <div>
            <span class="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">ACADEMIC RANK</span>
            <span class="font-mono text-xs text-amber-300 font-semibold flex items-center space-x-1 mt-1">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
              <span>${u.visitorLevel || 'Novice Explorer'}</span>
            </span>
          </div>
        </div>

        <!-- Visited Wings Progress -->
        <div class="mb-5 bg-black/30 rounded-xl p-3 border border-white/5">
          <div class="flex justify-between text-xs font-mono mb-1.5">
            <span class="text-slate-300">Wings Explored:</span>
            <span class="text-cyan-400 font-bold">${visited.length} / 5</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500" style="width: ${(visited.length / 5) * 100}%"></div>
          </div>
        </div>

        <!-- Badges Earned -->
        <div class="mb-4">
          <span class="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">NEURAL MEDALS & BADGES</span>
          <div class="flex flex-wrap gap-1.5">
            ${badges.map(b => `
              <span class="px-2.5 py-1 rounded-md bg-purple-500/20 border border-purple-500/40 text-purple-200 text-[11px] font-mono flex items-center space-x-1">
                <i data-lucide="award" class="w-3 h-3 text-purple-400"></i>
                <span>${b}</span>
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Simulated Cryptographic QR Code -->
        <div class="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400">
          <div class="flex items-center space-x-2">
            <div class="w-7 h-7 bg-white/10 rounded flex items-center justify-center text-white">
              <i data-lucide="qr-code" class="w-4 h-4"></i>
            </div>
            <div>
              <span class="block text-cyan-300 font-bold">SYSTEM ARCHITECT: PRACHI</span>
              <span class="text-slate-400">VERIFIED BY DR. SOPHIA VANCE</span>
            </div>
          </div>
          <span class="text-emerald-400 font-bold">SESSION: ACTIVE</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between pt-2">
        <button onclick="Auth.logout()" class="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono transition flex items-center space-x-1.5">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
          <span>Relinquish Pass (Sign Out)</span>
        </button>

        <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition flex items-center space-x-1.5">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i>
          <span>Print Pass</span>
        </button>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  closeVisitorPassModal() {
    const modal = document.getElementById('visitorPassModal');
    if (modal) modal.classList.add('hidden');
  },

  logout() {
    AudioAmbiance.playSfx('click');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser = null;
    this.closeVisitorPassModal();
    this.renderHeader();
    App.showToast('Visitor session ended. Pass archived.');
  }
};

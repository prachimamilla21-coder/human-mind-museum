// Visitor Vault Journal Controller (Universal Hybrid Engine)
const Journal = {
  activeFilter: 'all',
  entries: [],
  storageKey: 'hmm_journal_entries',

  async init() {
    await this.fetchEntries();
  },

  getLocalNotes() {
    const all = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const u = Auth.currentUser;
    if (!u) return [];
    return all.filter(e => e.userId === u.id);
  },

  async fetchEntries() {
    let serverEntries = null;
    try {
      const url = this.activeFilter === 'mine' && Auth.getToken()
        ? '/api/journal/my-notes'
        : '/api/journal/public';

      const headers = Auth.getToken() ? { 'Authorization': `Bearer ${Auth.getToken()}` } : {};
      const res = await fetch(url, { headers });

      if (res.ok) {
        serverEntries = await res.json();
      }
    } catch (e) {
      // Fall through to client storage
    }

    if (serverEntries && serverEntries.length > 0) {
      this.entries = serverEntries;
    } else {
      // Client-side fallback storage
      const defaultEntries = [
        {
          id: "jrn_001",
          username: "Dr. Vance",
          room: "consciousness",
          title: "Reflections on the Thalamic Gate",
          content: "Watching visitors interact with the sensory gating simulation reminded me how fragile our grasp of objective reality is. We inhabit a controlled hallucination crafted by evolution.",
          timestamp: "2026-09-23T08:00:00.000Z"
        },
        {
          id: "jrn_002",
          username: "Prachi (Lead Architect)",
          room: "decisions",
          title: "The Architecture of Human Rationality",
          content: "Constructing the decision chamber highlighted how easily our choices are anchored by subconscious primes. True freedom begins with understanding our cognitive cognitive biases.",
          timestamp: "2026-09-25T14:20:00.000Z"
        }
      ];

      const localAll = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const combined = [...localAll, ...defaultEntries];

      if (this.activeFilter === 'mine') {
        const u = Auth.currentUser;
        this.entries = u ? combined.filter(e => e.userId === u.id || e.username === u.username) : [];
      } else {
        this.entries = combined;
      }
    }

    this.renderEntries();
  },

  setFilter(filter) {
    AudioAmbiance.playSfx('click');
    if (filter === 'mine' && !Auth.isLoggedIn()) {
      Auth.generateGuestPass();
    }

    this.activeFilter = filter;
    document.querySelectorAll('[data-journal-filter]').forEach(btn => {
      if (btn.dataset.journalFilter === filter) {
        btn.className = 'px-4 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold';
      } else {
        btn.className = 'px-4 py-1.5 rounded-lg bg-museum-900 text-slate-400 hover:text-white text-xs font-semibold';
      }
    });

    this.fetchEntries();
  },

  renderEntries() {
    const container = document.getElementById('journalEntriesGrid');
    if (!container) return;

    if (this.entries.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-400 text-sm">
          No reflections found in this archive filter. Be the first to seal an insight!
        </div>
      `;
      return;
    }

    container.innerHTML = this.entries.map(e => `
      <div class="p-6 rounded-2xl border border-slate-800 bg-museum-900/60 hover:bg-museum-900/90 transition flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3 text-[11px] font-mono text-slate-400">
            <span class="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 uppercase">
              Wing: ${e.room}
            </span>
            <span>${new Date(e.timestamp).toLocaleDateString()}</span>
          </div>

          <h4 class="font-display font-bold text-lg text-white mb-2">${e.title}</h4>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">"${e.content}"</p>
        </div>

        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span class="flex items-center space-x-1.5 text-slate-300">
            <i data-lucide="user" class="w-3.5 h-3.5 text-cyan-400"></i>
            <span>${e.username}</span>
          </span>
          <span class="text-emerald-400/80 font-mono">Archived in Vault</span>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  openNewModal(presetRoom) {
    AudioAmbiance.playSfx('click');
    const modal = document.getElementById('newJournalModal');
    if (!modal) return;

    if (presetRoom) {
      const select = document.getElementById('journalRoomSelect');
      if (select) select.value = presetRoom;
    }

    modal.classList.remove('hidden');
  },

  closeNewModal() {
    const modal = document.getElementById('newJournalModal');
    if (modal) modal.classList.add('hidden');
  },

  async handleSubmit(e) {
    e.preventDefault();
    AudioAmbiance.playSfx('click');

    // Auto-create pass if not logged in
    if (!Auth.isLoggedIn()) {
      Auth.generateGuestPass();
    }

    const u = Auth.currentUser || { username: 'Explorer', id: 'usr_guest' };
    const room = document.getElementById('journalRoomSelect').value;
    const title = document.getElementById('journalTitleInput').value.trim();
    const content = document.getElementById('journalContentInput').value.trim();

    const newEntry = {
      id: `jrn_${Date.now()}`,
      userId: u.id,
      username: u.username,
      room,
      title: title || `Reflection in ${room}`,
      content,
      timestamp: new Date().toISOString()
    };

    // Save to local storage
    const localAll = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    localAll.unshift(newEntry);
    localStorage.setItem(this.storageKey, JSON.stringify(localAll));

    // Award badge if first entry
    if (u && u.badges && !u.badges.includes('Introspective Philosopher')) {
      u.badges.push('Introspective Philosopher');
      localStorage.setItem(Auth.userKey, JSON.stringify(u));
      Auth.renderHeader();
      setTimeout(() => App.showToast('🏆 Medal Unlocked: Introspective Philosopher!'), 1200);
    }

    // Try server sync
    const token = Auth.getToken();
    if (token) {
      fetch('/api/journal/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ room, title, content })
      }).catch(() => {});
    }

    AudioAmbiance.playSfx('badge');
    this.closeNewModal();
    document.getElementById('journalTitleInput').value = '';
    document.getElementById('journalContentInput').value = '';
    App.showToast('Reflection sealed in the Subconscious Vault!');
    this.fetchEntries();
  }
};

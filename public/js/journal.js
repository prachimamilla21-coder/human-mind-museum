// Visitor Vault Journal Controller
const Journal = {
  activeFilter: 'all',
  entries: [],

  async init() {
    await this.fetchEntries();
  },

  async fetchEntries() {
    try {
      const url = this.activeFilter === 'mine' && Auth.getToken()
        ? '/api/journal/my-notes'
        : '/api/journal/public';

      const headers = Auth.getToken() ? { 'Authorization': `Bearer ${Auth.getToken()}` } : {};
      const res = await fetch(url, { headers });

      if (res.ok) {
        this.entries = await res.json();
        this.renderEntries();
      }
    } catch (e) {
      console.error('Failed to fetch journal entries:', e);
    }
  },

  setFilter(filter) {
    AudioAmbiance.playSfx('click');
    if (filter === 'mine' && !Auth.isLoggedIn()) {
      Auth.openAuthModal('login');
      App.showToast('Please sign in to view personal notes!');
      return;
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
          <span class="text-emerald-400/80">Archived</span>
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

    const token = Auth.getToken();
    if (!token) {
      this.closeNewModal();
      Auth.openAuthModal('login');
      App.showToast('Please sign in or get a pass to seal reflections!');
      return;
    }

    const room = document.getElementById('journalRoomSelect').value;
    const title = document.getElementById('journalTitleInput').value.trim();
    const content = document.getElementById('journalContentInput').value.trim();

    try {
      const res = await fetch('/api/journal/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ room, title, content })
      });
      const data = await res.json();

      if (res.ok) {
        AudioAmbiance.playSfx('badge');
        this.closeNewModal();
        document.getElementById('journalTitleInput').value = '';
        document.getElementById('journalContentInput').value = '';
        App.showToast('Reflection sealed in the Subconscious Vault!');
        this.fetchEntries();
      } else {
        alert(data.error || 'Failed to archive reflection.');
      }
    } catch (err) {
      alert('Network error connecting to museum journal vault.');
    }
  }
};

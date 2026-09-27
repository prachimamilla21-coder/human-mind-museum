// Master Application Coordinator & Navigation
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

    if (window.lucide) lucide.createIcons();
  },

  toggleMobileMenu() {
    AudioAmbiance.playSfx('click');
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
    AudioAmbiance.playSfx('click');
    Wings.selectWing(wingId);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

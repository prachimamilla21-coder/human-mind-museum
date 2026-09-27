// AI Museum Docent Controller: Dr. Sophia Vance
const AIGuide = {
  isVoiceActive: false,
  messages: [
    {
      sender: "Dr. Sophia Vance",
      role: "assistant",
      content: "Welcome to my Consultation Salon. I am Dr. Sophia Vance, Chief Neuro-Curator. Within these walls, we unravel how 86 billion neurons construct your perception, emotion, and identity. What mystery shall we explore together?"
    }
  ],
  suggestions: [
    "Does Mary learn anything new when she sees color?",
    "Why does memory change every time we recall it?",
    "What is the evolutionary function of fear?",
    "Explain Kahneman's System 1 and System 2."
  ],

  init() {
    this.renderMessages();
    this.renderSuggestions();
  },

  renderMessages() {
    const stream = document.getElementById('aiChatStream');
    if (!stream) return;

    stream.innerHTML = this.messages.map(m => `
      <div class="flex items-start space-x-3 ${m.role === 'user' ? 'justify-end' : ''}">
        ${m.role !== 'user' ? `
          <div class="w-9 h-9 rounded-xl overflow-hidden border border-purple-400/50 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Dr. Vance" class="w-full h-full object-cover">
          </div>
        ` : ''}

        <div class="max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
          m.role === 'user'
            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white chat-bubble-user'
            : 'bg-museum-950 border border-slate-800 text-slate-200 chat-bubble-assistant shadow-lg'
        }">
          ${m.role !== 'user' ? `
            <div class="flex items-center space-x-2 mb-1.5 font-mono text-[10px] text-purple-400">
              <span class="font-bold">DR. SOPHIA VANCE</span>
              <span>&bull;</span>
              <span>CHIEF NEURO-CURATOR</span>
            </div>
          ` : ''}
          <p class="whitespace-pre-line">${m.content}</p>
        </div>

        ${m.role === 'user' ? `
          <div class="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono text-xs flex-shrink-0">
            YOU
          </div>
        ` : ''}
      </div>
    `).join('');

    stream.scrollTop = stream.scrollHeight;
  },

  renderSuggestions() {
    const container = document.getElementById('aiSuggestionsContainer');
    if (!container) return;

    container.innerHTML = this.suggestions.map(s => `
      <button onclick="AIGuide.sendDirectPrompt('${s.replace(/'/g, "\\'")}')" class="whitespace-nowrap px-3 py-1.5 rounded-full bg-museum-950 border border-slate-800 hover:border-purple-500/50 text-slate-400 hover:text-purple-300 text-[11px] transition">
        ${s}
      </button>
    `).join('');
  },

  async handleSubmit(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('aiGuideInput');
    if (!input || !input.value.trim()) return;

    const query = input.value.trim();
    input.value = '';
    await this.sendDirectPrompt(query);
  },

  async sendDirectPrompt(promptText) {
    AudioAmbiance.playSfx('click');

    // Add user message
    this.messages.push({
      sender: "Visitor",
      role: "user",
      content: promptText
    });
    this.renderMessages();

    // Show typing state
    const stream = document.getElementById('aiChatStream');
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'aiTypingIndicator';
    typingIndicator.className = 'flex items-center space-x-2 text-xs font-mono text-purple-400 p-2';
    typingIndicator.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
      <span>Dr. Vance is analyzing neural knowledge base...</span>
    `;
    stream.appendChild(typingIndicator);
    stream.scrollTop = stream.scrollHeight;

    try {
      const res = await fetch('/api/ai-guide/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          currentRoom: Wings.activeWingId,
          userProfile: Auth.currentUser
        })
      });

      const indicator = document.getElementById('aiTypingIndicator');
      if (indicator) indicator.remove();

      if (res.ok) {
        const data = await res.json();
        this.messages.push({
          sender: data.speaker,
          role: "assistant",
          content: data.reply
        });
        if (data.suggestions) {
          this.suggestions = data.suggestions;
          this.renderSuggestions();
        }
        this.renderMessages();

        // Speak aloud if voice toggle active
        if (this.isVoiceActive) {
          this.speak(data.reply);
        }
      } else {
        this.messages.push({
          sender: "Dr. Sophia Vance",
          role: "assistant",
          content: "A neural synapse fluctuation momentarily interrupted my transmission. Please ask again, esteemed visitor."
        });
        this.renderMessages();
      }
    } catch (err) {
      const indicator = document.getElementById('aiTypingIndicator');
      if (indicator) indicator.remove();
      this.messages.push({
        sender: "Dr. Sophia Vance",
        role: "assistant",
        content: "I apologize, my communication interface experienced a disruption. Please ensure you are connected to the museum network."
      });
      this.renderMessages();
    }
  },

  async requestTour(tourId) {
    AudioAmbiance.playSfx('click');
    App.navigateTo('ai-guide');

    const tourPrompts = {
      'tour-speed': "Dr. Vance, please guide me on the 3-Minute Miracle Tour of the Mind.",
      'tour-shadow': "Dr. Vance, please conduct a guided exploration of the Subconscious and Jungian Shadow.",
      'tour-biases': "Dr. Vance, lead me through the Rationality Bootcamp Tour across cognitive biases."
    };

    const prompt = tourPrompts[tourId] || "Dr. Vance, please recommend a tour of the museum.";
    await this.sendDirectPrompt(prompt);
  },

  toggleVoice() {
    this.isVoiceActive = !this.isVoiceActive;
    const btn = document.getElementById('ttsVoiceToggleBtn');
    const icon = document.getElementById('ttsIcon');

    if (this.isVoiceActive) {
      if (btn) btn.className = 'p-2.5 rounded-xl bg-purple-600/20 border border-purple-500 text-purple-300 transition';
      App.showToast('AI Voice Speech Synthesizer: Enabled');
      this.speak("Voice synthesizer engaged. I am ready to converse.");
    } else {
      if (btn) btn.className = 'p-2.5 rounded-xl bg-museum-900 border border-slate-800 text-slate-400 hover:text-purple-400 transition';
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      App.showToast('AI Voice Speech Synthesizer: Disabled');
    }
  },

  speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean text of markdown or URLs
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick a natural English voice if present
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) utterance.voice = naturalVoice;

    window.speechSynthesis.speak(utterance);
  }
};

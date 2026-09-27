// AI Museum Docent Controller: Dr. Sophia Vance (Universal Hybrid Cognitive Engine)
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

  // Client-Side Cognitive Psychology Reasoning Engine
  generateDocentResponse(query) {
    const msg = query.toLowerCase();

    if (msg.includes("consciousness") || msg.includes("perception") || msg.includes("illusion") || msg.includes("qualia") || msg.includes("color")) {
      return `Ah, you are probing consciousness—the supreme mystery of cognitive neuroscience! What fascinates me most is that your brain is encased in total darkness within your skull, yet it fabricates this vibrant, colorful 3D reality. Have you explored the optical illusions in Wing I? They demonstrate that what you perceive is not objective light, but your brain's top-down predictive hypothesis about what caused that light.`;
    }

    if (msg.includes("emotion") || msg.includes("feeling") || msg.includes("fear") || msg.includes("anxiety") || msg.includes("love") || msg.includes("anger")) {
      return `Emotions are ancient navigational heuristics. As Lisa Feldman Barrett proved in her theory of constructed emotion, an emotion is your brain's prediction of what bodily sensations (heart rate, cortisol, breath) mean in a given context. In Wing II, interact with Plutchik's Emotion Wheel: notice how Fear plus Surprise becomes Awe. Try our 4-7-8 Vagus Breathing Pacer right now to physically recalibrate your autonomic nervous system.`;
    }

    if (msg.includes("memory") || msg.includes("forget") || msg.includes("remember") || msg.includes("past") || msg.includes("nostalgia")) {
      return `Memory is one of our most haunting exhibits. Most people believe memories are frozen video files, but neurobiologically, remembering is a reconstructive act. When you recall an event, neurochemical synapses unlock during 'reconsolidation'. If someone suggests a misleading detail, your hippocampus blends it into the story. Visit Wing III to test our False Memory simulator—it will astonish you how easily phantom recollections are created!`;
    }

    if (msg.includes("decision") || msg.includes("bias") || msg.includes("trolley") || msg.includes("rational") || msg.includes("kahneman")) {
      return `Decision-making is the eternal tug-of-war between Daniel Kahneman's System 1 (instinctive, fast, and heavily biased) and System 2 (meticulous, slow, and mentally exhausting). In our Decision Chamber (Wing IV), test your susceptibility to the Sunk Cost Fallacy and Anchoring Bias. For instance, did you know an arbitrary high number can anchor subsequent valuations by up to 50%?`;
    }

    if (msg.includes("identity") || msg.includes("ego") || msg.includes("who am i") || msg.includes("self") || msg.includes("jung") || msg.includes("shadow")) {
      return `Who is the 'You' that is asking this question? Carl Jung posited that we all construct a 'Persona'—the social facade we present to society—while banishing unacceptable impulses into 'The Shadow'. Furthermore, Nobel laureate Roger Sperry's split-brain patients demonstrated that when the corpus callosum is cut, two separate consciousnesses awaken in one head! Visit Wing V to take the Jungian Archetype test and confront your reflection.`;
    }

    if (msg.includes("tour") || msg.includes("guide me") || msg.includes("where should i go") || msg.includes("recommend")) {
      return `I would be thrilled to guide your path! If you want an eye-opening journey, start with Wing I (Perception), move to Wing II (Emotions), and then test your skills in the Cognitive Testing Chamber with the Stroop Effect and Bias Detective games! Which realm of the mind would you like to explore first?`;
    }

    if (msg.includes("game") || msg.includes("test") || msg.includes("challenge") || msg.includes("play")) {
      return `Looking to test your neural circuitry? Head over to the Cognitive Games tab to try:
1. The Stroop Effect Challenge (evaluates frontal lobe inhibitory control)
2. The Working Memory Matrix (tests spatial span and Miller's 7±2 Law)
3. The Cognitive Bias Detective (challenges you to diagnose fallacy traps)
4. Micro-Expression Decoder (measures high-speed facial empathy recognition)
All results are dynamically scored and stamped directly onto your Holographic Visitor Pass!`;
    }

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return `Greetings, esteemed explorer! I am Dr. Sophia Vance. How can I illuminate your journey through The Human Mind Museum today? You can ask me to explain any psychological experiment, request a guided tour, or ask about your own cognitive patterns.`;
    }

    return `That touches on a profound question in human psychology. In our museum, we seek to understand how the biological machinery of 86 billion neurons generates subjective meaning, purposeful action, and social bonds. As you explore the 5 wings, remember: the mind is both the observer and the observed. Is there a specific exhibit, cognitive bias, or paradox you'd like to explore in depth?`;
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
      <span>Dr. Vance is consulting neural archives...</span>
    `;
    stream.appendChild(typingIndicator);
    stream.scrollTop = stream.scrollHeight;

    let replyText = null;

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

      if (res.ok) {
        const data = await res.json();
        replyText = data.reply;
        if (data.suggestions) this.suggestions = data.suggestions;
      }
    } catch (err) {
      // Fall through to client engine
    }

    // If server didn't answer (e.g. on GitHub Pages), use client-side cognitive engine
    if (!replyText) {
      await new Promise(r => setTimeout(r, 400)); // natural typing delay
      replyText = this.generateDocentResponse(promptText);
      this.suggestions = [
        "Can we actually trust our own memories?",
        "Why does my brain fall for optical illusions?",
        "How does the Stroop Effect test cognitive control?",
        "Give me the 3-Minute Miracle Tour."
      ].sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    const indicator = document.getElementById('aiTypingIndicator');
    if (indicator) indicator.remove();

    this.messages.push({
      sender: "Dr. Sophia Vance",
      role: "assistant",
      content: replyText
    });
    this.renderSuggestions();
    this.renderMessages();

    // Speak aloud if voice toggle active
    if (this.isVoiceActive) {
      this.speak(replyText);
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

    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) utterance.voice = naturalVoice;

    window.speechSynthesis.speak(utterance);
  }
};

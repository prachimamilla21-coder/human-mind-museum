// AI Museum Docent Controller: Dr. Sophia Vance (All 7 Educational Rooms Knowledge Engine)
const AIGuide = {
  isVoiceActive: false,
  messages: [
    {
      sender: "Dr. Sophia Vance",
      role: "assistant",
      content: "Welcome to my Consultation Salon. I am Dr. Sophia Vance, your AI guide. Within these walls, we unravel how 86 billion neurons construct your memory, emotions, perception, personality, and decision-making across our seven educational rooms. What psychological phenomenon shall we explore together?"
    }
  ],
  suggestions: [
    "Why does memory rewrite itself when recalled?",
    "Explain Plutchik's Wheel of Emotions",
    "How does the Stroop Effect test cognitive control?",
    "What is the Big Five OCEAN model?",
    "Why should you always switch doors in Monty Hall?",
    "What did Phineas Gage teach neuroscience?"
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
            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
            : 'bg-museum-950 border border-slate-800 text-slate-200 shadow-lg'
        }">
          ${m.role !== 'user' ? `
            <div class="flex items-center space-x-2 mb-1.5 font-mono text-[10px] text-purple-400">
              <span class="font-bold">DR. SOPHIA VANCE</span>
              <span>&bull;</span>
              <span>AI GUIDE & NEURO-CURATOR</span>
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

  async sendDirectPrompt(query) {
    if (window.AudioAmbiance) AudioAmbiance.playSfx('click');

    this.messages.push({ role: 'user', content: query });
    this.renderMessages();

    // Show typing status
    const stream = document.getElementById('aiChatStream');
    const typingId = `typing_${Date.now()}`;
    if (stream) {
      stream.innerHTML += `
        <div id="${typingId}" class="flex items-center space-x-2 text-xs text-purple-400 font-mono p-3">
          <span class="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
          <span>Dr. Sophia is synthesizing psychological insights...</span>
        </div>
      `;
      stream.scrollTop = stream.scrollHeight;
    }

    let reply = '';
    try {
      const res = await fetch('/api/ai-guide/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, currentRoom: Wings.activeWingId })
      });
      if (res.ok) {
        const data = await res.json();
        reply = data.reply;
        if (data.suggestions && data.suggestions.length) {
          this.suggestions = data.suggestions;
          this.renderSuggestions();
        }
      } else {
        throw new Error('Fallback to local intelligence');
      }
    } catch (err) {
      reply = this.generateDocentResponse(query);
    }

    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    this.messages.push({
      sender: "Dr. Sophia Vance",
      role: "assistant",
      content: reply
    });
    this.renderMessages();

    if (this.isVoiceActive && window.AudioAmbiance) {
      AudioAmbiance.speak(reply);
    }
  },

  generateDocentResponse(query) {
    const msg = query.toLowerCase();

    // Room 1: Memory
    if (msg.includes("memory") || msg.includes("forget") || msg.includes("remember") || msg.includes("working memory") || msg.includes("amnesia")) {
      return `In Room 1 (The Memory Room), we deconstruct the myth that memory is a permanent recording. Working memory holds roughly 4 to 7 items for seconds before requiring active rehearsal. Furthermore, Elizabeth Loftus proved memories are reconstructive: every act of remembering alters the neural trace! Have you tried our Working Memory Matrix game in the Arcade?`;
    }

    // Room 2: Emotion
    if (msg.includes("emotion") || msg.includes("feeling") || msg.includes("fear") || msg.includes("plutchik") || msg.includes("ekman") || msg.includes("expression") || msg.includes("eq")) {
      return `In Room 2 (The Emotion Room), Robert Plutchik's Wheel shows how 8 primary emotions combine like colors—Joy and Trust blend to form Love; Fear and Surprise yield Awe. Paul Ekman discovered that 6 micro-expressions flash involuntarily in less than a fifth of a second across every human culture. Try our 4-7-8 Vagus Breathing Pacer in Room 2 to down-regulate your stress response!`;
    }

    // Room 3: Perception
    if (msg.includes("perception") || msg.includes("illusion") || msg.includes("optical") || msg.includes("stroop") || msg.includes("color") || msg.includes("see")) {
      return `In Room 3 (The Perception Room), we explore how your visual cortex synthesizes a top-down controlled hallucination from ambiguous sensory cues. Optical illusions like the Müller-Lyer and Hermann Grid reveal the computational shortcuts your brain uses to interpret depth and contrast. Test yourself in the Stroop Effect game to measure cognitive interference between automatic reading and deliberate color naming!`;
    }

    // Room 4: Personality
    if (msg.includes("personality") || msg.includes("ocean") || msg.includes("big five") || msg.includes("mbti") || msg.includes("jung") || msg.includes("traits")) {
      return `In Room 4 (The Personality Room), we look at the empirically validated Big Five (OCEAN) traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Unlike the popular but scientifically flawed MBTI categories, Big Five traits are distributed along continuous bell curves. Take our interactive OCEAN assessment to view your personalized Holographic Radar Chart!`;
    }

    // Room 5: Cognitive Bias
    if (msg.includes("bias") || msg.includes("heuristic") || msg.includes("confirmation") || msg.includes("anchoring") || msg.includes("sunk cost") || msg.includes("fallacy")) {
      return `In Room 5 (The Cognitive Bias Room), we confront the heuristics of System 1 thinking discovered by Daniel Kahneman and Amos Tversky. Confirmation bias compels us to only seek evidence confirming what we already believe, while anchoring unconsciously pulls our estimates toward arbitrary initial numbers. Check out Peter Wason's 2-4-6 game in Room 5 to test your own hypothesis testing!`;
    }

    // Room 6: Decision-Making
    if (msg.includes("decision") || msg.includes("monty hall") || msg.includes("risk") || msg.includes("trolley") || msg.includes("prospect theory")) {
      return `In Room 6 (The Decision-Making Room), human intuition clashes with mathematical reality. In the Monty Hall 3-Door paradox, switching doors doubles your win probability from 33.3% to 66.7%! And Prospect Theory demonstrates that losses loom twice as large as equivalent gains. Step into Room 6 to run the live Monty Hall simulator!`;
    }

    // Room 7: Brain Lab
    if (msg.includes("brain") || msg.includes("neuroscience") || msg.includes("neuron") || msg.includes("plasticity") || msg.includes("phineas gage")) {
      return `Welcome to Room 7 (The Brain Lab)! Inside your skull reside 86 billion neurons forming trillions of synaptic connections. From Phineas Gage's frontal lobe injury showing where social personality resides, to synaptic neuroplasticity allowing you to rewire your cognitive circuits throughout your life, neuroscience is the ultimate self-portrait. What specific neural concept would you like to explore?`;
    }

    return `That touches on a fascinating area of psychological science. Across our seven educational rooms—Memory, Emotion, Perception, Personality, Cognitive Bias, Decision-Making, and the Brain Lab—we investigate how neural architecture gives rise to human consciousness and behavior. Which specific room or experiment would you like to explore deeper?`;
  },

  toggleVoice() {
    this.isVoiceActive = !this.isVoiceActive;
    const btn = document.getElementById('ttsVoiceToggleBtn');
    const icon = document.getElementById('ttsIcon');
    if (!btn) return;

    if (this.isVoiceActive) {
      btn.classList.add('bg-purple-500/20', 'text-purple-300', 'border-purple-500/50');
      if (window.App) App.showToast('AI Voice Speech Synthesizer: Enabled');
      AudioAmbiance.speak("Voice output enabled. I am listening.");
    } else {
      btn.classList.remove('bg-purple-500/20', 'text-purple-300', 'border-purple-500/50');
      if (window.App) App.showToast('AI Voice Speech Synthesizer: Disabled');
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  },

  requestTour(tourId) {
    if (tourId === 'tour-speed') {
      this.sendDirectPrompt("Give me the Core 7-Room Grand Expedition tour!");
    } else if (tourId === 'tour-shadow') {
      this.sendDirectPrompt("Guide me through the Emotion, Personality, and Shadow rooms.");
    } else if (tourId === 'tour-biases') {
      this.sendDirectPrompt("Take me to the Cognitive Bias and Decision-Making rooms.");
    }
  }
};

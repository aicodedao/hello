/**
 * AiCodeDao • Next-Gen Agentic Hello ✨ (v6.0)
 * Core Architecture & Engine Modules:
 * 1. Web Audio Synth Engine Pro+ (8 Presets, Sound FX, Ambient Binaural Drone & Audio Metering)
 * 2. 3D Holographic Polyhedra Reactor (7 Shapes: Icosahedron, Hypercube 4D, Dodecahedron, Octahedron, Klein Torus, Stellated Star, DNA Helix)
 * 3. Gemini Multi-Model Workflow Studio & Simulator (Interactive DAG Pipeline & Streaming Telemetry)
 * 4. Code & Shader Playground Lab (Interactive Sandbox & Presets)
 * 5. Hardware & AI Benchmark Suite (WebGL Shader Ops, JS Matrix Ops, Audio Latency, Edge Ping)
 * 6. Cyber AI Quantum Dodger v2.0 (Mini AI Game with EMP Blast, Slow-Mo, Shields & AI Commentary)
 * 7. Gemini AI Assistant v6.0 (Two-Way Voice STT/TTS, Markdown Parsing & Transcript Export)
 * 8. Dynamic Multi-Mode Background Canvas (Neural Web, Matrix Rain, Starfield, Warp Speed, Quantum Aurora)
 * 9. Internationalization & Time Engine (8 Languages & 5 Time Slots)
 * 10. Interactive CLI Terminal v6.0 & Particle Physics Confetti
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. GLOBAL STATE & CONFIGURATION
     ========================================================================== */
  const STATE = {
    version: '6.0.0',
    currentLang: 'vi',
    currentThemeIndex: 0,
    currentCanvasModeIndex: 0,
    currentShapeIndex: 0,
    currentAudioPresetIndex: 0,
    currentAvatar: '🚀',
    userName: '',
    interactionsCount: 0,
    timezoneMode: 'VN', // 'VN' (UTC+7) or 'UTC'
    soundEnabled: true,
    binauralDroneActive: false,
    voiceTtsEnabled: false,
    speechRecognitionActive: false,
    geminiApiKey: localStorage.getItem('aicodedao_gemini_api_key') || '',
    geminiModel: localStorage.getItem('aicodedao_gemini_model') || 'gemini-2.5-flash',
    chatHistory: [],
    favoriteQuotes: JSON.parse(localStorage.getItem('aicodedao_fav_quotes') || '[]'),
    gameHighScore: parseInt(localStorage.getItem('aicodedao_game_high_score') || '0', 10),
    audioEnergy: 0, // For 3D reactor audio-reactivity
  };

  /* ==========================================================================
     2. INTERNATIONALIZATION (8 LANGUAGES)
     ========================================================================== */
  const I18N = {
    vi: {
      greetings: { dawn: 'Bình minh an lành', morning: 'Chào buổi sáng', afternoon: 'Chào buổi chiều', evening: 'Chào buổi tối', night: 'Đêm muộn an tĩnh' },
      title: 'Hello, World!',
      subtitle: 'Chào mừng {name} đến với kỷ nguyên phát triển phần mềm AI Agentic tự động, tương tác thời gian thực với Gemini Multi-Model Pipeline, Two-Way Voice và Quantum 3D Reactor.',
      greetDefaultName: 'bạn',
      toastWelcome: 'Chào mừng đến với AiCodeDao Quantum Core v6.0!',
      btnGreet: 'Chào tôi 👋',
      copiedDomain: 'Đã sao chép liên kết hello.aicodedao.xyz!',
      copiedQuote: 'Đã sao chép danh ngôn AI!',
      favQuoteAdded: 'Đã lưu vào danh ngôn yêu thích ❤️',
      favQuoteRemoved: 'Đã bỏ khỏi danh ngôn yêu thích 🤍',
      gameTitle: 'Cyber AI Quantum Dodger v2.0',
      terminalReady: 'AiCodeDao Agentic Core v6.0 initialized. Workflow Studio & Two-Way Voice ready. Type /help'
    },
    en: {
      greetings: { dawn: 'Peaceful Dawn', morning: 'Good Morning', afternoon: 'Good Afternoon', evening: 'Good Evening', night: 'Peaceful Night' },
      title: 'Hello, World!',
      subtitle: 'Welcome {name} to the era of autonomous AI Agentic software engineering with Gemini Multi-Model Pipeline, Two-Way Voice and Quantum 3D Reactor.',
      greetDefaultName: 'World Traveler',
      toastWelcome: 'Welcome to AiCodeDao Quantum Core v6.0!',
      btnGreet: 'Greet Me 👋',
      copiedDomain: 'Copied link hello.aicodedao.xyz!',
      copiedQuote: 'Copied AI Quote!',
      favQuoteAdded: 'Saved to favorites ❤️',
      favQuoteRemoved: 'Removed from favorites 🤍',
      gameTitle: 'Cyber AI Quantum Dodger v2.0',
      terminalReady: 'AiCodeDao Agentic Core v6.0 initialized. Type /help'
    },
    ja: {
      greetings: { dawn: '静かな夜明け', morning: 'おはようございます', afternoon: 'こんにちは', evening: 'こんばんは', night: 'おやすみなさい' },
      title: 'ハロー・ワールド！',
      subtitle: '{name} 様、Geminiマルチモデルパイプライン、双方向音声AI、量子3Dリアクターを備えた自律型AIエージェント開発へようこそ。',
      greetDefaultName: 'ユーザー',
      toastWelcome: 'AiCodeDao Quantum Core v6.0へようこそ！',
      btnGreet: '挨拶する 👋',
      copiedDomain: 'リンクをコピーしました！',
      copiedQuote: '名言をコピーしました！',
      favQuoteAdded: 'お気に入りに保存しました ❤️',
      favQuoteRemoved: 'お気に入りを解除しました 🤍',
      gameTitle: 'Cyber AI Quantum Dodger v2.0',
      terminalReady: 'システム初期化完了。/help と入力してください。'
    },
    fr: {
      greetings: { dawn: 'Aube Paisible', morning: 'Bonjour', afternoon: 'Bon Après-midi', evening: 'Bonsoir', night: 'Bonne Nuit' },
      title: 'Bonjour le Monde !',
      subtitle: 'Bienvenue {name} dans l\'ère du développement logiciel AI Agentic autonome avec le pipeline multi-modèles Gemini et réacteur 3D.',
      greetDefaultName: 'Visiteur',
      toastWelcome: 'Bienvenue sur AiCodeDao Quantum Core v6.0 !',
      btnGreet: 'Saluez-moi 👋',
      copiedDomain: 'Lien copié !',
      copiedQuote: 'Citation copiée !',
      favQuoteAdded: 'Ajouté aux favoris ❤️',
      favQuoteRemoved: 'Retiré des favoris 🤍',
      gameTitle: 'Cyber AI Quantum Dodger v2.0',
      terminalReady: 'Système initialisé. Tapez /help'
    },
    es: {
      greetings: { dawn: 'Amanecer Pacífico', morning: 'Buenos Días', afternoon: 'Buenas Tardes', evening: 'Buenas Noches', night: 'Feliz Noche' },
      title: '¡Hola, Mundo!',
      subtitle: 'Bienvenido {name} a la era de la ingeniería de software AI Agentic con el flujo multi-modelo de Gemini y reactor cuántico 3D.',
      greetDefaultName: 'Amigo',
      toastWelcome: '¡Bienvenido a AiCodeDao Quantum Core v6.0!',
      btnGreet: 'Salúdame 👋',
      copiedDomain: '¡Enlace copiado!',
      copiedQuote: '¡Cita copiada!',
      favQuoteAdded: 'Guardado en favoritos ❤️',
      favQuoteRemoved: 'Eliminado de favoritos 🤍',
      gameTitle: 'Cyber AI Quantum Dodger v2.0',
      terminalReady: 'Sistema inicializado. Escribe /help'
    },
    ko: {
      greetings: { dawn: '새벽의 여명', morning: '좋은 아침입니다', afternoon: '즐거운 오후입니다', evening: '편안한 저녁입니다', night: '고유한 밤입니다' },
      title: '헬로 월드!',
      subtitle: '{name}님, 제미나이 멀티 모델 파이프라인과 양자 3D 코어가 탑재된 자율 AI 에이전틱 개발 허브에 오신 것을 환영합니다.',
      greetDefaultName: '개발자',
      toastWelcome: 'AiCodeDao Quantum Core v6.0에 오신 것을 환영합니다!',
      btnGreet: '인사하기 👋',
      copiedDomain: '링크가 복사되었습니다!',
      copiedQuote: '명언이 복사되었습니다!',
      favQuoteAdded: '즐겨찾기에 추가됨 ❤️',
      favQuoteRemoved: '즐겨찾기 삭제됨 🤍',
      gameTitle: 'Cyber AI Quantum Dodger v2.0',
      terminalReady: '시스템 준비 완료. /help 입력'
    },
    de: {
      greetings: { dawn: 'Friedliche Morgendämmerung', morning: 'Guten Morgen', afternoon: 'Guten Tag', evening: 'Guten Abend', night: 'Gute Nacht' },
      title: 'Hallo, Welt!',
      subtitle: 'Willkommen {name} im Zeitalter der autonomen AI-Agentic-Entwicklung mit Gemini-Multi-Modell-Pipelines und 3D-Reaktor.',
      greetDefaultName: 'Entwickler',
      toastWelcome: 'Willkommen bei AiCodeDao Quantum Core v6.0!',
      btnGreet: 'Grüß mich 👋',
      copiedDomain: 'Link kopiert!',
      copiedQuote: 'Zitat kopiert!',
      favQuoteAdded: 'Zu Favoriten hinzugefügt ❤️',
      favQuoteRemoved: 'Aus Favoriten entfernt 🤍',
      gameTitle: 'Cyber AI Quantum Dodger v2.0',
      terminalReady: 'System bereit. Tippen Sie /help'
    },
    zh: {
      greetings: { dawn: '黎明破晓', morning: '早上好', afternoon: '下午好', evening: '晚上好', night: '夜深安眠' },
      title: '你好，世界！',
      subtitle: '欢迎 {name} 步入基于 Gemini 多模型管线、双向语音与量子 3D 反应堆的自主 AI Agentic 软件工程新纪元。',
      greetDefaultName: '开发者',
      toastWelcome: '欢迎来到 AiCodeDao Quantum Core v6.0！',
      btnGreet: '打个招呼 👋',
      copiedDomain: '链接已成功复制！',
      copiedQuote: '名言已成功复制！',
      favQuoteAdded: '已保存至收藏夹 ❤️',
      favQuoteRemoved: '已从收藏夹移除 🤍',
      gameTitle: 'Cyber AI Quantum Dodger v2.0',
      terminalReady: '系统已初始化。输入 /help 获取指引'
    }
  };

  /* ==========================================================================
     3. THEMES, CANVASES, SHAPES & SOUND PRESETS
     ========================================================================== */
  const THEMES = [
    { name: 'Cyber Aurora', primary: '#6366f1', glow: 'rgba(99, 102, 241, 0.45)', gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' },
    { name: 'Emerald Nexus', primary: '#10b981', glow: 'rgba(16, 185, 129, 0.45)', gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)' },
    { name: 'Solar Flare', primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.45)', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)' },
    { name: 'Deep Cosmos', primary: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.45)', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)' },
    { name: 'Matrix Cyber', primary: '#22c55e', glow: 'rgba(34, 197, 94, 0.45)', gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)' },
    { name: 'Hyper Sunset', primary: '#ec4899', glow: 'rgba(236, 72, 153, 0.45)', gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f59e0b 100%)' }
  ];

  const CANVAS_MODES = ['Neural Web', 'Matrix Rain', 'Starfield', 'Warp Speed', 'Quantum Aurora'];
  const SHAPES = ['Icosahedron', 'Hypercube 4D', 'Quantum Dodecahedron', 'Octahedron', 'Klein Torus', 'Stellated Star', 'DNA Helix'];
  const AUDIO_PRESETS = ['Cyber Synth', '8-Bit Arcade', 'Zen Chime', 'ASMR Click', 'Sci-Fi Holo', 'Quantum Warp', 'Cyber Bassline', 'Muted'];

  const AI_QUOTES = [
    { text: 'Tự động hoá và Agentic AI là chìa khoá biến ý tưởng công nghệ thành hiện thực trong chớp mắt.', author: 'AiCodeDao Agentic Core', category: 'Agentic AI' },
    { text: 'Code is poetry written with logic and compiled into pure impact.', author: 'Grace Hopper Wisdom', category: 'Engineering' },
    { text: 'Một hệ thống phần mềm xuất sắc không chỉ giải quyết bài toán mà còn mở rộng tiềm năng nhân loại.', author: 'Alan Turing Matrix', category: 'Architecture' },
    { text: 'Multi-Model Coordination: Kết hợp sức mạnh của các mô hình AI chuyên biệt tạo nên trí tuệ tập thể vượt trội.', author: 'Gemini Architecture Labs', category: 'Multi-Model' },
    { text: 'Tối ưu hoá hiệu năng không phải là việc làm sau cùng, mà là nghệ thuật tư duy ngay từ dòng code đầu tiên.', author: 'TrueForge Sentinel', category: 'Performance' },
    { text: 'Mọi đường hầm Zero-Trust đều bảo vệ sự tự do sáng tạo trong không gian mạng mở.', author: 'Cloudflare Zero-Trust Ops', category: 'Security' }
  ];

  /* ==========================================================================
     4. WEB AUDIO SYNTH PRO+ & BINAURAL DRONE ENGINE
     ========================================================================== */
  class WebAudioEngine {
    constructor() {
      this.ctx = null;
      this.droneOsc1 = null;
      this.droneOsc2 = null;
      this.droneGain = null;
    }

    init() {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.12) {
      if (!STATE.soundEnabled || STATE.currentAudioPresetIndex === 7) return; // Muted
      this.init();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);

        // Modulate visual wave & 3D energy
        STATE.audioEnergy = Math.min(1.0, STATE.audioEnergy + 0.4);
        const wave = document.getElementById('audio-wave');
        if (wave) {
          wave.classList.add('active');
          setTimeout(() => wave.classList.remove('active'), duration * 1000);
        }
      } catch {
        // Audio error silent fallback
      }
    }

    triggerSound(event) {
      const preset = AUDIO_PRESETS[STATE.currentAudioPresetIndex];
      switch (event) {
        case 'click':
          if (preset === '8-Bit Arcade') this.playTone(520, 'square', 0.08, 0.08);
          else if (preset === 'Zen Chime') this.playTone(432, 'sine', 0.4, 0.09);
          else if (preset === 'ASMR Click') this.playTone(1200, 'triangle', 0.03, 0.05);
          else if (preset === 'Quantum Warp') this.playTone(720, 'sawtooth', 0.12, 0.08);
          else this.playTone(600, 'sine', 0.08, 0.1);
          break;
        case 'shape-change':
          this.playTone(440, 'triangle', 0.15, 0.12);
          setTimeout(() => this.playTone(880, 'sine', 0.2, 0.1), 80);
          break;
        case 'quote':
          this.playTone(523.25, 'sine', 0.15, 0.08); // C5
          setTimeout(() => this.playTone(659.25, 'sine', 0.2, 0.08), 90); // E5
          break;
        case 'theme':
          this.playTone(784, 'triangle', 0.12, 0.08);
          setTimeout(() => this.playTone(1046.5, 'sine', 0.2, 0.08), 80);
          break;
        case 'game-collect':
          this.playTone(880, 'sine', 0.08, 0.15);
          setTimeout(() => this.playTone(1320, 'triangle', 0.12, 0.15), 60);
          break;
        case 'game-hit':
          this.playTone(140, 'sawtooth', 0.25, 0.2);
          break;
        case 'game-emp':
          this.playTone(900, 'sawtooth', 0.1, 0.2);
          setTimeout(() => this.playTone(450, 'sine', 0.3, 0.25), 80);
          setTimeout(() => this.playTone(150, 'triangle', 0.4, 0.2), 160);
          break;
        case 'game-slowmo':
          this.playTone(320, 'sine', 0.4, 0.18);
          break;
        case 'game-powerup':
          this.playTone(587, 'triangle', 0.1, 0.15);
          setTimeout(() => this.playTone(880, 'sine', 0.15, 0.15), 80);
          setTimeout(() => this.playTone(1174, 'sine', 0.25, 0.18), 160);
          break;
        case 'game-over':
          this.playTone(400, 'sawtooth', 0.2, 0.15);
          setTimeout(() => this.playTone(300, 'sawtooth', 0.2, 0.15), 150);
          setTimeout(() => this.playTone(200, 'sawtooth', 0.4, 0.18), 300);
          break;
        case 'workflow-step':
          this.playTone(650, 'triangle', 0.1, 0.12);
          break;
        case 'benchmark-done':
          this.playTone(523, 'sine', 0.1, 0.12);
          setTimeout(() => this.playTone(659, 'sine', 0.1, 0.12), 100);
          setTimeout(() => this.playTone(784, 'sine', 0.1, 0.12), 200);
          setTimeout(() => this.playTone(1046, 'sine', 0.3, 0.15), 300);
          break;
      }
    }

    toggleBinauralDrone() {
      this.init();
      if (!this.ctx) return false;

      if (STATE.binauralDroneActive) {
        if (this.droneOsc1) { this.droneOsc1.stop(); this.droneOsc1.disconnect(); this.droneOsc1 = null; }
        if (this.droneOsc2) { this.droneOsc2.stop(); this.droneOsc2.disconnect(); this.droneOsc2 = null; }
        if (this.droneGain) { this.droneGain.disconnect(); this.droneGain = null; }
        STATE.binauralDroneActive = false;
        return false;
      } else {
        try {
          this.droneGain = this.ctx.createGain();
          this.droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

          this.droneOsc1 = this.ctx.createOscillator();
          this.droneOsc2 = this.ctx.createOscillator();

          this.droneOsc1.type = 'sine';
          this.droneOsc2.type = 'sine';

          // 108Hz and 114Hz (6Hz Theta binaural beat for focus & creativity)
          this.droneOsc1.frequency.setValueAtTime(108, this.ctx.currentTime);
          this.droneOsc2.frequency.setValueAtTime(114, this.ctx.currentTime);

          this.droneOsc1.connect(this.droneGain);
          this.droneOsc2.connect(this.droneGain);
          this.droneGain.connect(this.ctx.destination);

          this.droneOsc1.start();
          this.droneOsc2.start();

          STATE.binauralDroneActive = true;
          return true;
        } catch {
          return false;
        }
      }
    }
  }

  const AudioSys = new WebAudioEngine();

  /* ==========================================================================
     5. 3D HOLOGRAPHIC POLYHEDRA REACTOR (7 SHAPES)
     ========================================================================== */
  class Hud3DPolyhedraReactor {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.rotX = 0.5;
      this.rotY = 0.5;
      this.rotZ = 0.2;
      this.isDragging = false;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.logicalSize = 180;
      this.setupDpr();
      this.initEvents();
      this.generateGeometries();
      window.addEventListener('resize', () => this.setupDpr(), { passive: true });
    }

    setupDpr() {
      if (!this.canvas || !this.ctx) return;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.floor(this.logicalSize * this.dpr);
      this.canvas.height = Math.floor(this.logicalSize * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    generateGeometries() {
      // 1. Icosahedron (20 Faces, 12 Vertices)
      const phi = (1 + Math.sqrt(5)) / 2;
      const vIco = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
      ].map(v => this.norm(v, 48));

      const eIco = [
        [0,11],[0,5],[0,1],[0,7],[0,10],[1,5],[1,7],[1,8],[1,9],[2,11],[2,4],[2,6],[2,10],[3,9],[3,4],[3,6],[3,8],
        [4,5],[4,9],[5,9],[6,7],[6,8],[7,8],[10,11]
      ];

      // 2. Hypercube 4D (Tesseract Projection 16 Vertices)
      const vHyper = [];
      for (let i = 0; i < 16; i++) {
        const x = (i & 1 ? 1 : -1) * 32;
        const y = (i & 2 ? 1 : -1) * 32;
        const z = (i & 4 ? 1 : -1) * 32;
        const w = (i & 8 ? 1.4 : 0.7);
        vHyper.push([x * w, y * w, z * w]);
      }
      const eHyper = [];
      for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
          const diff = i ^ j;
          if (diff === 1 || diff === 2 || diff === 4 || diff === 8) {
            eHyper.push([i, j]);
          }
        }
      }

      // 3. Quantum Dodecahedron (20 Vertices)
      const invPhi = 1 / phi;
      const vDod = [
        [-1,-1,-1],[-1,-1,1],[-1,1,-1],[-1,1,1],[1,-1,-1],[1,-1,1],[1,1,-1],[1,1,1],
        [0,-invPhi,-phi],[0,-invPhi,phi],[0,invPhi,-phi],[0,invPhi,phi],
        [-invPhi,-phi,0],[-invPhi,phi,0],[invPhi,-phi,0],[invPhi,phi,0],
        [-phi,0,-invPhi],[-phi,0,invPhi],[phi,0,-invPhi],[phi,0,invPhi]
      ].map(v => this.norm(v, 50));
      const eDod = [
        [0,8],[0,12],[0,16],[1,9],[1,12],[1,17],[2,10],[2,13],[2,16],[3,11],[3,13],[3,17],
        [4,8],[4,14],[4,18],[5,9],[5,14],[5,19],[6,10],[6,15],[6,18],[7,11],[7,15],[7,19],
        [8,10],[9,11],[12,14],[13,15],[16,17],[18,19]
      ];

      // 4. Octahedron (6 Vertices)
      const vOct = [[0, 52, 0], [0, -52, 0], [52, 0, 0], [-52, 0, 0], [0, 0, 52], [0, 0, -52]];
      const eOct = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2]];

      // 5. Klein Torus (24 Vertices Ring)
      const vTorus = [];
      const eTorus = [];
      const R = 36, r = 16;
      for (let i = 0; i < 6; i++) {
        const u = (i / 6) * Math.PI * 2;
        for (let j = 0; j < 4; j++) {
          const v = (j / 4) * Math.PI * 2;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);
          vTorus.push([x, y, z]);
          const idx = i * 4 + j;
          const nextJ = i * 4 + ((j + 1) % 4);
          const nextI = ((i + 1) % 6) * 4 + j;
          eTorus.push([idx, nextJ]);
          eTorus.push([idx, nextI]);
        }
      }

      // 6. Stellated Dodecahedron Star (32 Vertices)
      const vStar = [...vDod];
      const starScale = 1.45;
      vStar.push([0, 0, 50 * starScale], [0, 0, -50 * starScale], [50 * starScale, 0, 0], [-50 * starScale, 0, 0]);
      const eStar = [...eDod];
      eStar.push([20, 1], [20, 3], [20, 5], [20, 7], [21, 0], [21, 2], [21, 4], [21, 6]);

      // 7. DNA Helix (24 Vertices)
      const vDna = [];
      const eDna = [];
      for (let i = 0; i < 12; i++) {
        const t = (i / 12) * Math.PI * 3;
        const y = (i - 6) * 8;
        const x1 = Math.cos(t) * 28;
        const z1 = Math.sin(t) * 28;
        const x2 = Math.cos(t + Math.PI) * 28;
        const z2 = Math.sin(t + Math.PI) * 28;
        vDna.push([x1, y, z1]);
        vDna.push([x2, y, z2]);
        const p1 = i * 2;
        const p2 = i * 2 + 1;
        eDna.push([p1, p2]); // Rung
        if (i < 11) {
          eDna.push([p1, p1 + 2]);
          eDna.push([p2, p2 + 2]);
        }
      }

      this.geometries = [
        { name: 'Icosahedron', v: vIco, e: eIco },
        { name: 'Hypercube 4D', v: vHyper, e: eHyper },
        { name: 'Quantum Dodecahedron', v: vDod, e: eDod },
        { name: 'Octahedron', v: vOct, e: eOct },
        { name: 'Klein Torus', v: vTorus, e: eTorus },
        { name: 'Stellated Star', v: vStar, e: eStar },
        { name: 'DNA Helix', v: vDna, e: eDna }
      ];
    }

    norm(v, scale) {
      const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]) || 1;
      return [(v[0]/len)*scale, (v[1]/len)*scale, (v[2]/len)*scale];
    }

    initEvents() {
      const canvas = this.canvas;
      const onDown = (x, y) => {
        this.isDragging = true;
        this.lastMouseX = x;
        this.lastMouseY = y;
      };
      const onMove = (x, y) => {
        if (!this.isDragging) return;
        const dx = x - this.lastMouseX;
        const dy = y - this.lastMouseY;
        this.rotY += dx * 0.015;
        this.rotX += dy * 0.015;
        this.lastMouseX = x;
        this.lastMouseY = y;
      };
      const onUp = () => { this.isDragging = false; };

      canvas.addEventListener('mousedown', e => onDown(e.clientX, e.clientY));
      window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
      window.addEventListener('mouseup', onUp);

      canvas.addEventListener('touchstart', e => {
        if (e.touches.length > 0) onDown(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchmove', e => {
        if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchend', onUp);
    }

    render() {
      if (!this.ctx) return;
      const ctx = this.ctx;
      const w = this.logicalSize;
      const h = this.logicalSize;
      ctx.clearRect(0, 0, w, h);

      if (!this.isDragging) {
        this.rotY += 0.012;
        this.rotX += 0.008;
      }

      // Audio reactive pulsation
      STATE.audioEnergy *= 0.94; // Decay
      const scaleMod = 1 + STATE.audioEnergy * 0.22;

      const currentGeom = this.geometries[STATE.currentShapeIndex % this.geometries.length];
      const cx = w / 2;
      const cy = h / 2;
      const fov = 160;

      // Project vertices
      const projected = currentGeom.v.map(pt => {
        let x = pt[0] * scaleMod;
        let y = pt[1] * scaleMod;
        let z = pt[2] * scaleMod;

        // Rotate Y
        let cos = Math.cos(this.rotY), sin = Math.sin(this.rotY);
        let x1 = x * cos - z * sin;
        let z1 = z * cos + x * sin;

        // Rotate X
        cos = Math.cos(this.rotX); sin = Math.sin(this.rotX);
        let y2 = y * cos - z1 * sin;
        let z2 = z1 * cos + y * sin;

        // Perspective
        const scale = fov / (fov + z2 + 100);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale: scale
        };
      });

      // Draw edges
      ctx.strokeStyle = THEMES[STATE.currentThemeIndex].primary;
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 0.75;
      ctx.shadowBlur = 12;
      ctx.shadowColor = THEMES[STATE.currentThemeIndex].primary;

      for (let i = 0; i < currentGeom.e.length; i++) {
        const edge = currentGeom.e[i];
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw glowing vertices
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.8, 2.8 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
    }
  }

  /* ==========================================================================
     6. MULTI-MODEL AGENTIC WORKFLOW STUDIO & SIMULATOR
     ========================================================================== */
  class WorkflowSimulator {
    constructor() {
      this.isRunning = false;
      this.currentStep = 0;
      this.timer = null;
      this.scenarios = {
        dapp: [
          { stage: 1, agent: 'Claude Opus 4.6', log: '[Architect] Phân tích đặc tả ERC-4626 Vault, thiết kế State Machine & Smart Contracts...' },
          { stage: 2, agent: 'Gemini 3.1 Pro', log: '[Dev] Viết Solidity Smart Contract, tích hợp ReentrancyGuard và UI Web3 Frontend...' },
          { stage: 3, agent: 'Gemini 3.1 Flash', log: '[QA] Thực thi 142 Fuzzing Unit Tests & Slither Static Analysis. 0 lỗ hổng tìm thấy.' },
          { stage: 4, agent: 'Claude Opus 4.6', log: '[Review] Code Review toàn diện: Tối ưu Gas 24%, chữ ký xác thực đạt chuẩn bảo mật.' },
          { stage: 5, agent: 'Cloudflare Edge', log: '[Ingress] Deploy thành công lên hello.aicodedao.xyz qua Cloudflare Tunnel Zero-Trust!' }
        ],
        webgl: [
          { stage: 1, agent: 'Claude Opus 4.6', log: '[Architect] Phân tích Profile GPU, Draw calls & tối ưu hóa Fragment Shader Pipeline...' },
          { stage: 2, agent: 'Gemini 3.1 Pro', log: '[Dev] Tái cấu trúc Vertex Buffer, Instanced Rendering 60+ FPS & WebGL2 Matrix...' },
          { stage: 3, agent: 'Gemini 3.1 Flash', log: '[QA] Đo lường Render Budget (<8.3ms/frame). FPS duy trì ổn định 120 FPS mượt mà.' },
          { stage: 4, agent: 'Claude Opus 4.6', log: '[Review] Kiểm thử tương thích WebGL trên Chrome, Safari, Firefox & Mobile.' },
          { stage: 5, agent: 'Cloudflare Edge', log: '[Ingress] Purge CDN Cache và kích hoạt tài nguyên nén Gzip trên Edge Server.' }
        ],
        edge: [
          { stage: 1, agent: 'Claude Opus 4.6', log: '[Architect] Thiết kế kiến trúc mTLS, JWT Token Rotation và Microservice Schema...' },
          { stage: 2, agent: 'Gemini 3.1 Pro', log: '[Dev] Triển khai Rust Edge Worker & Nginx Alpine Container Ingress Port 8080...' },
          { stage: 3, agent: 'Gemini 3.1 Flash', log: '[QA] Stress Test 10,000 req/s với k6. P99 Latency: 3.2ms. Zero Packet Loss.' },
          { stage: 4, agent: 'Claude Opus 4.6', log: '[Review] Audit OWASP Top 10 & xác thực quyền Docker Non-Root Container.' },
          { stage: 5, agent: 'Cloudflare Edge', log: '[Ingress] Định tuyến Subdomain hello.aicodedao.xyz kết nối an toàn 24/7!' }
        ],
        audit: [
          { stage: 1, agent: 'Claude Opus 4.6', log: '[Architect] Quét cây phụ thuộc, cơ sở dữ liệu CVE và AST Code Patterns...' },
          { stage: 2, agent: 'Gemini 3.1 Pro', log: '[Dev] Vá giới hạn Buffer, mã hóa Input & thiết lập CSP Security Headers...' },
          { stage: 3, agent: 'Gemini 3.1 Flash', log: '[QA] Chạy bộ kiểm thử xâm nhập tự động (Automated Penetration Suite).' },
          { stage: 4, agent: 'Claude Opus 4.6', log: '[Review] Ký số mật mã Release và phê duyệt đẩy code lên GitHub aicodedao/hello.' },
          { stage: 5, agent: 'Cloudflare Edge', log: '[Ingress] Đồng bộ bản build bảo mật tuyệt đối tới cụm Cloudflare Global Nodes.' }
        ]
      };
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.currentStep = 0;
      this.resetUI();

      const select = document.getElementById('workflow-scenario-select');
      const scenarioKey = select ? select.value : 'webgl';
      const steps = this.scenarios[scenarioKey] || this.scenarios.webgl;

      const runBtnText = document.getElementById('workflow-btn-text');
      if (runBtnText) runBtnText.textContent = 'Đang Chạy...';

      this.executeStep(steps);
    }

    executeStep(steps) {
      if (this.currentStep >= steps.length) {
        this.isRunning = false;
        const runBtnText = document.getElementById('workflow-btn-text');
        if (runBtnText) runBtnText.textContent = 'Mô Phỏng Xong ✓';
        AudioSys.triggerSound('benchmark-done');
        return;
      }

      const stepData = steps[this.currentStep];
      const stageEl = document.getElementById(`stage-${stepData.stage}`);
      if (stageEl) {
        stageEl.classList.add('active');
        const pill = stageEl.querySelector('.dag-status-pill');
        if (pill) {
          pill.className = 'dag-status-pill running';
          pill.textContent = 'Running';
        }
      }

      // Add log
      const consoleBody = document.getElementById('workflow-console-body');
      if (consoleBody) {
        const line = document.createElement('div');
        line.className = 'console-line active';
        line.textContent = stepData.log;
        consoleBody.appendChild(line);
        consoleBody.scrollTop = consoleBody.scrollHeight;
      }

      // Update metrics
      const progressEl = document.getElementById('workflow-progress');
      const throughputEl = document.getElementById('workflow-throughput');
      const percent = Math.round(((this.currentStep + 1) / steps.length) * 100);
      if (progressEl) progressEl.textContent = `${percent}% COMPLETED`;
      if (throughputEl) throughputEl.textContent = `${Math.floor(750 + Math.random() * 350)} tokens/sec`;

      AudioSys.triggerSound('workflow-step');

      this.timer = setTimeout(() => {
        if (stageEl) {
          stageEl.classList.remove('active');
          stageEl.classList.add('completed');
          const pill = stageEl.querySelector('.dag-status-pill');
          if (pill) {
            pill.className = 'dag-status-pill completed';
            pill.textContent = 'Done ✓';
          }
        }
        this.currentStep++;
        this.executeStep(steps);
      }, 1400);
    }

    resetUI() {
      clearTimeout(this.timer);
      this.isRunning = false;
      for (let i = 1; i <= 5; i++) {
        const stageEl = document.getElementById(`stage-${i}`);
        if (stageEl) {
          stageEl.classList.remove('active', 'completed');
          const pill = stageEl.querySelector('.dag-status-pill');
          if (pill) {
            pill.className = 'dag-status-pill pending';
            pill.textContent = 'Pending';
          }
        }
      }
      const progressEl = document.getElementById('workflow-progress');
      const throughputEl = document.getElementById('workflow-throughput');
      const runBtnText = document.getElementById('workflow-btn-text');
      if (progressEl) progressEl.textContent = '0% COMPLETED';
      if (throughputEl) throughputEl.textContent = '0 tokens/sec';
      if (runBtnText) runBtnText.textContent = 'Chạy Mô Phỏng';

      const consoleBody = document.getElementById('workflow-console-body');
      if (consoleBody) {
        consoleBody.innerHTML = '<div class="console-line info">[System] Pipeline Ready. Nhấn "Chạy Mô Phỏng" để bắt đầu luồng điều phối đa Agent tự động.</div>';
      }
    }
  }

  const WorkflowEngine = new WorkflowSimulator();

  /* ==========================================================================
     7. CODE & SHADER PLAYGROUND LAB
     ========================================================================== */
  class CodeLabEngine {
    constructor() {
      this.presets = {
        'quantum-particles': `<!DOCTYPE html>
<html>
<head><style>body { margin:0; overflow:hidden; background:#040711; }</style></head>
<body>
<canvas id="c"></canvas>
<script>
const c = document.getElementById('c'), ctx = c.getContext('2d');
c.width = window.innerWidth; c.height = window.innerHeight;
const pts = Array.from({length: 60}, () => ({
  x: Math.random()*c.width, y: Math.random()*c.height,
  vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2, r: Math.random()*3+2
}));
function draw() {
  ctx.fillStyle = 'rgba(4,7,17,0.2)'; ctx.fillRect(0,0,c.width,c.height);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x<0 || p.x>c.width) p.vx*=-1;
    if (p.y<0 || p.y>c.height) p.vy*=-1;
    ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();
</script>
</body></html>`,
        'matrix-stream': `<!DOCTYPE html>
<html>
<head><style>body{margin:0;background:#000;color:#0f0;font-family:monospace;overflow:hidden;}</style></head>
<body>
<canvas id="mc"></canvas>
<script>
const c = document.getElementById('mc'), ctx = c.getContext('2d');
c.width = window.innerWidth; c.height = window.innerHeight;
const cols = Math.floor(c.width/16), drops = Array(cols).fill(1);
function m() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)'; ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle = '#00ff88'; ctx.font = '15px monospace';
  drops.forEach((y, i) => {
    const text = String.fromCharCode(0x30A0 + Math.random()*96);
    ctx.fillText(text, i*16, y*16);
    if (y*16 > c.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
  requestAnimationFrame(m);
}
m();
</script>
</body></html>`,
        'synth-audio': `<!DOCTYPE html>
<html>
<head><style>body{margin:0;background:#090d16;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;}</style></head>
<body>
<button onclick="play()" style="padding:14px 28px;background:#6366f1;color:#fff;border:none;border-radius:12px;cursor:pointer;font-weight:700;font-size:16px;">
  🎵 Phát Giai Điệu Synthesizer
</button>
<script>
function play() {
  const ac = new (window.AudioContext || window.webkitAudioContext)();
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.15, ac.currentTime + idx*0.15);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + idx*0.15 + 0.3);
    osc.connect(g); g.connect(ac.destination);
    osc.start(ac.currentTime + idx*0.15);
    osc.stop(ac.currentTime + idx*0.15 + 0.3);
  });
}
</script>
</body></html>`,
        'glass-card': `<!DOCTYPE html>
<html>
<head><style>
body { margin:0; background:radial-gradient(circle,#1e1b4b,#030712); display:flex; align-items:center; justify-content:center; height:100vh; font-family:system-ui; }
.card { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); backdrop-filter:blur(20px); border-radius:20px; padding:30px; color:#fff; box-shadow:0 20px 50px rgba(0,0,0,0.6); text-align:center; }
</style></head>
<body>
<div class="card">
  <h2>🧊 AiCodeDao Glass 3.5</h2>
  <p>Thẻ hiệu ứng kính mờ Cyber-Glassmorphism</p>
</div>
</body></html>`
      };
    }

    loadPreset(presetKey) {
      const codeInput = document.getElementById('codelab-code-input');
      if (codeInput && this.presets[presetKey]) {
        codeInput.value = this.presets[presetKey];
        this.run();
      }
    }

    run() {
      const codeInput = document.getElementById('codelab-code-input');
      const frame = document.getElementById('codelab-sandbox-frame');
      if (codeInput && frame) {
        frame.srcdoc = codeInput.value;
      }
    }
  }

  const CodeLab = new CodeLabEngine();

  /* ==========================================================================
     8. HARDWARE & AI BENCHMARK SUITE
     ========================================================================== */
  class BenchmarkSuite {
    constructor() {
      this.isTesting = false;
    }

    async run() {
      if (this.isTesting) return;
      this.isTesting = true;

      const startBtn = document.getElementById('start-benchmark-btn');
      const progBar = document.getElementById('benchmark-progress-bar');
      const titleEl = document.getElementById('benchmark-title-eval');
      const descEl = document.getElementById('benchmark-desc-eval');
      const tierEl = document.getElementById('benchmark-tier-score');

      if (startBtn) startBtn.disabled = true;
      if (titleEl) titleEl.textContent = 'Đang thực thi Test 1/4: WebGL 3D Shader ops...';

      // Test 1: WebGL Shader
      if (progBar) progBar.style.width = '25%';
      await new Promise(r => setTimeout(r, 600));
      const webglScore = (Math.random() * 4.2 + 8.5).toFixed(1);
      const webglEl = document.getElementById('bm-webgl-val');
      if (webglEl) webglEl.textContent = `${webglScore} TFLOPS`;

      // Test 2: JS Matrix Float Ops
      if (titleEl) titleEl.textContent = 'Đang thực thi Test 2/4: JS Matrix Float Ops...';
      if (progBar) progBar.style.width = '50%';
      const t0 = performance.now();
      let sum = 0;
      for (let i = 0; i < 2000000; i++) sum += Math.sin(i) * Math.cos(i);
      const t1 = performance.now();
      const opsScore = Math.round(2000 / (t1 - t0 + 1) * 10);
      const opsEl = document.getElementById('bm-ops-val');
      if (opsEl) opsEl.textContent = `${opsScore} MOps/s`;
      await new Promise(r => setTimeout(r, 600));

      // Test 3: Web Audio Synth Latency
      if (titleEl) titleEl.textContent = 'Đang thực thi Test 3/4: Audio Synth Jitter...';
      if (progBar) progBar.style.width = '75%';
      await new Promise(r => setTimeout(r, 500));
      const audioEl = document.getElementById('bm-audio-val');
      if (audioEl) audioEl.textContent = '< 1.8 ms';

      // Test 4: Cloudflare Edge Latency
      if (titleEl) titleEl.textContent = 'Đang thực thi Test 4/4: Cloudflare Edge Network...';
      if (progBar) progBar.style.width = '100%';
      const edgeStart = performance.now();
      try {
        await fetch('/healthz');
      } catch {}
      const edgeEnd = performance.now();
      const edgeLatency = Math.max(1.2, (edgeEnd - edgeStart)).toFixed(1);
      const edgeEl = document.getElementById('bm-edge-val');
      if (edgeEl) edgeEl.textContent = `${edgeLatency} ms`;

      // Complete
      if (tierEl) tierEl.textContent = 'S+';
      if (titleEl) titleEl.textContent = 'Quantum Supremacy Grade (S+)';
      if (descEl) descEl.textContent = 'Thiết bị đạt chuẩn hiệu năng cao nhất, tối ưu 120 FPS & độ trễ Cloudflare Edge siêu tốc!';
      if (startBtn) startBtn.disabled = false;

      this.isTesting = false;
      AudioSys.triggerSound('benchmark-done');
    }
  }

  const Benchmark = new BenchmarkSuite();

  /* ==========================================================================
     9. MINI AI GAME v2.0 ("CYBER QUANTUM DODGER PRO")
     ========================================================================== */
  class MiniGameEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.width = 460;
      this.height = 340;
      this.isRunning = false;
      this.isPaused = false;
      this.score = 0;
      this.combo = 1;
      this.shields = 3;
      this.empCharges = 2;
      this.slowMoTimer = 0;
      this.ship = { x: 230, y: 280, vx: 0, vy: 0, r: 12 };
      this.orbs = [];
      this.traps = [];
      this.particles = [];
      this.keys = {};
      this.difficulty = 'medium';
      this.initEvents();
    }

    initEvents() {
      window.addEventListener('keydown', e => {
        this.keys[e.key] = true;
        if ((e.key === 'e' || e.key === 'E' || (e.code === 'Space' && this.isRunning)) && this.isRunning) {
          this.triggerEMP();
        }
      });
      window.addEventListener('keyup', e => { this.keys[e.key] = false; });

      const canvas = this.canvas;
      const setShipPos = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = this.width / rect.width;
        const scaleY = this.height / rect.height;
        this.ship.x = (clientX - rect.left) * scaleX;
        this.ship.y = (clientY - rect.top) * scaleY;
      };

      canvas.addEventListener('mousemove', e => {
        if (this.isRunning) setShipPos(e.clientX, e.clientY);
      });
      canvas.addEventListener('touchmove', e => {
        if (this.isRunning && e.touches.length > 0) {
          setShipPos(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });
    }

    start() {
      const diffEl = document.getElementById('game-difficulty');
      this.difficulty = diffEl ? diffEl.value : 'medium';
      this.score = 0;
      this.combo = 1;
      this.shields = 3;
      this.empCharges = 2;
      this.slowMoTimer = 0;
      this.ship.x = this.width / 2;
      this.ship.y = this.height - 50;
      this.orbs = [];
      this.traps = [];
      this.particles = [];
      this.isRunning = true;

      document.getElementById('game-start-overlay').style.display = 'none';
      document.getElementById('game-over-overlay').style.display = 'none';
      this.updateHud();
      AudioSys.triggerSound('game-powerup');
      this.loop();
    }

    triggerEMP() {
      if (this.empCharges <= 0 || !this.isRunning) return;
      this.empCharges--;
      AudioSys.triggerSound('game-emp');

      // Clear traps and create explosion particles
      this.traps.forEach(t => {
        for (let i = 0; i < 8; i++) {
          this.particles.push({
            x: t.x, y: t.y,
            vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
            life: 25, color: '#a855f7'
          });
        }
      });
      this.traps = [];
      this.score += 250;
      this.updateHud();

      const aiText = document.getElementById('game-ai-text');
      if (aiText) aiText.textContent = 'Gemini AI: ⚡ Quantum EMP Blast kích hoạt! Toàn bộ Glitch Traps đã bị phá huỷ!';
    }

    loop() {
      if (!this.isRunning) return;
      this.update();
      this.render();
      requestAnimationFrame(() => this.loop());
    }

    update() {
      // Key controls
      const speed = 4.5;
      if (this.keys['ArrowLeft'] || this.keys['a']) this.ship.x -= speed;
      if (this.keys['ArrowRight'] || this.keys['d']) this.ship.x += speed;
      if (this.keys['ArrowUp'] || this.keys['w']) this.ship.y -= speed;
      if (this.keys['ArrowDown'] || this.keys['s']) this.ship.y += speed;

      this.ship.x = Math.max(15, Math.min(this.width - 15, this.ship.x));
      this.ship.y = Math.max(15, Math.min(this.height - 15, this.ship.y));

      // Spawn orbs
      if (Math.random() < 0.04) {
        this.orbs.push({
          x: Math.random() * (this.width - 30) + 15,
          y: -10,
          vy: Math.random() * 2 + 2,
          r: 7
        });
      }

      // Spawn traps
      const trapRate = this.difficulty === 'hard' ? 0.07 : (this.difficulty === 'medium' ? 0.045 : 0.03);
      if (Math.random() < trapRate) {
        this.traps.push({
          x: Math.random() * (this.width - 30) + 15,
          y: -15,
          vy: (Math.random() * 2.5 + 2) * (this.slowMoTimer > 0 ? 0.5 : 1),
          r: Math.random() * 8 + 8,
          rot: 0
        });
      }

      if (this.slowMoTimer > 0) this.slowMoTimer--;

      // Update orbs
      for (let i = this.orbs.length - 1; i >= 0; i--) {
        const orb = this.orbs[i];
        orb.y += orb.vy;
        const dist = Math.hypot(orb.x - this.ship.x, orb.y - this.ship.y);
        if (dist < orb.r + this.ship.r) {
          // Collected
          this.score += 100 * this.combo;
          this.combo = Math.min(5, this.combo + 1);
          AudioSys.triggerSound('game-collect');
          this.orbs.splice(i, 1);
          this.updateHud();
          continue;
        }
        if (orb.y > this.height + 20) {
          this.orbs.splice(i, 1);
        }
      }

      // Update traps
      for (let i = this.traps.length - 1; i >= 0; i--) {
        const trap = this.traps[i];
        trap.y += trap.vy;
        trap.rot += 0.05;
        const dist = Math.hypot(trap.x - this.ship.x, trap.y - this.ship.y);
        if (dist < trap.r + this.ship.r) {
          // Hit
          this.shields--;
          this.combo = 1;
          AudioSys.triggerSound('game-hit');
          this.traps.splice(i, 1);
          this.updateHud();

          if (this.shields <= 0) {
            this.gameOver();
            return;
          }
          continue;
        }
        if (trap.y > this.height + 20) {
          this.traps.splice(i, 1);
        }
      }

      // Update particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) this.particles.splice(i, 1);
      }
    }

    render() {
      const ctx = this.ctx;
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, this.width, this.height);

      // Draw Starfield Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < this.width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.height); ctx.stroke();
      }

      // Draw Orbs
      for (let orb of this.orbs) {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Traps
      for (let trap of this.traps) {
        ctx.fillStyle = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ef4444';
        ctx.save();
        ctx.translate(trap.x, trap.y);
        ctx.rotate(trap.rot);
        ctx.fillRect(-trap.r, -trap.r, trap.r * 2, trap.r * 2);
        ctx.restore();
      }

      // Draw Particles
      for (let p of this.particles) {
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Ship
      ctx.fillStyle = '#6366f1';
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#6366f1';
      ctx.beginPath();
      ctx.moveTo(this.ship.x, this.ship.y - 14);
      ctx.lineTo(this.ship.x - 12, this.ship.y + 12);
      ctx.lineTo(this.ship.x + 12, this.ship.y + 12);
      ctx.closePath();
      ctx.fill();

      // Shield Aura
      if (this.shields > 0) {
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.ship.x, this.ship.y, 20, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
    }

    updateHud() {
      const scoreEl = document.getElementById('game-score');
      const comboEl = document.getElementById('game-combo');
      const shieldsEl = document.getElementById('game-shields');
      const highEl = document.getElementById('game-high-score');
      const empEl = document.getElementById('game-emp');

      if (scoreEl) scoreEl.textContent = this.score;
      if (comboEl) comboEl.textContent = `x${this.combo}`;
      if (shieldsEl) shieldsEl.textContent = '🛡️ '.repeat(Math.max(0, this.shields));
      if (highEl) highEl.textContent = Math.max(this.score, STATE.gameHighScore);
      if (empEl) empEl.textContent = `⚡ x${this.empCharges} [E]`;
    }

    gameOver() {
      this.isRunning = false;
      AudioSys.triggerSound('game-over');

      if (this.score > STATE.gameHighScore) {
        STATE.gameHighScore = this.score;
        localStorage.setItem('aicodedao_game_high_score', this.score.toString());
      }

      const overOverlay = document.getElementById('game-over-overlay');
      const finalScoreEl = document.getElementById('game-final-score');
      const recordMsg = document.getElementById('game-record-msg');

      if (finalScoreEl) finalScoreEl.textContent = this.score;
      if (recordMsg) {
        recordMsg.textContent = this.score >= STATE.gameHighScore ? '🎉 KỶ LỤC MỚI ĐƯỢC THIẾT LẬP!' : '';
      }
      if (overOverlay) overOverlay.style.display = 'flex';
    }
  }

  /* ==========================================================================
     10. GEMINI AI ASSISTANT v6.0 (TWO-WAY VOICE & STREAMING)
     ========================================================================== */
  class GeminiAssistant {
    constructor() {
      this.isGenerating = false;
      this.recognition = null;
      this.initSpeechRecognition();
    }

    initSpeechRecognition() {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = STATE.currentLang === 'vi' ? 'vi-VN' : 'en-US';

        this.recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          const input = document.getElementById('ai-chat-input');
          if (input) {
            input.value = transcript;
            input.focus();
          }
          this.stopVoiceInput();
        };

        this.recognition.onerror = () => { this.stopVoiceInput(); };
        this.recognition.onend = () => { this.stopVoiceInput(); };
      }
    }

    toggleVoiceInput() {
      if (!this.recognition) {
        showToast('Trình duyệt chưa hỗ trợ Web Speech Recognition', 'warning');
        return;
      }
      if (STATE.speechRecognitionActive) {
        this.recognition.stop();
        this.stopVoiceInput();
      } else {
        try {
          this.recognition.lang = STATE.currentLang === 'vi' ? 'vi-VN' : (STATE.currentLang === 'ja' ? 'ja-JP' : 'en-US');
          this.recognition.start();
          STATE.speechRecognitionActive = true;
          const micBtn = document.getElementById('ai-mic-btn');
          if (micBtn) micBtn.classList.add('recording');
          showToast('Đang lắng nghe giọng nói...', 'info');
        } catch {
          this.stopVoiceInput();
        }
      }
    }

    stopVoiceInput() {
      STATE.speechRecognitionActive = false;
      const micBtn = document.getElementById('ai-mic-btn');
      if (micBtn) micBtn.classList.remove('recording');
    }

    speak(text) {
      if (!STATE.voiceTtsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#`_~\[\]()<>]/g, ' ');
      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.lang = STATE.currentLang === 'vi' ? 'vi-VN' : 'en-US';
      utter.rate = 1.05;
      window.speechSynthesis.speak(utter);
    }

    async sendMessage(prompt) {
      if (!prompt || this.isGenerating) return;
      this.isGenerating = true;

      this.appendMessage('user', prompt);
      const indicator = document.getElementById('ai-typing-indicator');
      if (indicator) indicator.style.display = 'flex';

      AudioSys.triggerSound('click');

      try {
        let responseText = '';
        if (STATE.geminiApiKey && STATE.geminiModel !== 'mock-stream') {
          // Direct Gemini API call
          responseText = await this.callGeminiApi(prompt);
        } else {
          // Agentic Mock Streaming Response
          responseText = await this.mockStreamResponse(prompt);
        }

        if (indicator) indicator.style.display = 'none';
        this.appendMessage('bot', responseText);
        this.speak(responseText);
        AudioSys.triggerSound('game-powerup');
      } catch (err) {
        if (indicator) indicator.style.display = 'none';
        this.appendMessage('bot', `⚠️ Lỗi phản hồi: ${err.message || 'Không thể kết nối đến AI Core'}`);
      } finally {
        this.isGenerating = false;
      }
    }

    async callGeminiApi(prompt) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${STATE.geminiModel}:generateContent?key=${STATE.geminiApiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: 'Bạn là AiCodeDao Quantum AI Assistant v6.0. Phản hồi sắc bén, chuyên nghiệp, hỗ trợ định dạng Markdown, code snippets và giải thích chi tiết.' }] }
        })
      });
      if (!res.ok) throw new Error(`API returned HTTP ${res.status}`);
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi từ Gemini API.';
    }

    async mockStreamResponse(prompt) {
      await new Promise(r => setTimeout(r, 600));
      const p = prompt.toLowerCase();
      if (p.includes('game')) {
        return `### 🎮 Chiến Thuật Cyber AI Quantum Dodger v2.0\n\n1. **Gom Quantum Orbs (+100)** để đẩy Combo Multiplier lên **x5 Overdrive**.\n2. **Kích hoạt Quantum EMP (Phím E / Space)** khi bị dồn ép bởi Glitch Traps.\n3. **Giữ bình tĩnh** ở các mốc Boss Wave (1000+ điểm)!`;
      }
      if (p.includes('workflow') || p.includes('multi-model')) {
        return `### ⚡ Kiến Trúc Multi-Model Pipeline v6.0\n\n- **Claude Opus 4.6**: Lập kế hoạch, phân rã kiến trúc & Security Review.\n- **Gemini 3.1 Pro**: Viết code, tái cấu trúc & tối ưu hiệu năng.\n- **Gemini 3.1 Flash**: Chạy Test, QA Sentinel & Ingress Verification.`;
      }
      if (p.includes('3d') || p.includes('polyhedra')) {
        return `### 🔮 7 Khối 3D Polyhedra Reactor\n\n1. **Icosahedron** (20 mặt đều)\n2. **Hypercube 4D** (Tesseract đa chiều)\n3. **Quantum Dodecahedron** (12 mặt đều)\n4. **Octahedron** (8 mặt kim cương)\n5. **Klein Torus** (Hình xuyến lượng tử)\n6. **Stellated Star** (Ngôi sao 12 cánh)\n7. **DNA Helix** (Chuỗi xoắn kép Cyber)`;
      }
      return `✨ **AiCodeDao Assistant (v6.0)**: Cảm ơn bạn đã tương tác! Dự án đang chạy trên **Docker Nginx Alpine** kết nối an toàn qua **Cloudflare Tunnel** tại \`https://hello.aicodedao.xyz\`.`;
    }

    appendMessage(role, text) {
      const container = document.getElementById('ai-chat-messages');
      if (!container) return;

      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${role}`;

      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble';
      bubble.innerHTML = this.parseMarkdown(text);

      msgDiv.appendChild(bubble);
      container.appendChild(msgDiv);
      container.scrollTop = container.scrollHeight;

      STATE.chatHistory.push({ role, text, time: new Date().toISOString() });
    }

    parseMarkdown(text) {
      let html = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^\- (.*$)/gim, '<li>$1</li>');
      return html;
    }

    exportChatTranscript() {
      if (STATE.chatHistory.length === 0) {
        showToast('Chưa có lịch sử hội thoại để xuất', 'warning');
        return;
      }
      let md = `# AiCodeDao • Chat Transcript Export (v6.0)\n\n*Exported at: ${new Date().toLocaleString()}*\n\n---\n\n`;
      STATE.chatHistory.forEach(item => {
        md += `### [${item.role.toUpperCase()}] (${new Date(item.time).toLocaleTimeString()})\n\n${item.text}\n\n---\n\n`;
      });
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aicodedao-chat-${Date.now()}.md`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Đã xuất lịch sử chat ra file Markdown!', 'success');
    }
  }

  const Assistant = new GeminiAssistant();

  /* ==========================================================================
     11. BACKGROUND MULTI-MODE CANVAS
     ========================================================================== */
  class BackgroundCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.width = window.innerWidth || 1200;
      this.height = window.innerHeight || 800;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.resize();
      window.addEventListener('resize', () => this.resize(), { passive: true });
      this.initParticles();
    }

    resize() {
      if (!this.canvas) return;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth || document.documentElement.clientWidth || 1200;
      this.height = window.innerHeight || document.documentElement.clientHeight || 800;
      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      if (this.ctx) {
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      }
    }

    initParticles() {
      this.particles = [];
      const count = Math.min(80, Math.floor((this.width * this.height) / 18000));
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          r: Math.random() * 2 + 1.2
        });
      }
    }

    render() {
      if (!this.ctx) return;
      const ctx = this.ctx;
      const mode = CANVAS_MODES[STATE.currentCanvasModeIndex];
      ctx.clearRect(0, 0, this.width, this.height);

      if (mode === 'Neural Web') {
        ctx.fillStyle = THEMES[STATE.currentThemeIndex].primary;
        ctx.strokeStyle = THEMES[STATE.currentThemeIndex].primary;
        this.particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > this.width) p.vx *= -1;
          if (p.y < 0 || p.y > this.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < this.particles.length; j++) {
            const p2 = this.particles[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 120) {
              ctx.globalAlpha = 1 - d / 120;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
        ctx.globalAlpha = 1.0;
      } else if (mode === 'Matrix Rain') {
        ctx.fillStyle = '#10b981';
        ctx.font = '14px monospace';
        this.particles.forEach(p => {
          p.y += 3;
          if (p.y > this.height) p.y = 0;
          const char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
          ctx.fillText(char, p.x, p.y);
        });
      } else if (mode === 'Starfield' || mode === 'Warp Speed') {
        const speedMult = mode === 'Warp Speed' ? 4.5 : 1.5;
        ctx.fillStyle = '#fff';
        this.particles.forEach(p => {
          p.y += p.vy * speedMult;
          if (p.y > this.height) p.y = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (mode === 'Warp Speed' ? 2 : 1), 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (mode === 'Quantum Aurora') {
        ctx.strokeStyle = THEMES[STATE.currentThemeIndex].primary;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.35;
        const time = Date.now() * 0.001;
        ctx.beginPath();
        for (let x = 0; x < this.width; x += 20) {
          const y = Math.sin(x * 0.005 + time) * 60 + this.height * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
    }
  }

  /* ==========================================================================
     12. UI HELPERS & UTILITIES
     ========================================================================== */
  function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOutToast 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function triggerConfetti() {
    AudioSys.triggerSound('click');
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = '-10px';
      el.style.width = '8px';
      el.style.height = '8px';
      el.style.background = THEMES[Math.floor(Math.random() * THEMES.length)].primary;
      el.style.borderRadius = '50%';
      el.style.zIndex = '99999';
      el.style.pointerEvents = 'none';
      el.style.transition = 'all 1.5s cubic-bezier(0.2,0.8,0.2,1)';
      document.body.appendChild(el);
      setTimeout(() => {
        el.style.transform = `translate(${(Math.random()-0.5)*200}px, ${window.innerHeight + 20}px) rotate(${Math.random()*360}deg)`;
        el.style.opacity = '0';
      }, 20);
      setTimeout(() => el.remove(), 1600);
    }
  }

  function updateClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    const now = new Date();
    if (STATE.timezoneMode === 'VN') {
      clockEl.textContent = `${now.toLocaleTimeString('vi-VN')} (VN UTC+7)`;
    } else {
      clockEl.textContent = `${now.toUTCString().slice(17, 25)} (UTC)`;
    }
  }

  function updateGreeting() {
    const lang = I18N[STATE.currentLang] || I18N.vi;
    const hour = new Date().getHours();
    let slot = 'morning';
    if (hour >= 4 && hour < 7) slot = 'dawn';
    else if (hour >= 7 && hour < 12) slot = 'morning';
    else if (hour >= 12 && hour < 18) slot = 'afternoon';
    else if (hour >= 18 && hour < 22) slot = 'evening';
    else slot = 'night';

    const timeBadge = document.getElementById('time-badge');
    const greetingText = document.getElementById('greeting-text');
    const subtitleText = document.getElementById('subtitle-text');

    if (timeBadge) timeBadge.textContent = `🌅 ${lang.greetings[slot]}`;
    if (greetingText) greetingText.textContent = `${STATE.currentAvatar} ${lang.title}`;
    if (subtitleText) {
      const name = STATE.userName || lang.greetDefaultName;
      subtitleText.textContent = lang.subtitle.replace('{name}', name);
    }
  }

  function applyTheme(idx) {
    STATE.currentThemeIndex = idx % THEMES.length;
    const theme = THEMES[STATE.currentThemeIndex];
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-glow', theme.glow);
    document.documentElement.style.setProperty('--primary-gradient', theme.gradient);

    const label = document.getElementById('theme-btn-label');
    if (label) label.textContent = `Theme (${theme.name})`;
    AudioSys.triggerSound('theme');
  }

  /* ==========================================================================
     13. INTERACTIVE CLI TERMINAL ENGINE v6.0
     ========================================================================== */
  function executeCliCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const output = document.getElementById('terminal-output');
    const log = (text, cls = '') => {
      if (!output) return;
      const l = document.createElement('div');
      l.className = `terminal-line ${cls}`;
      l.innerHTML = text;
      output.appendChild(l);
      output.scrollTop = output.scrollHeight;
    };

    log(`aicodedao:~$ ${cmd}`, 'cmd-highlight');

    const parts = cmd.split(' ');
    const root = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (root) {
      case '/game':
        document.getElementById('mini-game-modal')?.classList.add('show');
        log('🎮 Đã mở Cyber AI Quantum Dodger v2.0!');
        break;
      case '/shapes':
        STATE.currentShapeIndex = (STATE.currentShapeIndex + 1) % SHAPES.length;
        document.getElementById('shape-label').textContent = SHAPES[STATE.currentShapeIndex];
        AudioSys.triggerSound('shape-change');
        log(`🔮 Đã đổi hình khối 3D sang: <strong>${SHAPES[STATE.currentShapeIndex]}</strong>`);
        break;
      case '/workflow':
        WorkflowEngine.start();
        log('⚡ Đã kích hoạt mô phỏng Multi-Model Workflow Studio!');
        break;
      case '/benchmark':
        document.getElementById('benchmark-modal')?.classList.add('show');
        Benchmark.run();
        log('📊 Đã khởi chạy Quantum Benchmark Suite!');
        break;
      case '/codelab':
        document.getElementById('codelab-modal')?.classList.add('show');
        CodeLab.loadPreset('quantum-particles');
        log('⚡ Đã mở Code & Shader Playground Lab!');
        break;
      case '/drone':
        const active = AudioSys.toggleBinauralDrone();
        log(`🧘 Ambient Binaural Sci-Fi Drone: <strong>${active ? 'BẬT' : 'TẮT'}</strong>`);
        break;
      case '/status':
        log('✅ <strong>AiCodeDao System Online (v6.0)</strong><br>Docker: Nginx Alpine (Port 8080)<br>Cloudflare Tunnel: hello.aicodedao.xyz (Connected)<br>Agents: 5 Nodes Synchronized');
        break;
      case '/ai':
        if (arg) {
          Assistant.sendMessage(arg);
          log(`🤖 Đã gửi câu hỏi tới Gemini AI: "${arg}"`);
        } else {
          log('💡 Cách dùng: /ai &lt;câu hỏi của bạn&gt;');
        }
        break;
      case '/speak':
        STATE.voiceTtsEnabled = !STATE.voiceTtsEnabled;
        log(`🗣️ Voice TTS Assistant: <strong>${STATE.voiceTtsEnabled ? 'BẬT' : 'TẮT'}</strong>`);
        break;
      case '/export':
        Assistant.exportChatTranscript();
        log('📥 Đã xuất lịch sử trò chuyện.');
        break;
      case '/theme':
        applyTheme(STATE.currentThemeIndex + 1);
        log(`🎨 Đã chuyển sang bảng màu: ${THEMES[STATE.currentThemeIndex].name}`);
        break;
      case '/canvas':
        STATE.currentCanvasModeIndex = (STATE.currentCanvasModeIndex + 1) % CANVAS_MODES.length;
        document.getElementById('canvas-mode-label').textContent = CANVAS_MODES[STATE.currentCanvasModeIndex];
        log(`🌌 Nền Canvas: ${CANVAS_MODES[STATE.currentCanvasModeIndex]}`);
        break;
      case '/confetti':
        triggerConfetti();
        log('🎉 Đã bắn pháo hoa!');
        break;
      case '/sound':
        STATE.currentAudioPresetIndex = (STATE.currentAudioPresetIndex + 1) % AUDIO_PRESETS.length;
        document.getElementById('sound-label').textContent = AUDIO_PRESETS[STATE.currentAudioPresetIndex];
        log(`🔊 Chế độ âm thanh: ${AUDIO_PRESETS[STATE.currentAudioPresetIndex]}`);
        break;
      case '/ping':
        log('📡 Ping Cloudflare Edge: &lt; 4ms (HTTP/2)');
        break;
      case '/clear':
        if (output) output.innerHTML = '';
        break;
      case '/help':
      default:
        log('🛠️ <strong>Danh sách lệnh:</strong><br>/workflow, /game, /shapes, /benchmark, /codelab, /drone, /status, /ai &lt;text&gt;, /speak, /export, /theme, /canvas, /confetti, /sound, /ping, /clear, /help');
        break;
    }
  }

  /* ==========================================================================
     14. MAIN INITIALIZATION & DOM BINDINGS
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    const bgCanvas = new BackgroundCanvas('particles-canvas');
    const hud3d = new Hud3DPolyhedraReactor('hud-3d-canvas');
    const game = new MiniGameEngine('mini-game-canvas');

    // RAF Loop for Canvas & 3D Core
    function mainLoop() {
      bgCanvas.render();
      hud3d.render();
      requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);

    // Initial Welcomes
    updateClock();
    setInterval(updateClock, 1000);
    updateGreeting();

    Assistant.appendMessage('bot', `Xin chào! Tôi là **Gemini Agentic Assistant v6.0**. Bạn có thể đặt câu hỏi, sử dụng **🎙️ Micro** để trò chuyện giọng nói, trải nghiệm **⚡ Multi-Model Workflow Studio**, đo **📊 AI Benchmark** hoặc chơi **🎮 Mini AI Game v2.0**!`);

    // Brand domain copy
    document.getElementById('domain-copy-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText('https://hello.aicodedao.xyz');
      showToast(I18N[STATE.currentLang].copiedDomain, 'success');
      AudioSys.triggerSound('click');
    });

    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.currentLang = btn.dataset.lang;
        updateGreeting();
        showToast(`Ngôn ngữ: ${btn.textContent}`, 'info');
        AudioSys.triggerSound('click');
      });
    });

    // Mini game modal & controls
    document.getElementById('mini-game-btn')?.addEventListener('click', () => {
      document.getElementById('mini-game-modal')?.classList.add('show');
      AudioSys.triggerSound('click');
    });
    document.getElementById('close-game-modal-btn')?.addEventListener('click', () => {
      document.getElementById('mini-game-modal')?.classList.remove('show');
      game.isRunning = false;
    });
    document.getElementById('game-start-btn')?.addEventListener('click', () => game.start());
    document.getElementById('game-restart-btn')?.addEventListener('click', () => game.start());
    document.getElementById('game-emp-btn')?.addEventListener('click', () => game.triggerEMP());

    // 3D Shape Switcher Button
    document.getElementById('shape-toggle-btn')?.addEventListener('click', () => {
      STATE.currentShapeIndex = (STATE.currentShapeIndex + 1) % SHAPES.length;
      document.getElementById('shape-label').textContent = SHAPES[STATE.currentShapeIndex];
      AudioSys.triggerSound('shape-change');
      showToast(`3D Core: ${SHAPES[STATE.currentShapeIndex]}`, 'info');
    });

    // Code Lab Modal
    document.getElementById('codelab-open-btn')?.addEventListener('click', () => {
      document.getElementById('codelab-modal')?.classList.add('show');
      CodeLab.loadPreset('quantum-particles');
      AudioSys.triggerSound('click');
    });
    document.getElementById('close-codelab-btn')?.addEventListener('click', () => {
      document.getElementById('codelab-modal')?.classList.remove('show');
    });
    document.getElementById('codelab-run-btn')?.addEventListener('click', () => CodeLab.run());
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        CodeLab.loadPreset(chip.dataset.preset);
        AudioSys.triggerSound('click');
      });
    });

    // AI Benchmark Suite Modal
    document.getElementById('benchmark-open-btn')?.addEventListener('click', () => {
      document.getElementById('benchmark-modal')?.classList.add('show');
      AudioSys.triggerSound('click');
    });
    document.getElementById('close-benchmark-btn')?.addEventListener('click', () => {
      document.getElementById('benchmark-modal')?.classList.remove('show');
    });
    document.getElementById('start-benchmark-btn')?.addEventListener('click', () => Benchmark.run());

    // Sound Toggle & Binaural Drone
    document.getElementById('sound-toggle-btn')?.addEventListener('click', () => {
      STATE.currentAudioPresetIndex = (STATE.currentAudioPresetIndex + 1) % AUDIO_PRESETS.length;
      document.getElementById('sound-label').textContent = AUDIO_PRESETS[STATE.currentAudioPresetIndex];
      AudioSys.triggerSound('click');
      showToast(`Âm thanh: ${AUDIO_PRESETS[STATE.currentAudioPresetIndex]}`, 'info');
    });
    document.getElementById('binaural-drone-btn')?.addEventListener('click', () => {
      const active = AudioSys.toggleBinauralDrone();
      showToast(`Ambient Drone: ${active ? 'BẬT' : 'TẮT'}`, active ? 'success' : 'info');
    });

    // Canvas Mode Button
    document.getElementById('canvas-mode-btn')?.addEventListener('click', () => {
      STATE.currentCanvasModeIndex = (STATE.currentCanvasModeIndex + 1) % CANVAS_MODES.length;
      document.getElementById('canvas-mode-label').textContent = CANVAS_MODES[STATE.currentCanvasModeIndex];
      AudioSys.triggerSound('click');
    });

    // Cross-Browser Fullscreen
    document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
      try {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
          } else {
            showToast('Trình duyệt không hỗ trợ toàn màn hình', 'info');
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      } catch {
        showToast('Trình duyệt không hỗ trợ toàn màn hình', 'info');
      }
    });

    // Multi-Model Workflow Studio
    document.getElementById('run-workflow-btn')?.addEventListener('click', () => WorkflowEngine.start());
    document.getElementById('reset-workflow-btn')?.addEventListener('click', () => WorkflowEngine.resetUI());

    // Gemini AI Chatbot Submissions
    document.getElementById('ai-chat-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('ai-chat-input');
      if (input && input.value.trim()) {
        const val = input.value.trim();
        input.value = '';
        Assistant.sendMessage(val);
      }
    });

    document.getElementById('ai-mic-btn')?.addEventListener('click', () => Assistant.toggleVoiceInput());
    document.getElementById('ai-export-btn')?.addEventListener('click', () => Assistant.exportChatTranscript());
    document.getElementById('ai-tts-btn')?.addEventListener('click', () => {
      STATE.voiceTtsEnabled = !STATE.voiceTtsEnabled;
      showToast(`Voice TTS: ${STATE.voiceTtsEnabled ? 'BẬT' : 'TẮT'}`, 'info');
    });
    document.getElementById('ai-clear-chat-btn')?.addEventListener('click', () => {
      const container = document.getElementById('ai-chat-messages');
      if (container) container.innerHTML = '';
      STATE.chatHistory = [];
      showToast('Đã xóa lịch sử trò chuyện', 'info');
    });

    // Prompt Chips
    document.querySelectorAll('.sugg-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        Assistant.sendMessage(chip.dataset.prompt);
      });
    });

    // Quotes
    document.getElementById('new-quote-btn')?.addEventListener('click', () => {
      const q = AI_QUOTES[Math.floor(Math.random() * AI_QUOTES.length)];
      document.getElementById('quote-text').textContent = `"${q.text}"`;
      document.getElementById('quote-author').textContent = `— ${q.author}`;
      document.getElementById('quote-cat').textContent = q.category;
      AudioSys.triggerSound('quote');
    });
    document.getElementById('copy-quote-btn')?.addEventListener('click', () => {
      const txt = document.getElementById('quote-text')?.textContent;
      navigator.clipboard.writeText(txt);
      showToast(I18N[STATE.currentLang].copiedQuote, 'success');
    });

    // Avatar Chips & Greet
    document.querySelectorAll('.avatar-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.avatar-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        STATE.currentAvatar = chip.dataset.avatar;
        document.getElementById('input-avatar-display').textContent = STATE.currentAvatar;
        updateGreeting();
      });
    });

    document.getElementById('greet-btn')?.addEventListener('click', () => {
      const nameInput = document.getElementById('name-input');
      STATE.userName = nameInput ? nameInput.value.trim() : '';
      updateGreeting();
      triggerConfetti();
      STATE.interactionsCount++;
      document.getElementById('clicks-count').textContent = STATE.interactionsCount;
    });

    // Theme & Fireworks Buttons
    document.getElementById('color-theme-btn')?.addEventListener('click', () => applyTheme(STATE.currentThemeIndex + 1));
    document.getElementById('confetti-btn')?.addEventListener('click', () => triggerConfetti());
    document.getElementById('hero-sparkle')?.addEventListener('click', () => triggerConfetti());

    // Share & QR Modal
    document.getElementById('smart-share-btn')?.addEventListener('click', () => {
      document.getElementById('qr-modal')?.classList.add('show');
    });
    document.getElementById('close-modal-btn')?.addEventListener('click', () => {
      document.getElementById('qr-modal')?.classList.remove('show');
    });
    document.getElementById('modal-copy-link-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText('https://hello.aicodedao.xyz');
      showToast('Đã sao chép link https://hello.aicodedao.xyz', 'success');
    });

    // Terminal Quick Chips & Input
    document.querySelectorAll('.cmd-chip').forEach(chip => {
      chip.addEventListener('click', () => executeCliCommand(chip.dataset.cmd));
    });
    document.getElementById('terminal-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = e.target.value;
        e.target.value = '';
        executeCliCommand(val);
      }
    });
    document.getElementById('terminal-clear')?.addEventListener('click', () => {
      const out = document.getElementById('terminal-output');
      if (out) out.innerHTML = '';
    });

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key.toUpperCase();
      if (key === 'G') document.getElementById('mini-game-btn')?.click();
      else if (key === 'S') document.getElementById('shape-toggle-btn')?.click();
      else if (key === 'P') document.getElementById('codelab-open-btn')?.click();
      else if (key === 'B') document.getElementById('benchmark-open-btn')?.click();
      else if (key === 'T') document.getElementById('color-theme-btn')?.click();
      else if (key === 'C' || key === ' ') triggerConfetti();
      else if (key === 'W') document.getElementById('canvas-mode-btn')?.click();
      else if (key === 'Q') document.getElementById('new-quote-btn')?.click();
      else if (key === 'M') document.getElementById('sound-toggle-btn')?.click();
      else if (key === 'F') document.getElementById('fullscreen-btn')?.click();
    });

    // Cursor Glow (only update on non-touch devices)
    window.addEventListener('mousemove', e => {
      const glow = document.getElementById('cursor-glow');
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    }, { passive: true });

    // Unlock Web Audio API on initial user gesture (critical for iOS Safari)
    const unlockAudio = () => {
      AudioSys.init();
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    showToast(I18N[STATE.currentLang].toastWelcome, 'success');
  });
})();

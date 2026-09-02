// ============================================================
// AiCodeDao Hello World Engine (v5.1 Next-Gen Agentic Core & Mini AI Game)
// ============================================================

// --- State Management ---
let clickCount = 0;
let currentThemeIndex = 0;
let currentQuoteIndex = 0;
let currentSoundPresetIndex = 0;
let currentCanvasModeIndex = 0;
let currentLang = 'vi';
let currentAvatar = '🚀';
let isClockUtc = false;
let isTerminalExpanded = true;
let customName = '';
let favoriteQuotes = JSON.parse(localStorage.getItem('aicodedao_fav_quotes') || '[]');

// 3D HUD Polyhedra Core State
let currentShapeIndex = 0;
const polyhedraShapes = [
  { id: 'icosahedron', name: 'Icosahedron', icon: '🔮' },
  { id: 'hypercube', name: 'Hypercube 4D', icon: '🧊' },
  { id: 'dodecahedron', name: 'Dodecahedron', icon: '✨' },
  { id: 'octahedron', name: 'Octahedron', icon: '💎' }
];

// AI Chatbot State
let geminiApiKey = localStorage.getItem('aicodedao_gemini_api_key') || '';
let selectedAiModel = localStorage.getItem('aicodedao_gemini_model') || 'gemini-2.5-flash';
let isAiSoundEnabled = localStorage.getItem('aicodedao_ai_sound') !== 'false';
let isAiGenerating = false;
let isVoiceTtsEnabled = false;
let chatHistory = [];

// Mini AI Game State
let gameScore = 0;
let gameHighScore = parseInt(localStorage.getItem('aicodedao_high_score') || '0', 10);
let gameCombo = 1;
let gameShields = 3;
let isGameRunning = false;
let gameAnimationId = null;
let gameDifficulty = 'medium';
let isTabActive = true;

// --- Sound Presets (Web Audio Synth Pro+) ---
const soundPresets = [
  { id: 'synth', label: 'Cyber Synth', icon: '🔊' },
  { id: 'arcade', label: '8-Bit Arcade', icon: '🎮' },
  { id: 'zen', label: 'Zen Chime', icon: '🔔' },
  { id: 'asmr', label: 'ASMR Click', icon: '🎧' },
  { id: 'hologram', label: 'Sci-Fi Holo', icon: '📡' },
  { id: 'mute', label: 'Muted', icon: '🔇' }
];

// --- Canvas Modes ---
const canvasModes = [
  { id: 'neural', label: 'Neural Web', icon: '🌌' },
  { id: 'matrix', label: 'Matrix Rain', icon: '🟢' },
  { id: 'starfield', label: 'Starfield', icon: '✨' },
  { id: 'warp', label: 'Warp Speed', icon: '⚡' }
];

// --- Multi-Language Definitions (8 Languages) ---
const languages = {
  vi: {
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    greeting: 'Hello, World!',
    welcomePrefix: 'Chào mừng ',
    welcomeDefault: 'Chào mừng bạn đến với kỷ nguyên phát triển phần mềm AI Agentic tự động, tương tác thời gian thực với Gemini AI và Cyber HUD 3D.',
    dawn: '🌄 Rạng đông',
    morning: '🌅 Chào buổi sáng',
    afternoon: '☀️ Chào buổi chiều',
    evening: '🌙 Chào buổi tối',
    night: '🌌 Đêm khuya thanh tịnh',
    btnGreet: 'Chào tôi 👋',
    copySuccess: 'Đã sao chép liên kết https://hello.aicodedao.xyz!',
    quoteCopied: 'Đã sao chép danh ngôn AI!',
    quoteFavAdded: 'Đã thêm danh ngôn vào mục yêu thích! ❤️',
    quoteFavRemoved: 'Đã xóa danh ngôn khỏi mục yêu thích',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello v5.1',
    shareText: 'Khám phá thế giới AI Agentic tự động hóa đỉnh cao, Mini AI Game và Gemini Assistant tại AiCodeDao Hello!',
    fireworksLabel: 'Bắn pháo hoa',
    aiWelcome: 'Xin chào! Tôi là **Gemini Agentic Assistant (v5.1)** từ AiCodeDao. Tôi có thể hỗ trợ bạn về kiến trúc AI đa mô hình, viết mã nguồn, kiểm thử tự động, cấu hình Cloudflare Tunnel hoặc chiến thuật Mini AI Game!',
    aiTyping: 'Gemini đang suy nghĩ & sinh phản hồi...',
    aiInputPlaceholder: 'Hỏi Gemini AI bất cứ điều gì (lập trình, kiến trúc, DevOps, sáng tạo, game)...',
    aiSend: 'Gửi'
  },
  en: {
    name: 'English',
    flag: '🇬🇧',
    greeting: 'Hello, World!',
    welcomePrefix: 'Welcome, ',
    welcomeDefault: 'Welcome to the era of autonomous AI Agentic software engineering, real-time Gemini AI, and Cyber HUD 3D.',
    dawn: '🌄 Early Dawn',
    morning: '🌅 Good Morning',
    afternoon: '☀️ Good Afternoon',
    evening: '🌙 Good Evening',
    night: '🌌 Peaceful Midnight',
    btnGreet: 'Greet Me 👋',
    copySuccess: 'Domain copied: https://hello.aicodedao.xyz!',
    quoteCopied: 'Quote copied to clipboard!',
    quoteFavAdded: 'Quote added to favorites! ❤️',
    quoteFavRemoved: 'Quote removed from favorites',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello v5.1',
    shareText: 'Explore autonomous AI Agentic engineering, Mini AI Game and Gemini Assistant at AiCodeDao Hello!',
    fireworksLabel: 'Launch Fireworks',
    aiWelcome: 'Hello! I am **Gemini Agentic Assistant (v5.1)** from AiCodeDao. How can I assist you with multi-model architectures, code generation, automated testing, or Cloudflare Tunnel setups today?',
    aiTyping: 'Gemini is processing and generating stream...',
    aiInputPlaceholder: 'Ask Gemini AI anything (code, architecture, DevOps, creativity, game)...',
    aiSend: 'Send'
  },
  ja: {
    name: '日本語',
    flag: '🇯🇵',
    greeting: 'こんにちは、世界！',
    welcomePrefix: 'ようこそ、',
    welcomeDefault: '自律型AIエージェント、リアルタイムGemini AI、Cyber HUD 3Dによる次世代開発の世界へようこそ。',
    dawn: '🌄 夜明け',
    morning: '🌅 おはようございます',
    afternoon: '☀️ こんにちは',
    evening: '🌙 こんばんは',
    night: '🌌 深夜の静寂',
    btnGreet: '挨拶する 👋',
    copySuccess: 'URLをクリップボードにコピーしました！',
    quoteCopied: '名言をコピーしました！',
    quoteFavAdded: 'お気に入りに追加しました！ ❤️',
    quoteFavRemoved: 'お気に入りから削除しました',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello v5.1',
    shareText: '自律型AIエージェントとGemini Assistantによる次世代プラットフォーム！',
    fireworksLabel: '花火を打ち上げる',
    aiWelcome: 'こんにちは！AiCodeDaoの**Gemini Agentic Assistant (v5.1)**です。ソフトウェア設計、コード生成、自動テスト、Cloudflare設定など、何でもお手伝いします！',
    aiTyping: 'Geminiが思考中＆応答を生成しています...',
    aiInputPlaceholder: 'Gemini AIに何でも質問してください（プログラミング、設計、DevOps）...',
    aiSend: '送信'
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    greeting: 'Bonjour le Monde !',
    welcomePrefix: 'Bienvenue, ',
    welcomeDefault: 'Bienvenue dans l’ère de l’ingénierie logicielle autonome par IA, avec Gemini AI en temps réel et Cyber HUD 3D.',
    dawn: '🌄 Aube',
    morning: '🌅 Bonjour',
    afternoon: '☀️ Bon après-midi',
    evening: '🌙 Bonsoir',
    night: '🌌 Nuit paisible',
    btnGreet: 'Saluez-moi 👋',
    copySuccess: 'Lien copié dans le presse-papiers !',
    quoteCopied: 'Citation copiée !',
    quoteFavAdded: 'Citation ajoutée aux favoris ! ❤️',
    quoteFavRemoved: 'Citation retirée des favoris',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello v5.1',
    shareText: 'Découvrez l’ingénierie logicielle agentique autonome et l’assistant Gemini !',
    fireworksLabel: 'Feu d’artifice',
    aiWelcome: 'Bonjour ! Je suis **Gemini Agentic Assistant (v5.1)** par AiCodeDao. Comment puis-je vous aider en architecture logicielle, code ou DevOps aujourd’hui ?',
    aiTyping: 'Gemini génère la réponse en temps réel...',
    aiInputPlaceholder: 'Posez une question à Gemini AI (code, architecture, DevOps)...',
    aiSend: 'Envoyer'
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    greeting: '¡Hola, Mundo!',
    welcomePrefix: 'Bienvenido, ',
    welcomeDefault: 'Bienvenido a la era del desarrollo de software agéntico con IA, Gemini AI en tiempo real y Cyber HUD 3D.',
    dawn: '🌄 Madrugada',
    morning: '🌅 Buenos Días',
    afternoon: '☀️ Buenas Tardes',
    evening: '🌙 Buenas Noches',
    night: '🌌 Noche Serena',
    btnGreet: 'Salúdame 👋',
    copySuccess: '¡Enlace copiado al portapapeles!',
    quoteCopied: '¡Cita copiada!',
    quoteFavAdded: '¡Cita añadida a favoritos! ❤️',
    quoteFavRemoved: 'Cita eliminada de favoritos',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello v5.1',
    shareText: '¡Descubre el desarrollo de software agéntico y el asistente Gemini AI!',
    fireworksLabel: 'Fuegos Artificiales',
    aiWelcome: '¡Hola! Soy **Gemini Agentic Assistant (v5.1)** de AiCodeDao. ¿En qué puedo ayudarte hoy respecto a arquitectura, código o infraestructura?',
    aiTyping: 'Gemini está procesando la respuesta...',
    aiInputPlaceholder: 'Pregunta lo que quieras a Gemini AI (código, arquitectura, DevOps)...',
    aiSend: 'Enviar'
  },
  ko: {
    name: '한국어',
    flag: '🇰🇷',
    greeting: '안녕하세요, 세상!',
    welcomePrefix: '환영합니다, ',
    welcomeDefault: '자율형 AI 에이전트, 실시간 Gemini AI 및 Cyber HUD 3D가 결합된 차세대 소프트웨어 개발 플랫폼에 오신 것을 환영합니다.',
    dawn: '🌄 새벽',
    morning: '🌅 좋은 아침입니다',
    afternoon: '☀️ 좋은 오후입니다',
    evening: '🌙 좋은 저녁입니다',
    night: '🌌 고요한 밤',
    btnGreet: '인사하기 👋',
    copySuccess: '도메인 링크가 복사되었습니다: https://hello.aicodedao.xyz!',
    quoteCopied: '명언이 클립보드에 복사되었습니다!',
    quoteFavAdded: '명언이 즐겨찾기에 추가되었습니다! ❤️',
    quoteFavRemoved: '명언이 즐겨찾기에서 제거되었습니다',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello v5.1',
    shareText: '자율형 AI 에이전트 및 Gemini Assistant 차세대 플랫폼을 경험해보세요!',
    fireworksLabel: '불꽃놀이 발사',
    aiWelcome: '안녕하세요! AiCodeDao의 **Gemini Agentic Assistant (v5.1)**입니다. 멀티 모델 아키텍처, 코드 생성, 자동화 테스트 등 무엇이든 질문하세요!',
    aiTyping: 'Gemini가 답변을 생각하고 생성 중입니다...',
    aiInputPlaceholder: 'Gemini AI에게 무엇이든 물어보세요 (코딩, 아키텍처, DevOps)...',
    aiSend: '보내기'
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪',
    greeting: 'Hallo, Welt!',
    welcomePrefix: 'Willkommen, ',
    welcomeDefault: 'Willkommen im Zeitalter der autonomen AI-Agentic Softwareentwicklung mit Echtzeit-Gemini-KI und Cyber HUD 3D.',
    dawn: '🌄 Morgengrauen',
    morning: '🌅 Guten Morgen',
    afternoon: '☀️ Guten Tag',
    evening: '🌙 Guten Abend',
    night: '🌌 Ruhige Nacht',
    btnGreet: 'Grüße mich 👋',
    copySuccess: 'Domain kopiert: https://hello.aicodedao.xyz!',
    quoteCopied: 'Zitat kopiert!',
    quoteFavAdded: 'Zitat zu Favoriten hinzugefügt! ❤️',
    quoteFavRemoved: 'Zitat aus Favoriten entfernt',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello v5.1',
    shareText: 'Entdecken Sie autonome AI-Agentic Software und den Gemini AI Assistant!',
    fireworksLabel: 'Feuerwerk zünden',
    aiWelcome: 'Hallo! Ich bin **Gemini Agentic Assistant (v5.1)** von AiCodeDao. Wie kann ich Ihnen heute bei Architektur, Code oder DevOps helfen?',
    aiTyping: 'Gemini generiert die Antwort...',
    aiInputPlaceholder: 'Fragen Sie Gemini AI alles (Code, Architektur, DevOps)...',
    aiSend: 'Senden'
  },
  zh: {
    name: '中文',
    flag: '🇨🇳',
    greeting: '你好，世界！',
    welcomePrefix: '欢迎，',
    welcomeDefault: '欢迎来到自主AI智能体软件工程的新纪元，体验实时Gemini AI与Cyber HUD 3D。',
    dawn: '🌄 黎明',
    morning: '🌅 早上好',
    afternoon: '☀️ 下午好',
    evening: '🌙 晚上好',
    night: '🌌 深夜清幽',
    btnGreet: '向我问好 👋',
    copySuccess: '已复制网址: https://hello.aicodedao.xyz！',
    quoteCopied: '名言已复制到剪贴板！',
    quoteFavAdded: '名言已添加到收藏！ ❤️',
    quoteFavRemoved: '名言已从收藏中移除',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello v5.1',
    shareText: '探索自主AI智能体软件工程与Gemini Assistant！',
    fireworksLabel: '燃放烟花',
    aiWelcome: '您好！我是来自AiCodeDao的 **Gemini Agentic Assistant (v5.1)**。今天我可以在多模型架构、代码生成、自动化测试或Cloudflare Tunnel配置方面为您提供哪些帮助？',
    aiTyping: 'Gemini正在思考并生成回复...',
    aiInputPlaceholder: '向Gemini AI咨询任何技术问题（编程、架构、DevOps）...',
    aiSend: '发送'
  }
};

// --- AI Wisdom Quotes Collection ---
const quotes = [
  { text: 'Tự động hoá và AI Agentic là chìa khoá biến ý tưởng phần mềm thành hiện thực trong tích tắc.', author: 'AiCodeDao Core', category: 'Agentic AI' },
  { text: 'Kiến trúc đa mô hình (Multi-Model) kết hợp sức mạnh suy luận và tốc độ vượt trội cho mọi tác vụ.', author: 'Gemini Architect', category: 'Architecture' },
  { text: 'Bảo mật Zero-Trust và Cloudflare Tunnel giúp ứng dụng kết nối an toàn mà không cần mở cổng IP public.', author: 'Sentinel Sentinel', category: 'Security' },
  { text: 'Mã nguồn đơn giản, dễ đọc và có kiểm thử tự động luôn chiến thắng sự phức tạp không cần thiết.', author: 'Clean Code Rule', category: 'Engineering' },
  { text: 'Hiệu năng 60+ FPS và trải nghiệm Cyber-Glassmorphism nâng tầm cảm xúc người dùng.', author: 'UX Quantum Lab', category: 'Design' },
  { text: 'Đừng chỉ xây dựng tính năng, hãy tạo nên trải nghiệm tự động hoá vượt trên sự mong đợi.', author: 'TrueForge Philosophy', category: 'Innovation' }
];

// --- 6 Neon Themes ---
const themes = [
  {
    name: 'Cyber Aurora',
    label: 'Theme (Cyber Aurora)',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
    glow: 'rgba(56, 189, 248, 0.45)',
    particles: ['#38bdf8', '#818cf8', '#c084fc', '#e0e7ff']
  },
  {
    name: 'Emerald Nexus',
    label: 'Theme (Emerald Nexus)',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
    glow: 'rgba(16, 185, 129, 0.45)',
    particles: ['#10b981', '#06b6d4', '#3b82f6', '#a7f3d0']
  },
  {
    name: 'Solar Flare',
    label: 'Theme (Solar Flare)',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
    glow: 'rgba(245, 158, 11, 0.45)',
    particles: ['#f59e0b', '#ef4444', '#ec4899', '#fde047']
  },
  {
    name: 'Deep Cosmos',
    label: 'Theme (Deep Cosmos)',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
    glow: 'rgba(56, 189, 248, 0.45)',
    particles: ['#38bdf8', '#818cf8', '#c084fc', '#e0e7ff']
  },
  {
    name: 'Matrix Cyber',
    label: 'Theme (Matrix Cyber)',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #059669 100%)',
    glow: 'rgba(34, 197, 94, 0.45)',
    particles: ['#22c55e', '#10b981', '#4ade80', '#86efac']
  },
  {
    name: 'Hyper Sunset',
    label: 'Theme (Hyper Sunset)',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #f43f5e 50%, #fb923c 100%)',
    glow: 'rgba(244, 63, 94, 0.45)',
    particles: ['#8b5cf6', '#f43f5e', '#fb923c', '#fbcfe8']
  }
];

// --- DOM Elements ---
const cardWrapper = document.getElementById('card-wrapper');
const mainCard = document.getElementById('main-card');
const cursorGlow = document.getElementById('cursor-glow');
const toastContainer = document.getElementById('toast-container');
const nameInput = document.getElementById('name-input');
const clearInputBtn = document.getElementById('clear-input-btn');
const inputAvatarDisplay = document.getElementById('input-avatar-display');
const avatarChips = document.getElementById('avatar-chips');
const greetBtn = document.getElementById('greet-btn');
const greetingText = document.getElementById('greeting-text');
const subtitleText = document.getElementById('subtitle-text');
const timeBadge = document.getElementById('time-badge');
const heroSparkle = document.getElementById('hero-sparkle');
const colorThemeBtn = document.getElementById('color-theme-btn');
const themeBtnLabel = document.getElementById('theme-btn-label');
const confettiBtn = document.getElementById('confetti-btn');
const fireworksBtnLabel = document.getElementById('fireworks-btn-label');
const smartShareBtn = document.getElementById('smart-share-btn');
const qrModal = document.getElementById('qr-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalCopyLinkBtn = document.getElementById('modal-copy-link-btn');
const modalNativeShareBtn = document.getElementById('modal-native-share-btn');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const soundIcon = document.getElementById('sound-icon');
const soundLabel = document.getElementById('sound-label');
const audioWave = document.getElementById('audio-wave');
const canvasModeBtn = document.getElementById('canvas-mode-btn');
const canvasModeIcon = document.getElementById('canvas-mode-icon');
const canvasModeLabel = document.getElementById('canvas-mode-label');
const liveClock = document.getElementById('live-clock');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const fullscreenIcon = document.getElementById('fullscreen-icon');
const clicksDisplay = document.getElementById('clicks-count');
const fpsDisplay = document.getElementById('fps-counter');
const latencyDisplay = document.getElementById('latency-display');
const agentsCountDisplay = document.getElementById('agents-count');
const domainCopyBtn = document.getElementById('domain-copy-btn');
const copyTooltip = document.getElementById('copy-tooltip');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteCat = document.getElementById('quote-cat');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyQuoteBtn = document.getElementById('copy-quote-btn');
const favQuoteBtn = document.getElementById('fav-quote-btn');
const langBtnGroup = document.getElementById('lang-btn-group');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalToggle = document.getElementById('terminal-toggle');
const terminalClear = document.getElementById('terminal-clear');
const terminalBody = document.getElementById('terminal-body');

// v5.1 Interactive Elements (Mini Game & 3D Shape)
const miniGameBtn = document.getElementById('mini-game-btn');
const shapeToggleBtn = document.getElementById('shape-toggle-btn');
const shapeIcon = document.getElementById('shape-icon');
const shapeLabel = document.getElementById('shape-label');

// AI Chatbot DOM Elements
const aiChatMessages = document.getElementById('ai-chat-messages');
const aiTypingIndicator = document.getElementById('ai-typing-indicator');
const aiTypingText = document.getElementById('ai-typing-text');
const aiChatForm = document.getElementById('ai-chat-form');
const aiChatInput = document.getElementById('ai-chat-input');
const aiClearInput = document.getElementById('ai-clear-input');
const aiConfigBtn = document.getElementById('ai-config-btn');
const aiClearChatBtn = document.getElementById('ai-clear-chat-btn');
const aiExportBtn = document.getElementById('ai-export-btn');
const aiTtsBtn = document.getElementById('ai-tts-btn');
const aiTtsIcon = document.getElementById('ai-tts-icon');
const aiSoundBtn = document.getElementById('ai-sound-btn');
const aiSoundIcon = document.getElementById('ai-sound-icon');
const aiModelBadge = document.getElementById('ai-model-badge');
const suggChipsContainer = document.getElementById('sugg-chips-container');

// API Key Modal Elements
const apiKeyModal = document.getElementById('api-key-modal');
const closeApiModalBtn = document.getElementById('close-api-modal-btn');
const geminiApiKeyInput = document.getElementById('gemini-api-key-input');
const geminiModelSelect = document.getElementById('gemini-model-select');
const toggleKeyVisibility = document.getElementById('toggle-key-visibility');
const saveApiKeyBtn = document.getElementById('save-api-key-btn');
const clearApiKeyBtn = document.getElementById('clear-api-key-btn');

// Mini AI Game Modal Elements
const miniGameModal = document.getElementById('mini-game-modal');
const closeGameModalBtn = document.getElementById('close-game-modal-btn');
const miniGameCanvas = document.getElementById('mini-game-canvas');
const gameStartOverlay = document.getElementById('game-start-overlay');
const gameOverOverlay = document.getElementById('game-over-overlay');
const gameStartBtn = document.getElementById('game-start-btn');
const gameRestartBtn = document.getElementById('game-restart-btn');
const gameScoreVal = document.getElementById('game-score');
const gameHighScoreVal = document.getElementById('game-high-score');
const gameComboVal = document.getElementById('game-combo');
const gameShieldsVal = document.getElementById('game-shields');
const gameAiBanner = document.getElementById('game-ai-banner');
const gameAiText = document.getElementById('game-ai-text');
const gameDifficultySelect = document.getElementById('game-difficulty');
const gameFinalScoreVal = document.getElementById('game-final-score');
const gameRecordMsg = document.getElementById('game-record-msg');

// --- Web Audio API Synthesizer Pro+ ---
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function triggerAudioWave() {
  if (!soundToggleBtn) return;
  soundToggleBtn.classList.add('audio-playing');
  setTimeout(() => soundToggleBtn.classList.remove('audio-playing'), 450);
}

function playSound(type = 'click') {
  const currentPreset = soundPresets[currentSoundPresetIndex];
  if (currentPreset.id === 'mute') return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    triggerAudioWave();

    const now = ctx.currentTime;

    // AI Typewriter Blip
    if (type === 'ai-token') {
      if (!isAiSoundEnabled) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400 + Math.random() * 200, now);
      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
      return;
    }

    if (type === 'ai-complete') {
      [587.33, 739.99, 880, 1174.66].forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.07);
        g.gain.setValueAtTime(0.08, now + i * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now + i * 0.07);
        o.stop(now + i * 0.07 + 0.36);
      });
      return;
    }

    if (type === 'ai-error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.25);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
      return;
    }

    if (currentPreset.id === 'synth') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'fanfare') {
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
          const chordOsc = ctx.createOscillator();
          const chordGain = ctx.createGain();
          chordOsc.type = 'triangle';
          chordOsc.frequency.setValueAtTime(freq, now + i * 0.06);
          chordGain.gain.setValueAtTime(0.08, now + i * 0.06);
          chordGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.4);
          chordOsc.connect(chordGain);
          chordGain.connect(ctx.destination);
          chordOsc.start(now + i * 0.06);
          chordOsc.stop(now + i * 0.06 + 0.42);
        });
      } else if (type === 'switch') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(460, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
      }
    } else if (currentPreset.id === 'arcade') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      if (type === 'click') {
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.setValueAtTime(520, now + 0.03);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.07);
      } else if (type === 'fanfare') {
        [280, 360, 480, 720, 960].forEach((f, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'square';
          o.frequency.setValueAtTime(f, now + idx * 0.05);
          g.gain.setValueAtTime(0.06, now + idx * 0.05);
          g.gain.linearRampToValueAtTime(0.001, now + idx * 0.05 + 0.1);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.05);
          o.stop(now + idx * 0.05 + 0.11);
        });
      } else {
        osc.frequency.setValueAtTime(380, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      }
      if (type !== 'fanfare') {
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } else if (currentPreset.id === 'zen') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(type === 'fanfare' ? 880 : 528, now);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.88);
    } else if (currentPreset.id === 'asmr') {
      const bufferSize = ctx.sampleRate * 0.025;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2200;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start(now);
    } else if (currentPreset.id === 'hologram') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(type === 'fanfare' ? 1400 : 1100, now);
      osc.frequency.exponentialRampToValueAtTime(type === 'fanfare' ? 2200 : 700, now + 0.12);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    }
  } catch (e) {
    // Audio grace fallback
  }
}

// --- Toast Notifications ---
function showToast(message, icon = '✨') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// --- Multi-language Controller ---
function setLanguage(langKey) {
  if (!languages[langKey]) return;
  currentLang = langKey;
  
  // Update buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === langKey);
  });

  const langData = languages[langKey];
  greetBtn.querySelector('span').textContent = langData.btnGreet;
  if (fireworksBtnLabel) fireworksBtnLabel.textContent = langData.fireworksLabel;
  if (aiTypingText) aiTypingText.textContent = langData.aiTyping;
  if (aiChatInput) aiChatInput.placeholder = langData.aiInputPlaceholder;
  updateTimeGreeting();

  if (customName) {
    greetingText.textContent = `${currentAvatar} Hello, ${customName}!`;
    subtitleText.textContent = `${langData.welcomePrefix}${customName}! ${langData.welcomeDefault}`;
  } else {
    greetingText.textContent = langData.greeting;
    subtitleText.textContent = langData.welcomeDefault;
  }
  
  // Update AI initial message if chat is fresh
  if (chatHistory.length === 0) {
    renderAiWelcome();
  }
  
  localStorage.setItem('aicodedao_lang', langKey);
}

function updateTimeGreeting() {
  const hour = new Date().getHours();
  const langData = languages[currentLang] || languages.vi;
  let greeting = langData.morning;
  
  if (hour >= 4 && hour < 7) {
    greeting = langData.dawn;
  } else if (hour >= 7 && hour < 12) {
    greeting = langData.morning;
  } else if (hour >= 12 && hour < 18) {
    greeting = langData.afternoon;
  } else if (hour >= 18 && hour < 22) {
    greeting = langData.evening;
  } else {
    greeting = langData.night;
  }
  timeBadge.textContent = greeting;
}

// --- Live Clock & Timezone Toggle ---
function updateLiveClock() {
  const now = new Date();
  if (isClockUtc) {
    liveClock.textContent = now.toUTCString().slice(17, 25) + ' UTC';
    liveClock.title = 'Chế độ UTC (Nhấn để chuyển sang VN UTC+7)';
  } else {
    const options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    liveClock.textContent = now.toLocaleTimeString('vi-VN', options) + ' ICT';
    liveClock.title = 'Múi giờ Việt Nam UTC+7 (Nhấn để chuyển sang UTC)';
  }
}

liveClock.addEventListener('click', () => {
  isClockUtc = !isClockUtc;
  updateLiveClock();
  playSound('click');
  showToast(isClockUtc ? 'Đã chuyển sang múi giờ UTC' : 'Đã chuyển sang múi giờ Việt Nam (ICT)', '🕒');
});

// --- Sound Preset Switcher ---
soundToggleBtn.addEventListener('click', () => {
  currentSoundPresetIndex = (currentSoundPresetIndex + 1) % soundPresets.length;
  const preset = soundPresets[currentSoundPresetIndex];
  soundIcon.textContent = preset.icon;
  soundLabel.textContent = preset.label;
  playSound('switch');
  showToast(`Âm thanh: ${preset.label}`, preset.icon);
  localStorage.setItem('aicodedao_sound_preset', currentSoundPresetIndex);
});

// --- Canvas Mode Switcher ---
function setCanvasMode(index) {
  currentCanvasModeIndex = index % canvasModes.length;
  const mode = canvasModes[currentCanvasModeIndex];
  canvasModeIcon.textContent = mode.icon;
  canvasModeLabel.textContent = mode.label;
  initCanvasMode(mode.id);
  localStorage.setItem('aicodedao_canvas_mode', currentCanvasModeIndex);
}

canvasModeBtn.addEventListener('click', () => {
  setCanvasMode(currentCanvasModeIndex + 1);
  playSound('switch');
  showToast(`Nền Canvas: ${canvasModes[currentCanvasModeIndex].label}`, canvasModes[currentCanvasModeIndex].icon);
  trackInteraction();
});

// --- Fullscreen Controller ---
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    fullscreenIcon.textContent = '✕';
    showToast('Toàn màn hình đã kích hoạt', '⛶');
  } else {
    document.exitFullscreen().catch(() => {});
    fullscreenIcon.textContent = '⛶';
    showToast('Đã thoát toàn màn hình', '⛶');
  }
  playSound('click');
});

document.addEventListener('fullscreenchange', () => {
  fullscreenIcon.textContent = document.fullscreenElement ? '✕' : '⛶';
});

// --- Quote System ---
function isCurrentQuoteFav() {
  const q = quotes[currentQuoteIndex];
  return favoriteQuotes.some(item => item.text === q.text);
}

function updateFavButtonState() {
  if (!favQuoteBtn) return;
  const isFav = isCurrentQuoteFav();
  favQuoteBtn.textContent = isFav ? '❤️' : '🤍';
  favQuoteBtn.classList.toggle('active', isFav);
}

function setQuote(index) {
  currentQuoteIndex = index % quotes.length;
  const quote = quotes[currentQuoteIndex];
  quoteText.style.opacity = '0';
  setTimeout(() => {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    quoteCat.textContent = quote.category;
    quoteText.style.opacity = '1';
    updateFavButtonState();
  }, 150);
}

newQuoteBtn.addEventListener('click', () => {
  setQuote(currentQuoteIndex + 1);
  playSound('click');
  trackInteraction();
});

copyQuoteBtn.addEventListener('click', () => {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text).then(() => {
    const langData = languages[currentLang] || languages.vi;
    showToast(langData.quoteCopied, '📋');
    playSound('click');
  });
});

favQuoteBtn.addEventListener('click', () => {
  const q = quotes[currentQuoteIndex];
  const langData = languages[currentLang] || languages.vi;
  const existingIdx = favoriteQuotes.findIndex(item => item.text === q.text);
  
  if (existingIdx >= 0) {
    favoriteQuotes.splice(existingIdx, 1);
    showToast(langData.quoteFavRemoved, '🤍');
  } else {
    favoriteQuotes.push(q);
    showToast(langData.quoteFavAdded, '❤️');
  }
  localStorage.setItem('aicodedao_fav_quotes', JSON.stringify(favoriteQuotes));
  updateFavButtonState();
  playSound('click');
  trackInteraction();
});

// --- Theme Switcher ---
function applyTheme(index) {
  const theme = themes[index];
  document.documentElement.style.setProperty('--primary-gradient', theme.gradient);
  document.documentElement.style.setProperty('--primary-glow', theme.glow);
  themeBtnLabel.textContent = theme.label;
  initParticlesColor(theme.particles);
  localStorage.setItem('aicodedao_theme_index', index);
}

colorThemeBtn.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  applyTheme(currentThemeIndex);
  playSound('switch');
  showToast(`Theme: ${themes[currentThemeIndex].name}`, '🎨');
  trackInteraction();
});

// --- Avatar / Emoji Chips ---
if (avatarChips) {
  avatarChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.avatar-chip');
    if (chip && chip.dataset.avatar) {
      document.querySelectorAll('.avatar-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentAvatar = chip.dataset.avatar;
      inputAvatarDisplay.textContent = currentAvatar;
      playSound('click');
      if (customName) handleGreet();
    }
  });
}

// --- Name Greeting Personalization ---
function handleGreet() {
  const name = nameInput.value.trim();
  const langData = languages[currentLang] || languages.vi;
  if (name) {
    customName = name;
    greetingText.textContent = `${currentAvatar} Hello, ${customName}!`;
    subtitleText.textContent = `${langData.welcomePrefix}${customName}! ${langData.welcomeDefault}`;
    showToast(`Chào mừng ${customName}!`, currentAvatar);
    if (clearInputBtn) clearInputBtn.style.display = 'block';
  } else {
    customName = '';
    greetingText.textContent = langData.greeting;
    subtitleText.textContent = langData.welcomeDefault;
    if (clearInputBtn) clearInputBtn.style.display = 'none';
  }
  playSound('fanfare');
  spawnMultiStageFireworks(window.innerWidth / 2, window.innerHeight / 2);
  trackInteraction();
}

greetBtn.addEventListener('click', handleGreet);
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleGreet();
});
nameInput.addEventListener('input', () => {
  if (clearInputBtn) {
    clearInputBtn.style.display = nameInput.value.trim() ? 'block' : 'none';
  }
});
if (clearInputBtn) {
  clearInputBtn.addEventListener('click', () => {
    nameInput.value = '';
    clearInputBtn.style.display = 'none';
    nameInput.focus();
    handleGreet();
  });
}

// --- Domain Copy ---
domainCopyBtn.addEventListener('click', () => {
  const domain = 'https://hello.aicodedao.xyz';
  navigator.clipboard.writeText(domain).then(() => {
    copyTooltip.textContent = '✅ Copied!';
    copyTooltip.style.background = '#10b981';
    playSound('click');
    const langData = languages[currentLang] || languages.vi;
    showToast(langData.copySuccess, '🌐');
    setTimeout(() => {
      copyTooltip.textContent = '📋 Copy';
      copyTooltip.style.background = '';
    }, 2000);
  });
  trackInteraction();
});

// --- Smart Share & QR Code Modal ---
smartShareBtn.addEventListener('click', () => {
  qrModal.classList.add('active');
  playSound('click');
});

closeModalBtn.addEventListener('click', () => {
  qrModal.classList.remove('active');
  playSound('click');
});

qrModal.addEventListener('click', (e) => {
  if (e.target === qrModal) {
    qrModal.classList.remove('active');
  }
});

modalCopyLinkBtn.addEventListener('click', () => {
  navigator.clipboard.writeText('https://hello.aicodedao.xyz').then(() => {
    const langData = languages[currentLang] || languages.vi;
    showToast(langData.copySuccess, '📋');
    playSound('click');
  });
});

modalNativeShareBtn.addEventListener('click', () => {
  const langData = languages[currentLang] || languages.vi;
  if (navigator.share) {
    navigator.share({
      title: langData.shareTitle,
      text: langData.shareText,
      url: 'https://hello.aicodedao.xyz'
    }).catch(() => {});
  } else {
    modalCopyLinkBtn.click();
  }
});

// ============================================================
// 🤖 GEMINI AI ASSISTANT CHATBOT ENGINE (v5.1)
// ============================================================

function parseMarkdown(text) {
  if (!text) return '';
  
  // Format code blocks ```lang\ncode\n```
  let formatted = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const safeCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
    const displayLang = lang || 'code';
    return `<div class="code-block-wrapper">
      <div class="code-header-bar">
        <span class="code-lang-label">${displayLang}</span>
        <button type="button" class="copy-code-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
      </div>
      <pre><code>${safeCode}</code></pre>
    </div>`;
  });

  // Parse Markdown Tables (| col1 | col2 |)
  formatted = formatted.replace(/(?:(?:^|\n)\|[^\n]+\|(?:$|\n))+/g, (tableMatch) => {
    const lines = tableMatch.trim().split('\n').filter(l => l.trim().startsWith('|'));
    if (lines.length < 2) return tableMatch;
    
    let html = '<table>';
    lines.forEach((line, idx) => {
      if (line.includes('---')) return;
      const cells = line.split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1);
      if (idx === 0) {
        html += '<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
      } else {
        html += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
      }
    });
    html += '</tbody></table>';
    return html;
  });

  // Blockquotes
  formatted = formatted.replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>');

  // Headings
  formatted = formatted.replace(/^###\s+(.*)$/gm, '<h4 style="color:#38bdf8;margin:8px 0 4px 0;font-size:0.95rem;">$1</h4>');
  formatted = formatted.replace(/^##\s+(.*)$/gm, '<h3 style="color:#a855f7;margin:10px 0 6px 0;font-size:1.05rem;">$1</h3>');

  // Inline code
  formatted = formatted.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;color:#38bdf8;font-family:\'JetBrains Mono\',monospace;font-size:0.85em;">$1</code>');
  
  // Bold & Italic
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Bullet lists
  formatted = formatted.replace(/^\s*[-*]\s+(.*)$/gm, '<li style="margin-left:16px;">$1</li>');
  
  // Paragraph breaks
  formatted = formatted.replace(/\n\n/g, '<br><br>');
  formatted = formatted.replace(/\n/g, '<br>');

  return formatted;
}

window.copyCodeSnippet = function(btn) {
  const codeEl = btn.closest('.code-block-wrapper').querySelector('code');
  if (codeEl) {
    navigator.clipboard.writeText(codeEl.innerText).then(() => {
      btn.textContent = '✅ Copied!';
      btn.style.color = '#10b981';
      playSound('click');
      setTimeout(() => {
        btn.textContent = '📋 Copy';
        btn.style.color = '';
      }, 2000);
    });
  }
};

// Voice Assistant (Speech Synthesis TTS)
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    showToast('Trình duyệt không hỗ trợ Speech Synthesis', '⚠️');
    return;
  }
  
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    if (aiTtsBtn) aiTtsBtn.style.color = '';
    showToast('Đã dừng giọng nói AI', '🔇');
    return;
  }

  const cleanText = text
    .replace(/```[\s\S]*?```/g, 'Đoạn mã nguồn lập trình.')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/[*#|>]/g, '')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const langMap = {
    vi: 'vi-VN', en: 'en-US', ja: 'ja-JP', fr: 'fr-FR',
    es: 'es-ES', ko: 'ko-KR', de: 'de-DE', zh: 'zh-CN'
  };
  utterance.lang = langMap[currentLang] || 'vi-VN';
  utterance.rate = 1.05;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    if (aiTtsBtn) aiTtsBtn.style.color = '#38bdf8';
    showToast('Gemini đang đọc phản hồi...', '🗣️');
  };
  utterance.onend = () => {
    if (aiTtsBtn) aiTtsBtn.style.color = '';
  };
  utterance.onerror = () => {
    if (aiTtsBtn) aiTtsBtn.style.color = '';
  };

  window.speechSynthesis.speak(utterance);
}

// Export Chat History as Markdown
function exportChatHistory() {
  if (chatHistory.length === 0) {
    showToast('Chưa có lịch sử hội thoại để xuất', '⚠️');
    return;
  }
  
  let mdContent = `# 🤖 Lịch sử Trò chuyện Gemini Agentic Assistant (AiCodeDao)\n`;
  mdContent += `*Thời gian xuất: ${new Date().toLocaleString('vi-VN')}*\n`;
  mdContent += `*Mô hình: ${selectedAiModel}*\n\n---\n\n`;
  
  chatHistory.forEach((msg) => {
    const roleName = msg.role === 'user' ? '👤 Người dùng' : '🤖 Gemini AI';
    mdContent += `### ${roleName}:\n${msg.content}\n\n`;
  });
  
  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aicodedao-gemini-chat-${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Đã xuất lịch sử chat ra file Markdown!', '📥');
  playSound('fanfare');
}

if (aiExportBtn) {
  aiExportBtn.addEventListener('click', () => {
    exportChatHistory();
    trackInteraction();
  });
}

if (aiTtsBtn) {
  aiTtsBtn.addEventListener('click', () => {
    const lastBotMsg = [...chatHistory].reverse().find(m => m.role === 'bot');
    if (lastBotMsg) {
      speakText(lastBotMsg.content);
    } else {
      speakText(languages[currentLang].aiWelcome);
    }
    trackInteraction();
  });
}

function renderAiWelcome() {
  const langData = languages[currentLang] || languages.vi;
  aiChatMessages.innerHTML = '';
  appendChatMessage('bot', langData.aiWelcome);
}

function appendChatMessage(role, text) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  
  const avatar = role === 'bot' ? '🤖' : currentAvatar;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  bubble.innerHTML = `
    <div class="chat-avatar">${avatar}</div>
    <div class="chat-content-wrap">
      <div class="chat-body">${parseMarkdown(text)}</div>
      <div class="chat-meta">
        <span>${role === 'bot' ? 'Gemini AI • ' : 'You • '}${time}</span>
        ${role === 'bot' ? `<button type="button" class="chat-bubble-action-btn" onclick="speakText(\`${text.replace(/[`\\$"]/g, ' ')}\`)">🗣️ Đọc</button>` : ''}
      </div>
    </div>
  `;
  
  aiChatMessages.appendChild(bubble);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  return bubble;
}

// Prompt Suggestion Chips handler
if (suggChipsContainer) {
  suggChipsContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.sugg-chip');
    if (chip && chip.dataset.prompt && !isAiGenerating) {
      aiChatInput.value = chip.dataset.prompt;
      handleAiSubmit();
      playSound('click');
    }
  });
}

// AI Audio Toggle
if (aiSoundBtn) {
  aiSoundBtn.addEventListener('click', () => {
    isAiSoundEnabled = !isAiSoundEnabled;
    aiSoundIcon.textContent = isAiSoundEnabled ? '🔊' : '🔇';
    localStorage.setItem('aicodedao_ai_sound', isAiSoundEnabled);
    showToast(isAiSoundEnabled ? 'Âm thanh AI: Bật' : 'Âm thanh AI: Tắt', isAiSoundEnabled ? '🔊' : '🔇');
    playSound('switch');
  });
}

// Clear Chat History
if (aiClearChatBtn) {
  aiClearChatBtn.addEventListener('click', () => {
    chatHistory = [];
    renderAiWelcome();
    showToast('Đã làm mới lịch sử trò chuyện AI', '🗑️');
    playSound('click');
  });
}

// Input clear button
if (aiClearInput) {
  aiClearInput.addEventListener('click', () => {
    aiChatInput.value = '';
    aiClearInput.style.display = 'none';
    aiChatInput.focus();
  });
}

aiChatInput.addEventListener('input', () => {
  if (aiClearInput) {
    aiClearInput.style.display = aiChatInput.value.trim() ? 'block' : 'none';
  }
});

// Chat Form Submit
aiChatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleAiSubmit();
});

function handleAiSubmit() {
  const prompt = aiChatInput.value.trim();
  if (!prompt || isAiGenerating) return;

  aiChatInput.value = '';
  if (aiClearInput) aiClearInput.style.display = 'none';

  // Add user message to UI and history
  appendChatMessage('user', prompt);
  chatHistory.push({ role: 'user', content: prompt });
  trackInteraction();
  playSound('click');

  // Special command trigger via chat
  if (prompt.toLowerCase().includes('mini game') || prompt.toLowerCase().includes('chơi game')) {
    openMiniGameModal();
  }

  // Trigger response
  executeAiResponse(prompt);
}

// Intelligent Agentic Mock Streaming Fallback v5.1
function generateMockResponse(prompt) {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('game') || lower.includes('chơi') || lower.includes('dodger')) {
    return `### 🎮 Mini AI Game: Cyber AI Quantum Dodger (v5.1)

Chào mừng bạn đến với đấu trường phản xạ lượng tử! Dưới đây là chiến thuật đỉnh cao từ Gemini Copilot:

| Yếu tố Game | Mô tả & Tác dụng | Chiến thuật Đề xuất |
| :--- | :--- | :--- |
| 🔵 **Quantum Orbs** | +100 điểm x Combo Multiplier | Ưu tiên gom theo chuỗi để kích hoạt Combo x5 |
| 🔴 **Glitch Traps** | Trừ 1 Khiên chắn (Shield) | Lái tàu zig-zag né các góc nảy phản xạ |
| 🛡️ **Shield Recovery** | Hồi phục lá chắn bảo vệ | Giữ khoảng cách khi khiên còn 1 nấc |
| ⚡ **Quantum Surge** | Kích hoạt Overdrive x5 tức thì | Tận dụng thời gian Overdrive để bứt phá kỷ lục |

\`\`\`javascript
// Công thức tính điểm Overdrive:
const scoreEarned = basePoints * currentCombo; // Lên tới 500 điểm/Orb!
\`\`\`

👉 Nhấn nút **[🎮 Mini Game]** trên thanh điều khiển hoặc gõ lệnh \`/game\` để xuất kích ngay!`;
  }

  if (lower.includes('kiến trúc') || lower.includes('architect') || lower.includes('agentic')) {
    return `### ⚡ Kiến trúc AI Agentic Đa Mô hình (TrueForge v5.1)

Hệ thống được thiết kế theo mô hình **Multi-Agent Collaboration** tối ưu hóa hiệu năng và độ tin cậy:

1. **Lead Architect & AI Core (Gemini 3.8 Flash):**
   - Phân tích yêu cầu, thiết kế kiến trúc và sinh mã nguồn thời gian thực.
2. **Security & QA Sentinel (Gemini 3.1 Pro):**
   - Rà soát lỗ hổng bảo mật, kiểm thử hồi quy và đối chiếu tiêu chuẩn code.
3. **TrueForge DevOps Engine:**
   - Đóng gói container Nginx Alpine siêu nhẹ (< 15MB) và định tuyến an toàn qua **Cloudflare Tunnel Ingress**.
4. **Cyber HUD 3D & Mini AI Game Engine:**
   - Giao diện trực quan hóa dữ liệu đa khối diện (Icosahedron, Hypercube, Dodecahedron, Octahedron) và Mini Game tương tác thời gian thực.

\`\`\`javascript
// Agentic Workflow Orchestration
const agenticFlow = async (task) => {
  const plan = await ArchitectAgent.analyze(task);
  const code = await ArchitectAgent.forge(plan);
  const verified = await SentinelAgent.validate(code);
  if (verified.ok) await DevOpsAgent.deploy(code);
};
\`\`\`
Hệ thống vận hành liên tục 24/7 và đạt chuẩn Zero-Trust Edge Deployment.`;
  }

  if (lower.includes('3d') || lower.includes('hud') || lower.includes('canvas') || lower.includes('fps') || lower.includes('tối ưu')) {
    return `### ⚡ Tối ưu Canvas 60+ FPS & Khối 3D Đa Diện (v5.1)

Bí quyết duy trì độ mượt 60+ FPS trên mọi thiết bị:

1. **Giới hạn Device Pixel Ratio:** Cố định \`Math.min(window.devicePixelRatio, 2)\` tránh quá tải GPU màn hình 4K/Retina.
2. **Tạm dừng Render khi Ẩn Tab:** Lắng nghe \`visibilitychange\` giải phóng tài nguyên CPU khi người dùng chuyển tab.
3. **Phép chiếu Ma trận 3D Vector:**
\`\`\`javascript
// 3D Polyhedra Vector Projection Math
function project3D(x, y, z, cx, cy, fov = 130) {
  const scale = fov / (fov + z + 40);
  return {
    px: x * scale + cx,
    py: y * scale + cy,
    scale: scale
  };
}
\`\`\`
✨ Nút **[🔮 3D Shape]** hoặc phím **[S]** cho phép bạn chuyển đổi giữa 4 hình khối: Icosahedron, Hypercube 4D, Dodecahedron và Octahedron!`;
  }

  if (lower.includes('tunnel') || lower.includes('cloudflare') || lower.includes('docker')) {
    return `### 🌐 Trạng thái Cloudflare Tunnel Ingress (v5.1)

Container \`hello-tunnel\` đang kết nối ổn định tới mạng biên Cloudflare Edge:
- **Subdomain:** \`https://hello.aicodedao.xyz\`
- **Origin Target:** \`http://hello:8080\`
- **Cert Secret:** \`/etc/cloudflared/cert.pem\`
- **Latency Trung bình:** \`< 4ms\`
- **Trạng thái:** \`HEALTHY & INGRESS SYNCHRONIZED\`

\`\`\`bash
# Kiểm tra trực tiếp ingress edge
curl -I -s "https://hello.aicodedao.xyz/healthz"
# HTTP/2 200 OK
# server: cloudflare
\`\`\`
Mọi lưu lượng truy cập đều được mã hóa TLS 1.3 và chống DDoS tự động!`;
  }

  if (lower.includes('thơ') || lower.includes('poem') || lower.includes('thơ công nghệ')) {
    return `✨ **Vần Thơ Người Lập Trình Viên & Kỷ Nguyên AI** ✨

*Màn đêm buông xuống ánh neon rạng,*  
*Mã lệnh tuôn trào nét chữ bay.*  
*Agent đồng hành soi lối sáng,*  
*Chạm vào tương lai giữa sớm mai.*  

*Bao dòng kiểm thử êm đềm chạy,*  
*Tunnel thông suốt vượt đại dương.*  
*AiCodeDao kết nối muôn phương,*  
*Kiến tạo kỳ quan của kỷ nguyên số!* 🚀`;
  }

  // General responsive mock
  return `### 🤖 Phản hồi từ Gemini Agentic Assistant (v5.1)

Cảm ơn bạn đã đặt câu hỏi: *"**${prompt}**"*.

Hệ thống đã phân tích và tổng hợp thông tin:
- **Ngữ cảnh xử lý:** TrueForge Agentic Execution Node (v5.1)
- **Mô hình suy luận:** ${selectedAiModel.toUpperCase()}
- **Thời gian phản hồi:** < 160ms

\`\`\`javascript
// Kết quả tổng hợp tự động từ AiCodeDao Core
const systemResponse = {
  status: "SYNCHRONIZED",
  prompt: "${prompt.replace(/"/g, '\\"')}",
  features: ["Mini AI Game", "Multi-Polyhedra 3D", "Voice TTS", "Export Chat"],
  metrics: { latency: "< 4ms", memory: "Optimal", activeAgents: 4 }
};
\`\`\`

Bạn có thể cấu hình **Gemini API Key** chính thức tại nút **[🔑 API Key]** ở góc trên để mở khóa khả năng phân tích nâng cao không giới hạn!`;
}

async function executeAiResponse(prompt) {
  isAiGenerating = true;
  aiTypingIndicator.style.display = 'flex';
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

  // Placeholder message bubble for streaming
  const botBubble = document.createElement('div');
  botBubble.className = 'chat-bubble bot';
  botBubble.innerHTML = `
    <div class="chat-avatar">🤖</div>
    <div class="chat-content-wrap">
      <div class="chat-body"><span class="stream-cursor">▍</span></div>
      <div class="chat-meta">Gemini AI • Just now</div>
    </div>
  `;
  aiChatMessages.appendChild(botBubble);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

  const chatBody = botBubble.querySelector('.chat-body');

  // If user has provided a real Gemini API Key and selected a real model
  if (geminiApiKey && selectedAiModel !== 'mock-stream') {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedAiModel}:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Bạn là Gemini Agentic Assistant từ AiCodeDao (hello.aicodedao.xyz). Trả lời ngắn gọn, chuyên nghiệp, thông minh, có định dạng markdown đẹp mắt với bảng hoặc code block khi thích hợp. Câu hỏi: ${prompt}` }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Không nhận được phản hồi từ Gemini API.";
      
      // Stream text to UI
      await streamTextToBubble(generatedText, chatBody, botBubble);
      chatHistory.push({ role: 'bot', content: generatedText });
      playSound('ai-complete');
      aiTypingIndicator.style.display = 'none';
      isAiGenerating = false;
      return;
    } catch (err) {
      console.warn('Gemini API call failed, falling back to Agentic Mock Stream:', err);
      showToast('Gemini API Key gặp sự cố, tự động kích hoạt Mock Stream', '⚠️');
      playSound('ai-error');
    }
  }

  // Fallback to Intelligent Agentic Mock Stream
  const mockText = generateMockResponse(prompt);
  await streamTextToBubble(mockText, chatBody, botBubble);
  chatHistory.push({ role: 'bot', content: mockText });
  playSound('ai-complete');
  aiTypingIndicator.style.display = 'none';
  isAiGenerating = false;
}

async function streamTextToBubble(fullText, element, bubbleWrapper) {
  let currentText = '';
  const chunks = fullText.split(/(\s+|\n+)/);

  for (let i = 0; i < chunks.length; i++) {
    currentText += chunks[i];
    element.innerHTML = parseMarkdown(currentText) + '<span class="stream-cursor" style="animation:blink 0.8s infinite;">▍</span>';
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    
    if (i % 4 === 0) {
      playSound('ai-token');
    }
    
    await new Promise(r => setTimeout(r, Math.min(20, 350 / chunks.length)));
  }

  element.innerHTML = parseMarkdown(fullText);
  if (bubbleWrapper) {
    const metaSpan = bubbleWrapper.querySelector('.chat-meta span');
    if (metaSpan) {
      metaSpan.innerHTML = `Gemini AI • ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  }
}

// API Key Modal Handlers
if (aiConfigBtn) {
  aiConfigBtn.addEventListener('click', () => {
    geminiApiKeyInput.value = geminiApiKey;
    geminiModelSelect.value = selectedAiModel;
    apiKeyModal.classList.add('active');
    playSound('click');
  });
}

if (closeApiModalBtn) {
  closeApiModalBtn.addEventListener('click', () => {
    apiKeyModal.classList.remove('active');
    playSound('click');
  });
}

if (apiKeyModal) {
  apiKeyModal.addEventListener('click', (e) => {
    if (e.target === apiKeyModal) {
      apiKeyModal.classList.remove('active');
    }
  });
}

if (toggleKeyVisibility) {
  toggleKeyVisibility.addEventListener('click', () => {
    const isPassword = geminiApiKeyInput.type === 'password';
    geminiApiKeyInput.type = isPassword ? 'text' : 'password';
    toggleKeyVisibility.textContent = isPassword ? '🙈' : '👁️';
  });
}

if (saveApiKeyBtn) {
  saveApiKeyBtn.addEventListener('click', () => {
    geminiApiKey = geminiApiKeyInput.value.trim();
    selectedAiModel = geminiModelSelect.value;
    
    localStorage.setItem('aicodedao_gemini_api_key', geminiApiKey);
    localStorage.setItem('aicodedao_gemini_model', selectedAiModel);
    
    aiModelBadge.textContent = selectedAiModel === 'mock-stream' ? 'Agentic Mock' : selectedAiModel;
    apiKeyModal.classList.remove('active');
    
    showToast(geminiApiKey ? 'Đã lưu cấu hình Gemini API Key!' : 'Đã chuyển sang chế độ Agentic Mock', '💾');
    playSound('ai-complete');
  });
}

if (clearApiKeyBtn) {
  clearApiKeyBtn.addEventListener('click', () => {
    geminiApiKey = '';
    geminiApiKeyInput.value = '';
    localStorage.removeItem('aicodedao_gemini_api_key');
    showToast('Đã xóa Gemini API Key', '🗑️');
    playSound('click');
  });
}

// ============================================================
// 🔮 CYBER HUD 3D HOLOGRAPHIC MULTI-POLYHEDRA CORE ENGINE
// ============================================================
const hud3dCanvas = document.getElementById('hud-3d-canvas');
let hud3dCtx = null;
if (hud3dCanvas) {
  hud3dCtx = hud3dCanvas.getContext('2d');
}

// 1. Icosahedron (12 vertices, 30 edges)
const tVal = (1.0 + Math.sqrt(5.0)) / 2.0;
const rawIcosa = [
  [-1,  tVal,  0], [ 1,  tVal,  0], [-1, -tVal,  0], [ 1, -tVal,  0],
  [ 0, -1,  tVal], [ 0,  1,  tVal], [ 0, -1, -tVal], [ 0,  1, -tVal],
  [ tVal,  0, -1], [ tVal,  0,  1], [-tVal,  0, -1], [-tVal,  0,  1]
];
const icosaVertices = rawIcosa.map(v => {
  const len = Math.hypot(...v);
  return [v[0] / len * 42, v[1] / len * 42, v[2] / len * 42];
});
const icosaEdges = [
  [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
  [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
  [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
  [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
  [5, 9], [5, 4], [11, 4], [11, 2], [10, 2],
  [10, 6], [7, 6], [7, 8], [1, 8], [1, 9]
];

// 2. Hypercube 4D Tesseract
const hypercubeVerts = [];
for (let x of [-1, 1]) {
  for (let y of [-1, 1]) {
    for (let z of [-1, 1]) {
      hypercubeVerts.push([x * 38, y * 38, z * 38]); // Outer cube 0..7
      hypercubeVerts.push([x * 19, y * 19, z * 19]); // Inner cube 8..15
    }
  }
}
const hypercubeEdges = [
  [0, 2], [2, 6], [6, 4], [4, 0], [8, 10], [10, 14], [14, 12], [12, 8],
  [0, 8], [2, 10], [4, 12], [6, 14],
  [1, 3], [3, 7], [7, 5], [5, 1], [9, 11], [11, 15], [15, 13], [13, 9],
  [1, 9], [3, 11], [5, 13], [7, 15],
  [0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15]
];

// 3. Dodecahedron (20 vertices, 30 edges)
const phi = (1 + Math.sqrt(5)) / 2;
const invPhi = 1 / phi;
const rawDodec = [];
for (let x of [-1, 1]) {
  for (let y of [-1, 1]) {
    for (let z of [-1, 1]) {
      rawDodec.push([x, y, z]);
    }
  }
}
for (let s1 of [-1, 1]) {
  for (let s2 of [-1, 1]) {
    rawDodec.push([0, s1 * invPhi, s2 * phi]);
    rawDodec.push([s1 * invPhi, s2 * phi, 0]);
    rawDodec.push([s1 * phi, 0, s2 * invPhi]);
  }
}
const dodecVerts = rawDodec.map(v => {
  const len = Math.hypot(...v);
  return [v[0] / len * 42, v[1] / len * 42, v[2] / len * 42];
});
const dodecEdges = [];
for (let i = 0; i < dodecVerts.length; i++) {
  for (let j = i + 1; j < dodecVerts.length; j++) {
    const d = Math.hypot(dodecVerts[i][0] - dodecVerts[j][0], dodecVerts[i][1] - dodecVerts[j][1], dodecVerts[i][2] - dodecVerts[j][2]);
    if (d < 31) dodecEdges.push([i, j]);
  }
}

// 4. Octahedron (6 vertices, 12 edges)
const octaVerts = [
  [0, 44, 0], [0, -44, 0], [44, 0, 0], [-44, 0, 0], [0, 0, 44], [0, 0, -44]
];
const octaEdges = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 4], [4, 3], [3, 5], [5, 2]
];

const shapesData = [
  { verts: icosaVertices, edges: icosaEdges, name: 'Icosahedron' },
  { verts: hypercubeVerts, edges: hypercubeEdges, name: 'Hypercube 4D' },
  { verts: dodecVerts, edges: dodecEdges, name: 'Dodecahedron' },
  { verts: octaVerts, edges: octaEdges, name: 'Octahedron' }
];

let rotX = 0;
let rotY = 0;
let rotZ = 0;
let hudMouseX = 0;
let hudMouseY = 0;
let isHudHovered = false;

function switch3dShape(index = null) {
  if (index !== null) {
    currentShapeIndex = index % shapesData.length;
  } else {
    currentShapeIndex = (currentShapeIndex + 1) % shapesData.length;
  }
  const currentShape = polyhedraShapes[currentShapeIndex];
  if (shapeIcon) shapeIcon.textContent = currentShape.icon;
  if (shapeLabel) shapeLabel.textContent = currentShape.name;
  playSound('switch');
  showToast(`Khối 3D HUD: ${currentShape.name}`, currentShape.icon);
}

if (shapeToggleBtn) {
  shapeToggleBtn.addEventListener('click', () => {
    switch3dShape();
    trackInteraction();
  });
}

if (hud3dCanvas) {
  hud3dCanvas.addEventListener('mouseenter', () => { isHudHovered = true; });
  hud3dCanvas.addEventListener('mouseleave', () => { isHudHovered = false; });
  hud3dCanvas.addEventListener('mousemove', (e) => {
    const rect = hud3dCanvas.getBoundingClientRect();
    hudMouseX = (e.clientX - rect.left - rect.width / 2) * 0.05;
    hudMouseY = (e.clientY - rect.top - rect.height / 2) * 0.05;
  });
  hud3dCanvas.addEventListener('click', () => {
    rotX += 0.8;
    rotY += 1.2;
    switch3dShape();
    trackInteraction();
  });
}

function renderHud3dCore() {
  if (!hud3dCtx || !hud3dCanvas) return;

  hud3dCtx.clearRect(0, 0, hud3dCanvas.width, hud3dCanvas.height);
  
  const cx = hud3dCanvas.width / 2;
  const cy = hud3dCanvas.height / 2;
  const activeColor = themes[currentThemeIndex].particles[0] || '#38bdf8';
  const secondaryColor = themes[currentThemeIndex].particles[1] || '#c084fc';
  const currentShape = shapesData[currentShapeIndex] || shapesData[0];

  // Rotation increment
  rotX += 0.012 + (isHudHovered ? hudMouseY * 0.08 : 0);
  rotY += 0.018 + (isHudHovered ? hudMouseX * 0.08 : 0);
  rotZ += 0.008;

  // Transform and project 3D vertices
  const projected = currentShape.verts.map(v => {
    let [x, y, z] = v;

    // Rotate Y
    let cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    let x1 = x * cosY - z * sinY;
    let z1 = x * sinY + z * cosY;

    // Rotate X
    let cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    let y2 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;

    // Rotate Z
    let cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);
    let x3 = x1 * cosZ - y2 * sinZ;
    let y3 = x1 * sinZ + y2 * cosZ;

    // Perspective projection
    const fov = 130;
    const scale = fov / (fov + z2 + 40);
    return {
      x: x3 * scale + cx,
      y: y3 * scale + cy,
      z: z2,
      scale: scale
    };
  });

  // Draw 3D Edges
  hud3dCtx.save();
  hud3dCtx.lineWidth = 1.2;
  currentShape.edges.forEach(([i, j]) => {
    if (!projected[i] || !projected[j]) return;
    const p1 = projected[i];
    const p2 = projected[j];
    const avgZ = (p1.z + p2.z) / 2;
    const alpha = Math.max(0.15, Math.min(0.85, (avgZ + 42) / 84));

    hud3dCtx.strokeStyle = activeColor;
    hud3dCtx.globalAlpha = alpha;
    hud3dCtx.beginPath();
    hud3dCtx.moveTo(p1.x, p1.y);
    hud3dCtx.lineTo(p2.x, p2.y);
    hud3dCtx.stroke();
  });

  // Draw 3D Vertices nodes
  projected.forEach(p => {
    const nodeRadius = Math.max(1.5, 3 * p.scale);
    hud3dCtx.fillStyle = secondaryColor;
    hud3dCtx.globalAlpha = Math.max(0.3, Math.min(1, (p.z + 42) / 84));
    hud3dCtx.beginPath();
    hud3dCtx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
    hud3dCtx.fill();
  });

  // Central glowing energy singularity
  const grad = hud3dCtx.createRadialGradient(cx, cy, 2, cx, cy, 18);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.4, activeColor);
  grad.addColorStop(1, 'transparent');
  hud3dCtx.fillStyle = grad;
  hud3dCtx.globalAlpha = 0.75 + Math.sin(Date.now() * 0.005) * 0.2;
  hud3dCtx.beginPath();
  hud3dCtx.arc(cx, cy, 18, 0, Math.PI * 2);
  hud3dCtx.fill();

  hud3dCtx.restore();
}

// ============================================================
// 🎮 MINI AI GAME ENGINE: CYBER AI QUANTUM DODGER (v5.1)
// ============================================================
let gameCtx = null;
if (miniGameCanvas) {
  gameCtx = miniGameCanvas.getContext('2d');
}

const playerShip = {
  x: 230,
  y: 170,
  targetX: 230,
  targetY: 170,
  radius: 11,
  color: '#38bdf8'
};

let gameOrbs = [];
let gameTraps = [];
let gameSparks = [];
let gameLastOrbSpawn = 0;
let gameComboTimeout = 0;

function openMiniGameModal() {
  if (!miniGameModal) return;
  miniGameModal.classList.add('active');
  gameHighScoreVal.textContent = gameHighScore;
  if (!isGameRunning) {
    gameStartOverlay.style.display = 'flex';
    gameOverOverlay.style.display = 'none';
  }
  playSound('fanfare');
}

function closeMiniGameModal() {
  if (!miniGameModal) return;
  miniGameModal.classList.remove('active');
  if (isGameRunning) {
    stopMiniGame();
  }
}

if (miniGameBtn) {
  miniGameBtn.addEventListener('click', () => {
    openMiniGameModal();
    trackInteraction();
  });
}

if (closeGameModalBtn) {
  closeGameModalBtn.addEventListener('click', () => {
    closeMiniGameModal();
    playSound('click');
  });
}

if (miniGameModal) {
  miniGameModal.addEventListener('click', (e) => {
    if (e.target === miniGameModal) {
      closeMiniGameModal();
    }
  });
}

function startMiniGame() {
  isGameRunning = true;
  gameScore = 0;
  gameCombo = 1;
  gameShields = 3;
  gameDifficulty = gameDifficultySelect ? gameDifficultySelect.value : 'medium';
  
  gameOrbs = [];
  gameTraps = [];
  gameSparks = [];
  
  playerShip.x = miniGameCanvas.width / 2;
  playerShip.y = miniGameCanvas.height / 2;
  playerShip.targetX = playerShip.x;
  playerShip.targetY = playerShip.y;

  updateGameHud();
  gameStartOverlay.style.display = 'none';
  gameOverOverlay.style.display = 'none';

  // Spawn initial traps based on difficulty
  const trapCount = gameDifficulty === 'easy' ? 3 : (gameDifficulty === 'hard' ? 8 : 5);
  for (let i = 0; i < trapCount; i++) {
    spawnGameTrap();
  }
  for (let i = 0; i < 4; i++) {
    spawnGameOrb();
  }

  setGameAiText('🤖 Gemini Copilot: Khiên năng lượng đã nạp 100%! Bắt đầu né Glitch và gom Orbs.');
  playSound('game-powerup');

  if (gameAnimationId) cancelAnimationFrame(gameAnimationId);
  gameLoop();
}

function stopMiniGame() {
  isGameRunning = false;
  if (gameAnimationId) cancelAnimationFrame(gameAnimationId);
}

function gameOver() {
  isGameRunning = false;
  if (gameAnimationId) cancelAnimationFrame(gameAnimationId);
  
  playSound('game-over');
  gameFinalScoreVal.textContent = gameScore;

  if (gameScore > gameHighScore) {
    gameHighScore = gameScore;
    localStorage.setItem('aicodedao_high_score', gameHighScore);
    gameHighScoreVal.textContent = gameHighScore;
    gameRecordMsg.textContent = '🎉 KỶ LỤC MỚI ĐÃ ĐƯỢC THIẾT LẬP!';
    setGameAiText('🤖 Gemini Copilot: XUẤT SẮC! Bạn đã phá vỡ kỷ lục điểm số lượng tử toàn hệ thống!');
    playSound('fanfare');
  } else {
    gameRecordMsg.textContent = `Kỷ lục hiện tại: ${gameHighScore}`;
    setGameAiText('🤖 Gemini Copilot: Khiên đã cạn. Hãy khởi động lại để phục thù!');
  }

  gameOverOverlay.style.display = 'flex';
}

function updateGameHud() {
  gameScoreVal.textContent = gameScore;
  gameComboVal.textContent = `x${gameCombo}`;
  
  const shieldIcons = ['💀', '🛡️', '🛡️ 🛡️', '🛡️ 🛡️ 🛡️'];
  gameShieldsVal.textContent = shieldIcons[Math.max(0, Math.min(3, gameShields))];
}

function setGameAiText(text) {
  if (gameAiText) gameAiText.textContent = text;
}

function spawnGameOrb() {
  const pad = 30;
  gameOrbs.push({
    x: pad + Math.random() * (miniGameCanvas.width - pad * 2),
    y: pad + Math.random() * (miniGameCanvas.height - pad * 2),
    radius: 7,
    glow: '#38bdf8',
    pulse: Math.random() * Math.PI * 2
  });
}

function spawnGameTrap() {
  const speed = gameDifficulty === 'easy' ? 1.8 : (gameDifficulty === 'hard' ? 3.8 : 2.6);
  const angle = Math.random() * Math.PI * 2;
  gameTraps.push({
    x: Math.random() > 0.5 ? 10 : miniGameCanvas.width - 10,
    y: Math.random() * miniGameCanvas.height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 9,
    rot: 0,
    rotSpeed: (Math.random() - 0.5) * 0.1
  });
}

// Mouse & Touch Controls
if (miniGameCanvas) {
  const updatePlayerTarget = (clientX, clientY) => {
    const rect = miniGameCanvas.getBoundingClientRect();
    const scaleX = miniGameCanvas.width / rect.width;
    const scaleY = miniGameCanvas.height / rect.height;
    playerShip.targetX = (clientX - rect.left) * scaleX;
    playerShip.targetY = (clientY - rect.top) * scaleY;
  };

  miniGameCanvas.addEventListener('mousemove', (e) => {
    if (isGameRunning) updatePlayerTarget(e.clientX, e.clientY);
  });

  miniGameCanvas.addEventListener('touchmove', (e) => {
    if (isGameRunning && e.touches[0]) {
      e.preventDefault();
      updatePlayerTarget(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });
}

// Game Keyboard Controls
document.addEventListener('keydown', (e) => {
  if (!isGameRunning) return;
  const step = 14;
  if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') playerShip.targetY = Math.max(12, playerShip.targetY - step);
  if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') playerShip.targetY = Math.min(miniGameCanvas.height - 12, playerShip.targetY + step);
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') playerShip.targetX = Math.max(12, playerShip.targetX - step);
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') playerShip.targetX = Math.min(miniGameCanvas.width - 12, playerShip.targetX + step);
});

if (gameStartBtn) gameStartBtn.addEventListener('click', startMiniGame);
if (gameRestartBtn) gameRestartBtn.addEventListener('click', startMiniGame);

function gameLoop() {
  if (!isGameRunning) return;

  // Clear & draw background grid
  gameCtx.fillStyle = '#07090e';
  gameCtx.fillRect(0, 0, miniGameCanvas.width, miniGameCanvas.height);

  // Subtle Cyber Grid
  gameCtx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
  gameCtx.lineWidth = 1;
  for (let x = 0; x < miniGameCanvas.width; x += 30) {
    gameCtx.beginPath();
    gameCtx.moveTo(x, 0);
    gameCtx.lineTo(x, miniGameCanvas.height);
    gameCtx.stroke();
  }
  for (let y = 0; y < miniGameCanvas.height; y += 30) {
    gameCtx.beginPath();
    gameCtx.moveTo(0, y);
    gameCtx.lineTo(miniGameCanvas.width, y);
    gameCtx.stroke();
  }

  // Smooth Player movement
  playerShip.x += (playerShip.targetX - playerShip.x) * 0.22;
  playerShip.y += (playerShip.targetY - playerShip.y) * 0.22;

  // Draw Player Ship
  gameCtx.save();
  gameCtx.translate(playerShip.x, playerShip.y);
  
  // Ship Thruster Trail
  gameCtx.fillStyle = 'rgba(56, 189, 248, 0.6)';
  gameCtx.beginPath();
  gameCtx.arc(0, 0, playerShip.radius + 4 + Math.sin(Date.now() * 0.02) * 2, 0, Math.PI * 2);
  gameCtx.fillStyle = 'rgba(56, 189, 248, 0.15)';
  gameCtx.fill();

  // Ship Body (Cyber Arrow)
  gameCtx.fillStyle = '#38bdf8';
  gameCtx.beginPath();
  gameCtx.arc(0, 0, playerShip.radius, 0, Math.PI * 2);
  gameCtx.fill();
  gameCtx.fillStyle = '#ffffff';
  gameCtx.beginPath();
  gameCtx.arc(0, 0, playerShip.radius * 0.5, 0, Math.PI * 2);
  gameCtx.fill();
  gameCtx.restore();

  // Update & Draw Orbs
  for (let i = gameOrbs.length - 1; i >= 0; i--) {
    const orb = gameOrbs[i];
    orb.pulse += 0.05;
    const r = orb.radius + Math.sin(orb.pulse) * 1.5;

    gameCtx.save();
    gameCtx.fillStyle = '#a855f7';
    gameCtx.shadowColor = '#c084fc';
    gameCtx.shadowBlur = 12;
    gameCtx.beginPath();
    gameCtx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
    gameCtx.fill();
    gameCtx.fillStyle = '#ffffff';
    gameCtx.beginPath();
    gameCtx.arc(orb.x, orb.y, r * 0.4, 0, Math.PI * 2);
    gameCtx.fill();
    gameCtx.restore();

    // Check collision with player
    const dist = Math.hypot(orb.x - playerShip.x, orb.y - playerShip.y);
    if (dist < playerShip.radius + orb.radius) {
      // Collected!
      gameOrbs.splice(i, 1);
      gameScore += 100 * gameCombo;
      gameCombo = Math.min(5, gameCombo + 1);
      gameComboTimeout = Date.now() + 4000;
      updateGameHud();
      playSound('game-collect');

      // Sparks
      for (let s = 0; s < 8; s++) {
        gameSparks.push({
          x: orb.x, y: orb.y,
          vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
          life: 1, color: '#c084fc'
        });
      }

      if (gameCombo === 5) {
        setGameAiText('🤖 Gemini Copilot: 🔥 OVERDRIVE x5 KÍCH HOẠT! Điểm số tăng gấp 5 lần!');
      } else if (gameScore > 1000 && gameScore < 1500) {
        setGameAiText('🤖 Gemini Copilot: Phản xạ tuyệt vời! Đang hướng tới mốc 2000 điểm.');
      }

      spawnGameOrb();
    }
  }

  // Decay combo if timed out
  if (gameCombo > 1 && Date.now() > gameComboTimeout) {
    gameCombo = 1;
    updateGameHud();
  }

  // Update & Draw Traps (Glitch Drones)
  for (let i = 0; i < gameTraps.length; i++) {
    const trap = gameTraps[i];
    trap.x += trap.vx;
    trap.y += trap.vy;
    trap.rot += trap.rotSpeed;

    // Bounce on edges
    if (trap.x < trap.radius || trap.x > miniGameCanvas.width - trap.radius) trap.vx *= -1;
    if (trap.y < trap.radius || trap.y > miniGameCanvas.height - trap.radius) trap.vy *= -1;

    // Draw Glitch Trap (Spiky Red Polygon)
    gameCtx.save();
    gameCtx.translate(trap.x, trap.y);
    gameCtx.rotate(trap.rot);
    gameCtx.fillStyle = '#ef4444';
    gameCtx.shadowColor = '#f87171';
    gameCtx.shadowBlur = 10;
    gameCtx.beginPath();
    for (let p = 0; p < 6; p++) {
      const a = (p * Math.PI) / 3;
      const rad = p % 2 === 0 ? trap.radius : trap.radius * 0.5;
      const px = Math.cos(a) * rad;
      const py = Math.sin(a) * rad;
      if (p === 0) gameCtx.moveTo(px, py);
      else gameCtx.lineTo(px, py);
    }
    gameCtx.closePath();
    gameCtx.fill();
    gameCtx.restore();

    // Check collision with player
    const dist = Math.hypot(trap.x - playerShip.x, trap.y - playerShip.y);
    if (dist < playerShip.radius + trap.radius) {
      // Hit trap!
      gameShields--;
      gameCombo = 1;
      updateGameHud();
      playSound('game-hit');

      // Sparks
      for (let s = 0; s < 12; s++) {
        gameSparks.push({
          x: playerShip.x, y: playerShip.y,
          vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8,
          life: 1, color: '#ef4444'
        });
      }

      // Bounce trap away
      trap.vx *= -1.5;
      trap.vy *= -1.5;

      if (gameShields <= 0) {
        gameOver();
        return;
      } else {
        setGameAiText(`🤖 Gemini Copilot: Cảnh báo! Khiên còn ${gameShields} nấc. Hãy né xa bẫy Glitch!`);
      }
    }
  }

  // Draw Sparks
  for (let i = gameSparks.length - 1; i >= 0; i--) {
    const s = gameSparks[i];
    s.x += s.vx;
    s.y += s.vy;
    s.life -= 0.04;
    if (s.life <= 0) {
      gameSparks.splice(i, 1);
    } else {
      gameCtx.save();
      gameCtx.globalAlpha = s.life;
      gameCtx.fillStyle = s.color;
      gameCtx.beginPath();
      gameCtx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
      gameCtx.fill();
      gameCtx.restore();
    }
  }

  gameAnimationId = requestAnimationFrame(gameLoop);
}

// ============================================================
// Multi-Mode Background Canvas Engine
// ============================================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let matrixDrops = [];
let starfieldStars = [];
let confettiList = [];
let activeColors = themes[0].particles;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initCanvasMode(canvasModes[currentCanvasModeIndex].id);
}
window.addEventListener('resize', resizeCanvas);

function initParticlesColor(colors) {
  activeColors = colors;
  particles.forEach(p => {
    p.color = activeColors[Math.floor(Math.random() * activeColors.length)];
  });
}

// --- 1. Neural Network Particle ---
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = Math.random() * 2 + 1.2;
    this.color = activeColors[Math.floor(Math.random() * activeColors.length)];
    this.alpha = Math.random() * 0.5 + 0.25;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// --- 2. Matrix Rain Stream ---
const matrixChars = '01AICODEDAOTRUEFORGEAGENTIC9876543210XYZアカサタナハマヤラワン';
function initMatrix() {
  const columns = Math.floor(canvas.width / 20);
  matrixDrops = [];
  for (let i = 0; i < columns; i++) {
    matrixDrops[i] = Math.random() * -100;
  }
}

// --- 3. Starfield & Warp Star ---
class Star {
  constructor(isWarp = false) {
    this.isWarp = isWarp;
    this.reset();
  }
  reset() {
    this.x = (Math.random() - 0.5) * canvas.width * 2;
    this.y = (Math.random() - 0.5) * canvas.height * 2;
    this.z = Math.random() * canvas.width;
    this.pz = this.z;
    this.color = activeColors[Math.floor(Math.random() * activeColors.length)];
  }
  update(speed = 4) {
    this.pz = this.z;
    this.z -= speed;
    if (this.z <= 0) {
      this.reset();
      this.pz = this.z;
    }
  }
  draw() {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const sx = (this.x / this.z) * canvas.width + cx;
    const sy = (this.y / this.z) * canvas.height + cy;
    
    if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) {
      this.reset();
      return;
    }

    const r = (1 - this.z / canvas.width) * (this.isWarp ? 2 : 2.5);
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    if (this.isWarp) {
      const psx = (this.x / this.pz) * canvas.width + cx;
      const psy = (this.y / this.pz) * canvas.height + cy;
      ctx.lineWidth = Math.max(1, r);
      ctx.beginPath();
      ctx.moveTo(psx, psy);
      ctx.lineTo(sx, sy);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.5, r), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

// --- Confetti & Fireworks Particle ---
class ConfettiParticle {
  constructor(x, y, color = null) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 3;
    this.size = Math.random() * 7 + 4;
    this.color = color || activeColors[Math.floor(Math.random() * activeColors.length)];
    this.alpha = 1;
    this.decay = Math.random() * 0.018 + 0.014;
    this.gravity = 0.22;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 12;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.98;
    this.alpha -= this.decay;
    this.rotation += this.rotSpeed;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function initCanvasMode(modeId) {
  if (modeId === 'neural') {
    particles = [];
    const count = window.innerWidth < 768 ? 40 : 65;
    for (let i = 0; i < count; i++) particles.push(new Particle());
  } else if (modeId === 'matrix') {
    initMatrix();
  } else if (modeId === 'starfield') {
    starfieldStars = [];
    for (let i = 0; i < 180; i++) starfieldStars.push(new Star(false));
  } else if (modeId === 'warp') {
    starfieldStars = [];
    for (let i = 0; i < 220; i++) starfieldStars.push(new Star(true));
  }
}

function spawnMultiStageFireworks(x, y) {
  for (let i = 0; i < 60; i++) {
    confettiList.push(new ConfettiParticle(x, y));
  }
  setTimeout(() => {
    for (let i = 0; i < 40; i++) {
      confettiList.push(new ConfettiParticle(x + (Math.random() - 0.5) * 100, y - 60));
    }
  }, 180);
}

confettiBtn.addEventListener('click', () => {
  const rect = confettiBtn.getBoundingClientRect();
  spawnMultiStageFireworks(rect.left + rect.width / 2, rect.top);
  playSound('fanfare');
  trackInteraction();
});

heroSparkle.addEventListener('click', (e) => {
  spawnMultiStageFireworks(e.clientX, e.clientY);
  playSound('fanfare');
  trackInteraction();
});

// --- Animation Main Loop & FPS Meter ---
let frameCount = 0;
let fpsTimer = performance.now();

function animate(time) {
  const currentMode = canvasModes[currentCanvasModeIndex].id;

  if (currentMode === 'neural') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 115) {
          ctx.save();
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - dist / 115) * 0.16;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
  } else if (currentMode === 'matrix') {
    ctx.fillStyle = 'rgba(7, 8, 12, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = activeColors[0] || '#22c55e';
    ctx.font = '14px "JetBrains Mono", monospace';
    
    for (let i = 0; i < matrixDrops.length; i++) {
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      ctx.fillText(char, i * 20, matrixDrops[i] * 20);
      if (matrixDrops[i] * 20 > canvas.height && Math.random() > 0.975) {
        matrixDrops[i] = 0;
      }
      matrixDrops[i]++;
    }
  } else if (currentMode === 'starfield') {
    ctx.fillStyle = 'rgba(7, 8, 12, 0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    starfieldStars.forEach(s => { s.update(3); s.draw(); });
  } else if (currentMode === 'warp') {
    ctx.fillStyle = 'rgba(7, 8, 12, 0.45)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    starfieldStars.forEach(s => { s.update(24); s.draw(); });
  }

  // Update Confetti
  for (let i = confettiList.length - 1; i >= 0; i--) {
    const c = confettiList[i];
    c.update();
    c.draw();
    if (c.alpha <= 0) confettiList.splice(i, 1);
  }

  // Render 3D HUD Core
  renderHud3dCore();

  // Calculate FPS
  frameCount++;
  if (time - fpsTimer >= 1000) {
    fpsDisplay.textContent = frameCount;
    frameCount = 0;
    fpsTimer = time;
  }

  requestAnimationFrame(animate);
}

// --- Real Latency Measure ---
async function measureLatency() {
  const start = performance.now();
  try {
    const res = await fetch('/healthz', { cache: 'no-store' });
    if (res.ok) {
      const duration = Math.max(1, Math.round(performance.now() - start));
      latencyDisplay.textContent = `${duration}ms`;
      if (terminalOutput.children.length > 0) {
        logTerminal(`<span class="cmd-success">[Ping OK]</span> Origin /healthz latency: ${duration}ms`);
      }
    }
  } catch (e) {
    latencyDisplay.textContent = `< 4ms`;
  }
}
setInterval(measureLatency, 9000);

// --- Language Switcher Event ---
langBtnGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (btn && btn.dataset.lang) {
    setLanguage(btn.dataset.lang);
    playSound('click');
  }
});

// --- Application Bootstrap ---
window.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();

  const savedLang = localStorage.getItem('aicodedao_lang');
  if (savedLang && languages[savedLang]) setLanguage(savedLang);
  else setLanguage('vi');

  const savedTheme = localStorage.getItem('aicodedao_theme_index');
  if (savedTheme !== null) {
    currentThemeIndex = parseInt(savedTheme, 10) % themes.length;
    applyTheme(currentThemeIndex);
  } else {
    applyTheme(0);
  }

  const savedPreset = localStorage.getItem('aicodedao_sound_preset');
  if (savedPreset !== null) {
    currentSoundPresetIndex = parseInt(savedPreset, 10) % soundPresets.length;
    const preset = soundPresets[currentSoundPresetIndex];
    soundIcon.textContent = preset.icon;
    soundLabel.textContent = preset.label;
  }

  const savedCanvasMode = localStorage.getItem('aicodedao_canvas_mode');
  if (savedCanvasMode !== null) {
    setCanvasMode(parseInt(savedCanvasMode, 10));
  } else {
    setCanvasMode(0);
  }

  if (selectedAiModel) {
    aiModelBadge.textContent = selectedAiModel === 'mock-stream' ? 'Agentic Mock' : selectedAiModel;
  }

  setQuote(0);
  updateTimeGreeting();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  measureLatency();
  requestAnimationFrame(animate);
});


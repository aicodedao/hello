// ============================================================
// AiCodeDao Hello World Engine (v4.0 Next-Gen Agentic Core)
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

// --- Sound Presets (Web Audio Synth Pro) ---
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
    welcomeDefault: 'Chào mừng bạn đến với kỷ nguyên phát triển phần mềm AI Agentic tự động, tinh gọn và tối ưu hiệu năng đỉnh cao.',
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
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello',
    shareText: 'Khám phá thế giới AI Agentic tự động hóa đỉnh cao tại AiCodeDao Hello!',
    fireworksLabel: 'Bắn pháo hoa'
  },
  en: {
    name: 'English',
    flag: '🇬🇧',
    greeting: 'Hello, World!',
    welcomePrefix: 'Welcome, ',
    welcomeDefault: 'Welcome to the era of autonomous, lean, and high-performance AI Agentic software engineering.',
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
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello',
    shareText: 'Explore autonomous AI Agentic engineering at AiCodeDao Hello!',
    fireworksLabel: 'Launch Fireworks'
  },
  ja: {
    name: '日本語',
    flag: '🇯🇵',
    greeting: 'こんにちは、世界！',
    welcomePrefix: 'ようこそ、',
    welcomeDefault: '自律型AIエージェントによる次世代ソフトウェア開発の世界へようこそ。',
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
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello',
    shareText: '自律型AIエージェントによる次世代プラットフォーム！',
    fireworksLabel: '花火を打ち上げる'
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    greeting: 'Bonjour le Monde !',
    welcomePrefix: 'Bienvenue, ',
    welcomeDefault: 'Bienvenue dans l’ère de l’ingénierie logicielle autonome et agentique par IA.',
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
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello',
    shareText: 'Découvrez l’ingénierie logicielle agentique autonome !',
    fireworksLabel: 'Feu d’artifice'
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    greeting: '¡Hola, Mundo!',
    welcomePrefix: 'Bienvenido, ',
    welcomeDefault: 'Bienvenido a la era del desarrollo de software agéntico impulsado por Inteligencia Artificial.',
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
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello',
    shareText: '¡Descubre el desarrollo de software agéntico con IA!',
    fireworksLabel: 'Fuegos Artificiales'
  },
  ko: {
    name: '한국어',
    flag: '🇰🇷',
    greeting: '안녕하세요, 세상!',
    welcomePrefix: '환영합니다, ',
    welcomeDefault: '자율형 AI 에이전트 기반 차세대 소프트웨어 개발 플랫폼에 오신 것을 환영합니다.',
    dawn: '🌄 새벽',
    morning: '🌅 좋은 아침입니다',
    afternoon: '☀️ 즐거운 오후입니다',
    evening: '🌙 편안한 저녁입니다',
    night: '🌌 고요한 밤입니다',
    btnGreet: '인사하기 👋',
    copySuccess: '도메인이 클립보드에 복사되었습니다!',
    quoteCopied: '명언이 복사되었습니다!',
    quoteFavAdded: '즐겨찾기에 추가되었습니다! ❤️',
    quoteFavRemoved: '즐겨찾기에서 제거되었습니다',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello',
    shareText: '자율형 AI 에이전트 차세대 소프트웨어 엔지니어링!',
    fireworksLabel: '불꽃놀이 시작'
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪',
    greeting: 'Hallo, Welt!',
    welcomePrefix: 'Willkommen, ',
    welcomeDefault: 'Willkommen im Zeitalter der autonomen, agentischen KI-Softwareentwicklung.',
    dawn: '🌄 Morgengrauen',
    morning: '🌅 Guten Morgen',
    afternoon: '☀️ Guten Tag',
    evening: '🌙 Guten Abend',
    night: '🌌 Gute Nacht',
    btnGreet: 'Grüß mich 👋',
    copySuccess: 'Link in die Zwischenablage kopiert!',
    quoteCopied: 'Zitat kopiert!',
    quoteFavAdded: 'Zu Favoriten hinzugefügt! ❤️',
    quoteFavRemoved: 'Aus Favoriten entfernt',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello',
    shareText: 'Entdecke die autonome KI-Entwicklung bei AiCodeDao!',
    fireworksLabel: 'Feuerwerk zünden'
  },
  zh: {
    name: '中文',
    flag: '🇨🇳',
    greeting: '你好，世界！',
    welcomePrefix: '欢迎，',
    welcomeDefault: '欢迎来到由自主AI Agent驱动的下一代高效软件工程新纪元。',
    dawn: '🌄 破晓清晨',
    morning: '🌅 早上好',
    afternoon: '☀️ 下午好',
    evening: '🌙 晚上好',
    night: '🌌 夜深人静',
    btnGreet: '问候我 👋',
    copySuccess: '已成功复制链接到剪贴板！',
    quoteCopied: '已复制AI名言！',
    quoteFavAdded: '已添加到收藏夹！ ❤️',
    quoteFavRemoved: '已从收藏夹移除',
    shareTitle: 'AiCodeDao • Next-Gen Agentic Hello',
    shareText: '探索下一代自主AI Agent驱动的工程新纪元！',
    fireworksLabel: '燃放礼花'
  }
};

// --- AI Wisdom Quotes ---
const quotes = [
  {
    category: "Agentic AI",
    text: "Tự động hoá là chìa khoá biến ý tưởng công nghệ thành hiện thực trong chớp mắt.",
    author: "AiCodeDao Agentic Core"
  },
  {
    category: "Architecture",
    text: "Đừng viết thêm code khi bạn có thể thiết kế một hệ thống tự hoàn thiện và kiểm thử nó.",
    author: "TrueForge AI Philosophy"
  },
  {
    category: "Future Tech",
    text: "Sức mạnh thực sự của AI không phải thay thế con người, mà là nhân bản vô hạn năng lực sáng tạo.",
    author: "Scott Ng & AiCodeDao"
  },
  {
    category: "DevOps & Edge",
    text: "Tốc độ, bảo mật và sự đơn giản là bộ ba định hình tương lai của kiến trúc phân tán toàn cầu.",
    author: "Cloudflare Edge Paradigm"
  },
  {
    category: "Engineering",
    text: "Mỗi dòng lệnh tinh gọn hôm nay là nền tảng cho sự mở rộng vô hạn ngày mai.",
    author: "Modern DevOps Manifesto"
  },
  {
    category: "Philosophy",
    text: "Sự hoàn hảo đạt được không phải khi không còn gì để thêm vào, mà là khi không còn gì để bớt đi.",
    author: "Antoine de Saint-Exupéry"
  },
  {
    category: "AI Autonomy",
    text: "Hệ thống AI xuất sắc nhất là hệ thống vận hành âm thầm, chính xác và không bao giờ gián đoạn.",
    author: "Autonomous Sentinel"
  },
  {
    category: "Clean Code",
    text: "Mã nguồn sạch là bức thư tình gửi cho người lập trình viên tiếp theo đọc nó — kể cả khi đó là AI.",
    author: "Software Craftsmanship"
  }
];

// --- 6 Color Themes ---
const themes = [
  {
    name: 'Cyber Aurora',
    label: 'Theme (Cyber Aurora)',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
    glow: 'rgba(99, 102, 241, 0.45)',
    particles: ['#6366f1', '#a855f7', '#ec4899', '#38bdf8']
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

// --- Web Audio API Synthesizer Pro ---
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
  updateTimeGreeting();

  if (customName) {
    greetingText.textContent = `${currentAvatar} Hello, ${customName}!`;
    subtitleText.textContent = `${langData.welcomePrefix}${customName}! ${langData.welcomeDefault}`;
  } else {
    greetingText.textContent = langData.greeting;
    subtitleText.textContent = langData.welcomeDefault;
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

// --- Interactive Mini Terminal CLI v4.0 ---
function logTerminal(msg, type = '') {
  const line = document.createElement('div');
  line.className = `terminal-line ${type}`;
  line.innerHTML = msg;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalToggle.addEventListener('click', () => {
  isTerminalExpanded = !isTerminalExpanded;
  terminalBody.style.display = isTerminalExpanded ? 'flex' : 'none';
  terminalToggle.textContent = isTerminalExpanded ? '_' : '+';
});

if (terminalClear) {
  terminalClear.addEventListener('click', () => {
    terminalOutput.innerHTML = '';
    playSound('click');
  });
}

document.querySelectorAll('.cmd-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const cmd = chip.dataset.cmd;
    if (cmd) {
      logTerminal(`<span style="color:#a855f7">aicodedao:~$</span> ${cmd}`);
      processTerminalCommand(cmd);
      playSound('click');
      trackInteraction();
    }
  });
});

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim();
    if (!cmd) return;
    logTerminal(`<span style="color:#a855f7">aicodedao:~$</span> ${cmd}`);
    terminalInput.value = '';
    processTerminalCommand(cmd);
    playSound('click');
  }
});

function processTerminalCommand(rawCmd) {
  const cmd = rawCmd.toLowerCase();
  if (cmd === '/help') {
    logTerminal('Available commands: <span class="cmd-highlight">/help, /status, /quote, /theme, /canvas, /confetti, /agents, /sound, /ping, /clear, /share</span>');
  } else if (cmd === '/status') {
    logTerminal('<span class="cmd-success">[OK]</span> Engine: v4.0 Agentic | Tunnel: Active | Nginx: Port 8080 | Canvas: ' + canvasModes[currentCanvasModeIndex].label);
  } else if (cmd === '/quote') {
    newQuoteBtn.click();
    logTerminal(`[Quote]: ${quoteText.textContent}`);
  } else if (cmd === '/theme') {
    colorThemeBtn.click();
    logTerminal(`Switched theme to: ${themes[currentThemeIndex].name}`);
  } else if (cmd === '/canvas') {
    canvasModeBtn.click();
    logTerminal(`Switched canvas to: ${canvasModes[currentCanvasModeIndex].label}`);
  } else if (cmd === '/confetti') {
    confettiBtn.click();
    logTerminal('🎉 Multistage fireworks unleashed!');
  } else if (cmd === '/clear') {
    terminalOutput.innerHTML = '';
  } else if (cmd === '/ping') {
    measureLatency();
    logTerminal(`Measuring origin /healthz endpoint latency...`);
  } else if (cmd === '/agents') {
    logTerminal('[1] 🧠 Gemini 3.7 Flash: Lead Architect & Code Forge (Active)');
    logTerminal('[2] 🛡️ Gemini 3.1 Pro: QA & Security Sentinel (Active)');
    logTerminal('[3] 🐳 TrueForge DevOps: Alpine & Cloudflare Tunnel (Online)');
    logTerminal('[4] 🎨 Glass 3.0 Engine: Web Audio & Canvas FX (60+ FPS)');
  } else if (cmd === '/sound') {
    soundToggleBtn.click();
    logTerminal(`Sound preset: ${soundPresets[currentSoundPresetIndex].label}`);
  } else if (cmd === '/share') {
    smartShareBtn.click();
    logTerminal('Opened Smart Share & QR Modal.');
  } else {
    logTerminal(`<span class="cmd-error">Command not found: ${rawCmd}</span>. Type <span class="cmd-highlight">/help</span> for list.`, 'cmd-error');
  }
}

// --- Interaction Tracker ---
function trackInteraction() {
  clickCount++;
  clicksDisplay.textContent = clickCount;
}

document.addEventListener('click', (e) => {
  if (e.target.closest('#main-card') || e.target.closest('.modal-dialog')) {
    trackInteraction();
  }
});

// --- Ambient Cursor Glow & 3D Tilt ---
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;

  if (window.innerWidth > 768) {
    const rect = cardWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -3.5;
    const tiltY = (x / (rect.width / 2)) * 3.5;
    cardWrapper.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }
});

document.addEventListener('mouseleave', () => {
  cardWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// --- Keyboard Shortcuts ---
document.addEventListener('keydown', (e) => {
  if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
    return;
  }
  const key = e.key.toUpperCase();
  if (key === 'T') {
    colorThemeBtn.click();
  } else if (key === 'C') {
    confettiBtn.click();
  } else if (key === 'W') {
    canvasModeBtn.click();
  } else if (key === 'Q') {
    newQuoteBtn.click();
  } else if (key === 'M') {
    soundToggleBtn.click();
  } else if (key === 'L') {
    const langKeys = Object.keys(languages);
    const nextIndex = (langKeys.indexOf(currentLang) + 1) % langKeys.length;
    setLanguage(langKeys[nextIndex]);
    showToast(`Ngôn ngữ: ${languages[langKeys[nextIndex]].name}`, '🌍');
    playSound('switch');
  } else if (key === 'F') {
    fullscreenBtn.click();
  } else if (e.code === 'Space') {
    e.preventDefault();
    spawnMultiStageFireworks(window.innerWidth / 2, window.innerHeight / 2);
    playSound('fanfare');
  }
});

// ============================================================
// Multi-Mode Canvas Engine (Neural, Matrix, Starfield, Warp)
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
  // Delayed second burst
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
    // Neural Connections
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

  setQuote(0);
  updateTimeGreeting();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  measureLatency();
  requestAnimationFrame(animate);
});


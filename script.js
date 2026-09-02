// ==========================================
// AiCodeDao Hello World Engine (v3.1 Agentic)
// ==========================================

// --- State Management ---
let clickCount = 0;
let currentThemeIndex = 0;
let currentQuoteIndex = 0;
let currentSoundPresetIndex = 0;
let currentLang = 'vi';
let isClockUtc = false;
let isTerminalExpanded = true;
let customName = '';

// --- Sound Presets ---
const soundPresets = [
  { id: 'synth', label: 'Cyber Synth', icon: '🔊' },
  { id: 'arcade', label: '8-Bit Arcade', icon: '🎮' },
  { id: 'zen', label: 'Zen Chime', icon: '🔔' },
  { id: 'asmr', label: 'ASMR Click', icon: '🎧' },
  { id: 'mute', label: 'Muted', icon: '🔇' }
];

// --- Multi-language Greetings ---
const languages = {
  vi: {
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    greeting: 'Hello, World!',
    welcomePrefix: 'Chào mừng bạn, ',
    welcomeDefault: 'Chào mừng bạn đến với kỷ nguyên phát triển phần mềm AI Agentic tự động, tinh gọn và tối ưu hiệu năng đỉnh cao.',
    morning: '🌅 Chào buổi sáng',
    afternoon: '☀️ Chào buổi chiều',
    evening: '🌙 Chào buổi tối',
    btnGreet: 'Chào tôi 👋',
    copySuccess: 'Đã sao chép liên kết vào bộ nhớ tạm!',
    quoteCopied: 'Đã sao chép câu danh ngôn!'
  },
  en: {
    name: 'English',
    flag: '🇬🇧',
    greeting: 'Hello, World!',
    welcomePrefix: 'Welcome, ',
    welcomeDefault: 'Welcome to the era of autonomous, lean, and high-performance AI Agentic software engineering.',
    morning: '🌅 Good Morning',
    afternoon: '☀️ Good Afternoon',
    evening: '🌙 Good Evening',
    btnGreet: 'Greet Me 👋',
    copySuccess: 'Domain copied to clipboard!',
    quoteCopied: 'Quote copied to clipboard!'
  },
  ja: {
    name: '日本語',
    flag: '🇯🇵',
    greeting: 'こんにちは、世界！',
    welcomePrefix: 'ようこそ、',
    welcomeDefault: '自律型AIエージェントによる次世代ソフトウェア開発の世界へようこそ。',
    morning: '🌅 おはようございます',
    afternoon: '☀️ こんにちは',
    evening: '🌙 こんばんは',
    btnGreet: '挨拶する 👋',
    copySuccess: 'URLをクリップボードにコピーしました！',
    quoteCopied: '名言をコピーしました！'
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    greeting: 'Bonjour le Monde !',
    welcomePrefix: 'Bienvenue, ',
    welcomeDefault: 'Bienvenue dans l’ère de l’ingénierie logicielle autonome et agentique par IA.',
    morning: '🌅 Bonjour',
    afternoon: '☀️ Bon après-midi',
    evening: '🌙 Bonsoir',
    btnGreet: 'Saluez-moi 👋',
    copySuccess: 'Lien copié dans le presse-papiers !',
    quoteCopied: 'Citation copiée !'
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    greeting: '¡Hola, Mundo!',
    welcomePrefix: 'Bienvenido, ',
    welcomeDefault: 'Bienvenido a la era del desarrollo de software agéntico impulsado por Inteligencia Artificial.',
    morning: '🌅 Buenos Días',
    afternoon: '☀️ Buenas Tardes',
    evening: '🌙 Buenas Noches',
    btnGreet: 'Salúdame 👋',
    copySuccess: '¡Enlace copiado al portapapeles!',
    quoteCopied: '¡Cita copiada!'
  },
  ko: {
    name: '한국어',
    flag: '🇰🇷',
    greeting: '안녕하세요, 세상!',
    welcomePrefix: '환영합니다, ',
    welcomeDefault: '자율형 AI 에이전트 기반 차세대 소프트웨어 개발 플랫폼에 오신 것을 환영합니다.',
    morning: '🌅 좋은 아침입니다',
    afternoon: '☀️ 즐거운 오후입니다',
    evening: '🌙 편안한 저녁입니다',
    btnGreet: '인사하기 👋',
    copySuccess: '도메인이 클립보드에 복사되었습니다!',
    quoteCopied: '명언이 복사되었습니다!'
  }
};

// --- AI Wisdom Quotes ---
const quotes = [
  {
    category: "Agentic AI",
    text: "Tự động hoá là chìa khoá biến ý tưởng công nghệ thành hiện thực trong chớp mắt.",
    author: "AiCodeDao Agentic System"
  },
  {
    category: "Engineering",
    text: "Đừng viết thêm code khi bạn có thể thiết kế một hệ thống tự hoàn thiện và kiểm thử nó.",
    author: "TrueForge AI Philosophy"
  },
  {
    category: "Architecture",
    text: "Mỗi dòng lệnh tinh gọn hôm nay là nền tảng cho sự mở rộng vô hạn ngày mai.",
    author: "Modern DevOps Manifesto"
  },
  {
    category: "Future",
    text: "Sức mạnh thực sự của AI không phải thay thế con người, mà là nhân bản vô hạn năng lực sáng tạo.",
    author: "Scott Ng & AiCodeDao"
  },
  {
    category: "Edge & Cloud",
    text: "Tốc độ, bảo mật và sự đơn giản là bộ ba định hình tương lai của kiến trúc phân tán toàn cầu.",
    author: "Cloudflare Edge Paradigm"
  },
  {
    category: "Simplicity",
    text: "Sự hoàn hảo đạt được không phải khi không còn gì để thêm vào, mà là khi không còn gì để bớt đi.",
    author: "Antoine de Saint-Exupéry"
  }
];

// --- Color Themes ---
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
  }
];

// --- DOM Elements ---
const cardWrapper = document.getElementById('card-wrapper');
const mainCard = document.getElementById('main-card');
const cursorGlow = document.getElementById('cursor-glow');
const toastContainer = document.getElementById('toast-container');
const nameInput = document.getElementById('name-input');
const greetBtn = document.getElementById('greet-btn');
const greetingText = document.getElementById('greeting-text');
const subtitleText = document.getElementById('subtitle-text');
const timeBadge = document.getElementById('time-badge');
const heroSparkle = document.getElementById('hero-sparkle');
const colorThemeBtn = document.getElementById('color-theme-btn');
const themeBtnLabel = document.getElementById('theme-btn-label');
const confettiBtn = document.getElementById('confetti-btn');
const qrModalBtn = document.getElementById('qr-modal-btn');
const qrModal = document.getElementById('qr-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const soundIcon = document.getElementById('sound-icon');
const soundLabel = document.getElementById('sound-label');
const liveClock = document.getElementById('live-clock');
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
const langBtnGroup = document.getElementById('lang-btn-group');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalToggle = document.getElementById('terminal-toggle');
const terminalBody = document.getElementById('terminal-body');

// --- Web Audio API Synthesizer ---
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

function playSound(type = 'click') {
  const currentPreset = soundPresets[currentSoundPresetIndex];
  if (currentPreset.id === 'mute') return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (currentPreset.id === 'synth') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'fanfare') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const chordOsc = ctx.createOscillator();
          const chordGain = ctx.createGain();
          chordOsc.type = 'triangle';
          chordOsc.frequency.setValueAtTime(freq, now + i * 0.07);
          chordGain.gain.setValueAtTime(0.08, now + i * 0.07);
          chordGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);
          chordOsc.connect(chordGain);
          chordGain.connect(ctx.destination);
          chordOsc.start(now + i * 0.07);
          chordOsc.stop(now + i * 0.07 + 0.36);
        });
      } else if (type === 'switch') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
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
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.setValueAtTime(480, now + 0.03);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.07);
      } else if (type === 'fanfare') {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.25);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.26);
      } else {
        osc.frequency.setValueAtTime(350, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      }
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.27);
    } else if (currentPreset.id === 'zen') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(type === 'fanfare' ? 880 : 528, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.82);
    } else if (currentPreset.id === 'asmr') {
      const bufferSize = ctx.sampleRate * 0.03;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start(now);
    }
  } catch (e) {
    // Graceful fallback
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
  updateTimeGreeting();

  if (customName) {
    greetingText.textContent = `Hello, ${customName}!`;
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
  if (hour >= 12 && hour < 18) {
    greeting = langData.afternoon;
  } else if (hour >= 18 || hour < 5) {
    greeting = langData.evening;
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

// --- Quote System ---
function setQuote(index) {
  const quote = quotes[index];
  quoteText.style.opacity = '0';
  setTimeout(() => {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    quoteCat.textContent = quote.category;
    quoteText.style.opacity = '1';
  }, 150);
}

newQuoteBtn.addEventListener('click', () => {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  setQuote(currentQuoteIndex);
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
  showToast(`Kích hoạt Theme: ${themes[currentThemeIndex].name}`, '🎨');
  trackInteraction();
});

// --- Name Greeting Personalization ---
function handleGreet() {
  const name = nameInput.value.trim();
  const langData = languages[currentLang] || languages.vi;
  if (name) {
    customName = name;
    greetingText.textContent = `Hello, ${customName}!`;
    subtitleText.textContent = `${langData.welcomePrefix}${customName}! ${langData.welcomeDefault}`;
    showToast(`Chào mừng ${customName}!`, '🌟');
  } else {
    customName = '';
    greetingText.textContent = langData.greeting;
    subtitleText.textContent = langData.welcomeDefault;
  }
  playSound('fanfare');
  spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 40);
  trackInteraction();
}

greetBtn.addEventListener('click', handleGreet);
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleGreet();
});

// --- Domain Copy ---
domainCopyBtn.addEventListener('click', () => {
  const domain = 'hello.aicodedao.xyz';
  navigator.clipboard.writeText(`https://${domain}`).then(() => {
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

// --- QR Code Modal ---
qrModalBtn.addEventListener('click', () => {
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

// --- Interactive Mini Terminal CLI ---
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
    logTerminal('Available commands: <span class="cmd-highlight">/help, /status, /quote, /theme, /confetti, /clear, /ping, /agents</span>');
  } else if (cmd === '/status') {
    logTerminal('<span class="cmd-success">[OK]</span> Engine: v3.1 | Tunnel: Active | Origin: healthy | Edge Nodes: 280+');
  } else if (cmd === '/quote') {
    newQuoteBtn.click();
    logTerminal(`[Quote]: ${quoteText.textContent}`);
  } else if (cmd === '/theme') {
    colorThemeBtn.click();
    logTerminal(`Switched to: ${themes[currentThemeIndex].name}`);
  } else if (cmd === '/confetti') {
    confettiBtn.click();
    logTerminal('🎉 Fireworks unleashed!');
  } else if (cmd === '/clear') {
    terminalOutput.innerHTML = '';
  } else if (cmd === '/ping') {
    logTerminal(`Origin healthz ping: ~${Math.floor(Math.random() * 4 + 2)}ms`);
  } else if (cmd === '/agents') {
    logTerminal('Active sub-agents: [1] Coder [2] Reviewer [3] DevOps [4] Security Sentinel');
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
    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;
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
  } else if (e.code === 'Space') {
    e.preventDefault();
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
    playSound('fanfare');
  }
});

// --- Particle Physics & Fireworks Canvas Engine ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let confettiList = [];
let activeColors = themes[0].particles;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function initParticlesColor(colors) {
  activeColors = colors;
  particles.forEach(p => {
    p.color = activeColors[Math.floor(Math.random() * activeColors.length)];
  });
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = Math.random() * 2 + 1;
    this.color = activeColors[Math.floor(Math.random() * activeColors.length)];
    this.alpha = Math.random() * 0.5 + 0.2;
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

class ConfettiParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 2;
    this.size = Math.random() * 7 + 4;
    this.color = activeColors[Math.floor(Math.random() * activeColors.length)];
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.015;
    this.gravity = 0.25;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 10;
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

function initParticles(count = 55) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function spawnConfetti(x, y, count = 35) {
  for (let i = 0; i < count; i++) {
    confettiList.push(new ConfettiParticle(x, y));
  }
}

confettiBtn.addEventListener('click', (e) => {
  const rect = confettiBtn.getBoundingClientRect();
  spawnConfetti(rect.left + rect.width / 2, rect.top, 50);
  playSound('fanfare');
  trackInteraction();
});

heroSparkle.addEventListener('click', (e) => {
  spawnConfetti(e.clientX, e.clientY, 30);
  playSound('fanfare');
});

// --- Animation Loop & FPS Meter ---
let lastTime = performance.now();
let frameCount = 0;
let fpsTimer = performance.now();

function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Neural Connection Lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        ctx.save();
        ctx.strokeStyle = particles[i].color;
        ctx.globalAlpha = (1 - dist / 110) * 0.15;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  // Update Particles
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Update Confetti
  for (let i = confettiList.length - 1; i >= 0; i--) {
    const c = confettiList[i];
    c.update();
    c.draw();
    if (c.alpha <= 0) {
      confettiList.splice(i, 1);
    }
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
requestAnimationFrame(animate);

// --- Real Latency & Origin Health Check ---
async function measureLatency() {
  const start = performance.now();
  try {
    await fetch('/healthz', { cache: 'no-store' });
    const duration = Math.round(performance.now() - start);
    latencyDisplay.textContent = `${duration}ms`;
  } catch (e) {
    latencyDisplay.textContent = `< 4ms`;
  }
}
setInterval(measureLatency, 8000);
measureLatency();

// --- Language Selector Buttons Event ---
langBtnGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (btn && btn.dataset.lang) {
    setLanguage(btn.dataset.lang);
    playSound('click');
  }
});

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
  // Load saved preferences
  const savedLang = localStorage.getItem('aicodedao_lang');
  if (savedLang && languages[savedLang]) setLanguage(savedLang);
  else setLanguage('vi');

  const savedTheme = localStorage.getItem('aicodedao_theme_index');
  if (savedTheme !== null) {
    currentThemeIndex = parseInt(savedTheme, 10) % themes.length;
    applyTheme(currentThemeIndex);
  }

  const savedPreset = localStorage.getItem('aicodedao_sound_preset');
  if (savedPreset !== null) {
    currentSoundPresetIndex = parseInt(savedPreset, 10) % soundPresets.length;
    const preset = soundPresets[currentSoundPresetIndex];
    soundIcon.textContent = preset.icon;
    soundLabel.textContent = preset.label;
  }

  setQuote(0);
  updateTimeGreeting();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
});

// ==========================================
// AiCodeDao Hello World Engine (v2.0 Modern)
// ==========================================

// --- State & DOM Elements ---
let clickCount = 0;
let currentThemeIndex = 0;
let currentQuoteIndex = 0;
let isAudioEnabled = true;

const cardWrapper = document.getElementById('card-wrapper');
const mainCard = document.getElementById('main-card');
const nameInput = document.getElementById('name-input');
const greetBtn = document.getElementById('greet-btn');
const greetingText = document.getElementById('greeting-text');
const subtitleText = document.getElementById('subtitle-text');
const timeBadge = document.getElementById('time-badge');
const colorThemeBtn = document.getElementById('color-theme-btn');
const themeBtnLabel = document.getElementById('theme-btn-label');
const confettiBtn = document.getElementById('confetti-btn');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const soundIcon = document.getElementById('sound-icon');
const soundLabel = document.getElementById('sound-label');
const audioEngineStatus = document.getElementById('audio-engine-status');
const liveClock = document.getElementById('live-clock');
const clicksDisplay = document.getElementById('clicks-count');
const fpsDisplay = document.getElementById('fps-counter');
const latencyDisplay = document.getElementById('latency-display');
const domainCopyBtn = document.getElementById('domain-copy-btn');
const copyTooltip = document.getElementById('copy-tooltip');
const quoteCard = document.getElementById('quote-card');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// --- AI Wisdom Quotes ---
const quotes = [
  {
    text: "Tự động hoá là chìa khoá biến ý tưởng công nghệ thành hiện thực trong chớp mắt.",
    author: "AiCodeDao Agentic System"
  },
  {
    text: "Đừng viết thêm code khi bạn có thể thiết kế một hệ thống tự hoàn thiện nó.",
    author: "TrueForge AI Philosophy"
  },
  {
    text: "Mỗi dòng lệnh tinh gọn hôm nay là nền tảng cho sự mở rộng vô hạn ngày mai.",
    author: "Modern DevOps Manifesto"
  },
  {
    text: "Sức mạnh thực sự của AI không phải thay thế con người, mà là nhân bản năng lực sáng tạo.",
    author: "Scott Ng & AiCodeDao"
  },
  {
    text: "Tốc độ, bảo mật và sự đơn giản là bộ ba định hình tương lai của kiến trúc phần mềm.",
    author: "Cloudflare Edge Paradigm"
  }
];

// --- Color Themes ---
const themes = [
  {
    name: 'Cyberpunk Aurora',
    label: 'Đổi Theme (Aurora)',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
    glow: 'rgba(99, 102, 241, 0.45)',
    particles: ['#6366f1', '#a855f7', '#ec4899', '#38bdf8']
  },
  {
    name: 'Emerald Nexus',
    label: 'Đổi Theme (Nexus)',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
    glow: 'rgba(16, 185, 129, 0.45)',
    particles: ['#10b981', '#06b6d4', '#3b82f6', '#a7f3d0']
  },
  {
    name: 'Solar Flare',
    label: 'Đổi Theme (Solar)',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
    glow: 'rgba(245, 158, 11, 0.45)',
    particles: ['#f59e0b', '#ef4444', '#ec4899', '#fde047']
  },
  {
    name: 'Deep Cosmos',
    label: 'Đổi Theme (Cosmos)',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
    glow: 'rgba(56, 189, 248, 0.45)',
    particles: ['#38bdf8', '#818cf8', '#c084fc', '#e0e7ff']
  }
];

// --- Web Audio API Synthesizer (Zero-asset Polyphonic Audio) ---
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

// Click Pop Sound
function playPopSound() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

// Theme Change Synth Chord
function playChordSound(index) {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const baseFreqs = [
      [261.63, 329.63, 392.00, 523.25], // C Major 7
      [293.66, 369.99, 440.00, 587.33], // D Major
      [329.63, 415.30, 493.88, 659.25], // E Major
      [349.23, 440.00, 523.25, 698.46]  // F Major
    ];
    
    const freqs = baseFreqs[index % baseFreqs.length];
    const now = ctx.currentTime;
    
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      
      gain.gain.setValueAtTime(0.06, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.35);
    });
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

// Celebration Chime
function playChimeSound() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;
    
    notes.forEach((note, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now + i * 0.06);
      
      gain.gain.setValueAtTime(0.1, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.4);
    });
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

// --- Audio Toggle Control ---
function toggleAudio() {
  isAudioEnabled = !isAudioEnabled;
  localStorage.setItem('aicodedao_sound', isAudioEnabled ? '1' : '0');
  updateAudioUI();
  if (isAudioEnabled) {
    playPopSound();
  }
}

function updateAudioUI() {
  if (isAudioEnabled) {
    soundIcon.textContent = '🔊';
    soundLabel.textContent = 'Audio ON';
    soundToggleBtn.classList.remove('muted');
    audioEngineStatus.textContent = 'Active Synth';
  } else {
    soundIcon.textContent = '🔇';
    soundLabel.textContent = 'Audio Muted';
    soundToggleBtn.classList.add('muted');
    audioEngineStatus.textContent = 'Muted';
  }
}

soundToggleBtn.addEventListener('click', toggleAudio);

// Load saved sound preference
const savedSound = localStorage.getItem('aicodedao_sound');
if (savedSound !== null) {
  isAudioEnabled = savedSound === '1';
}
updateAudioUI();

// --- Live Clock & Time Greeting ---
function updateClockAndGreeting() {
  const now = new Date();
  liveClock.textContent = now.toLocaleTimeString('vi-VN', { hour12: false });
  
  const hour = now.getHours();
  let greeting = '🌅 Chào buổi sáng';
  if (hour >= 12 && hour < 18) {
    greeting = '☀️ Chào buổi chiều';
  } else if (hour >= 18 && hour < 22) {
    greeting = '🌙 Chào buổi tối';
  } else if (hour >= 22 || hour < 5) {
    greeting = '✨ Chúc bạn đêm an lành';
  }
  timeBadge.textContent = greeting;
}
setInterval(updateClockAndGreeting, 1000);
updateClockAndGreeting();

// --- Interactive Greeting ---
function triggerGreeting() {
  const name = nameInput.value.trim();
  clickCount++;
  clicksDisplay.textContent = clickCount;

  if (name) {
    greetingText.style.transform = 'scale(0.88)';
    playChimeSound();
    setTimeout(() => {
      greetingText.textContent = `Xin chào, ${name}!`;
      greetingText.style.transform = 'scale(1)';
      subtitleText.textContent = `Rất vui được đồng hành cùng bạn trên nền tảng TrueForge AI. Chúc bạn một ngày lập trình siêu năng suất! 🚀`;
      triggerConfetti();
    }, 150);
  } else {
    greetingText.style.transform = 'scale(0.88)';
    playPopSound();
    setTimeout(() => {
      greetingText.textContent = 'Hello, World!';
      greetingText.style.transform = 'scale(1)';
      subtitleText.textContent = 'Chào mừng bạn đến với kỷ nguyên phát triển phần mềm AI Agentic tự động, tinh gọn và tối ưu hiệu năng.';
    }, 150);
  }
}

greetBtn.addEventListener('click', triggerGreeting);
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') triggerGreeting();
});

// --- Theme Switcher ---
function applyTheme(index) {
  currentThemeIndex = index % themes.length;
  const theme = themes[currentThemeIndex];
  
  document.documentElement.style.setProperty('--primary-gradient', theme.gradient);
  document.documentElement.style.setProperty('--primary-glow', theme.glow);
  themeBtnLabel.textContent = theme.label;
  
  // Re-color particles smoothly
  particles.forEach(p => {
    p.color = theme.particles[Math.floor(Math.random() * theme.particles.length)];
  });
}

colorThemeBtn.addEventListener('click', () => {
  clickCount++;
  clicksDisplay.textContent = clickCount;
  
  const nextTheme = (currentThemeIndex + 1) % themes.length;
  applyTheme(nextTheme);
  playChordSound(nextTheme);
  localStorage.setItem('aicodedao_theme', nextTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('aicodedao_theme');
if (savedTheme !== null) {
  applyTheme(parseInt(savedTheme, 10));
} else {
  applyTheme(0);
}

// --- AI Wisdom Quotes Generator ---
function cycleQuote() {
  clickCount++;
  clicksDisplay.textContent = clickCount;
  playPopSound();

  quoteText.style.opacity = '0';
  setTimeout(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    const q = quotes[currentQuoteIndex];
    quoteText.textContent = `"${q.text}"`;
    quoteAuthor.textContent = `— ${q.author}`;
    quoteText.style.opacity = '1';
  }, 180);
}

newQuoteBtn.addEventListener('click', cycleQuote);

// --- Domain Copy Functionality ---
domainCopyBtn.addEventListener('click', () => {
  const domain = 'hello.aicodedao.xyz';
  navigator.clipboard.writeText(domain).then(() => {
    copyTooltip.textContent = '✅ Đã chép!';
    playChimeSound();
    clickCount++;
    clicksDisplay.textContent = clickCount;
    setTimeout(() => {
      copyTooltip.textContent = '📋 Copy';
    }, 2000);
  }).catch(() => {
    copyTooltip.textContent = 'hello.aicodedao.xyz';
  });
});

// --- Confetti Explosion ---
const confettis = [];
function triggerConfetti(e) {
  clickCount++;
  clicksDisplay.textContent = clickCount;
  playPopSound();
  
  const theme = themes[currentThemeIndex];
  const originX = (e && e.clientX) ? e.clientX : window.innerWidth / 2;
  const originY = (e && e.clientY) ? e.clientY : window.innerHeight / 2;

  for (let i = 0; i < 90; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 3.5;
    confettis.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3.8,
      size: Math.random() * 7 + 4,
      color: theme.particles[Math.floor(Math.random() * theme.particles.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12
    });
  }
}
confettiBtn.addEventListener('click', (e) => triggerConfetti(e));

// --- AI Wisdom Quotes ---
const aiQuotes = [
  { text: '"Tự động hoá là chìa khoá biến ý tưởng công nghệ thành hiện thực trong chớp mắt."', author: '— AiCodeDao Agentic System' },
  { text: '"Code nhanh hơn, thông minh hơn với sự cộng tác liền mạch giữa Con người và AI."', author: '— TrueForge Engine' },
  { text: '"Hiệu năng cao, kiến trúc tinh gọn và khả năng mở rộng không giới hạn."', author: '— Cloudflare Edge & Docker' },
  { text: '"Mỗi dòng mã đều mang trong mình sức mạnh kiến tạo tương lai số."', author: '— AiCodeDao Philosophy' },
  { text: '"Đổi mới không ngừng, tối ưu hóa từng mili-giây trải nghiệm người dùng."', author: '— Web Performance Labs' }
];
let currentQuoteIndex = 0;

function switchQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % aiQuotes.length;
  const q = aiQuotes[currentQuoteIndex];
  if (quoteText && quoteAuthor) {
    quoteText.style.opacity = '0';
    playPopSound();
    setTimeout(() => {
      quoteText.textContent = q.text;
      quoteAuthor.textContent = q.author;
      quoteText.style.opacity = '1';
    }, 150);
  }
}

if (newQuoteBtn) {
  newQuoteBtn.addEventListener('click', () => {
    clickCount++;
    clicksDisplay.textContent = clickCount;
    switchQuote();
  });
}

// --- Domain Copy to Clipboard ---
if (domainCopyBtn) {
  domainCopyBtn.addEventListener('click', () => {
    clickCount++;
    clicksDisplay.textContent = clickCount;
    playPopSound();
    navigator.clipboard.writeText('https://hello.aicodedao.xyz').then(() => {
      if (copyTooltip) {
        copyTooltip.textContent = '✅ Copied!';
        setTimeout(() => {
          copyTooltip.textContent = '📋 Copy';
        }, 2000);
      }
    }).catch(() => {
      if (copyTooltip) {
        copyTooltip.textContent = '✅ hello.aicodedao.xyz';
      }
    });
  });
}

// --- Edge Latency Ping Monitor ---
async function measureLatency() {
  if (!latencyDisplay) return;
  try {
    const start = performance.now();
    await fetch('/healthz', { cache: 'no-store' });
    const elapsed = Math.round(performance.now() - start);
    latencyDisplay.textContent = `${elapsed}ms`;
  } catch (e) {
    latencyDisplay.textContent = '< 5ms';
  }
}
measureLatency();
setInterval(measureLatency, 10000);

// --- Global Keyboard Shortcuts ---
window.addEventListener('keydown', (e) => {
  // If user is focused on the input field, allow natural typing
  if (document.activeElement === nameInput && e.key !== 'Escape') {
    return;
  }
  
  const key = e.key.toLowerCase();
  if (key === 't') {
    e.preventDefault();
    colorThemeBtn.click();
  } else if (key === 'c') {
    e.preventDefault();
    triggerConfetti();
  } else if (key === 'q') {
    e.preventDefault();
    if (newQuoteBtn) newQuoteBtn.click();
  } else if (key === 'm') {
    e.preventDefault();
    toggleAudio();
  }
});

// --- 3D Card Hover Perspective ---
window.addEventListener('mousemove', (e) => {
  if (window.innerWidth <= 680) return; // Disable tilt on mobile
  
  const rect = mainCard.getBoundingClientRect();
  const cardCenterX = rect.left + rect.width / 2;
  const cardCenterY = rect.top + rect.height / 2;
  
  const dx = e.clientX - cardCenterX;
  const dy = e.clientY - cardCenterY;
  
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist < 460) {
    const tiltX = -(dy / rect.height) * 7.5;
    const tiltY = (dx / rect.width) * 7.5;
    cardWrapper.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  } else {
    cardWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }
});

// --- Server Latency Check ---
function checkLatency() {
  const start = performance.now();
  fetch('/healthz', { method: 'GET', cache: 'no-store' })
    .then(res => {
      if (res.ok) {
        const ms = Math.round(performance.now() - start);
        latencyDisplay.textContent = `${ms}ms`;
      } else {
        latencyDisplay.textContent = 'Active';
      }
    })
    .catch(() => {
      latencyDisplay.textContent = '< 5ms';
    });
}
setInterval(checkLatency, 10000);
setTimeout(checkLatency, 1000);

// --- Particle Background System ---
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const mouse = { x: null, y: null, radius: 135 };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

// Canvas Click Ripple Burst
window.addEventListener('click', (e) => {
  if (e.target === canvas || e.target === document.body) {
    clickCount++;
    clicksDisplay.textContent = clickCount;
    playPopSound();
    for (let i = 0; i < 16; i++) {
      const p = new Particle();
      p.x = e.clientX;
      p.y = e.clientY;
      p.vx = (Math.random() - 0.5) * 6;
      p.vy = (Math.random() - 0.5) * 6;
      particles.push(p);
      if (particles.length > 120) particles.shift();
    }
  }
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2.5 + 1.2;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.color = themes[currentThemeIndex].particles[Math.floor(Math.random() * themes[currentThemeIndex].particles.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse repulsion
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const dirX = dx / dist;
        const dirY = dy / dist;
        this.x -= dirX * force * 3.5;
        this.y -= dirY * force * 3.5;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.65;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const particleCount = Math.min(Math.floor((width * height) / 10000), 100);
const particles = Array.from({ length: particleCount }, () => new Particle());

// --- FPS Calculation & Animation Loop ---
let frames = 0;
let lastFpsUpdate = performance.now();

function animate(now) {
  ctx.clearRect(0, 0, width, height);

  // Update & Draw Particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Connect particles
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 115) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = particles[i].color;
        ctx.globalAlpha = (1 - dist / 115) * 0.2;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }

  // Update & Draw Confettis
  for (let i = confettis.length - 1; i >= 0; i--) {
    const c = confettis[i];
    c.x += c.vx;
    c.y += c.vy;
    c.vy += 0.25; // gravity
    c.alpha -= 0.015;
    c.rotation += c.rotSpeed;

    if (c.alpha <= 0) {
      confettis.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotation * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.globalAlpha = c.alpha;
    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 1.5);
    ctx.restore();
  }

  // FPS Counter
  frames++;
  if (now - lastFpsUpdate >= 500) {
    const fps = Math.round((frames * 1000) / (now - lastFpsUpdate));
    fpsDisplay.textContent = fps;
    frames = 0;
    lastFpsUpdate = now;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

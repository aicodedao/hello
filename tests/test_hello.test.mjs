/**
 * AiCodeDao • Hello Project Comprehensive Native Node.js Test Suite (v5.0)
 * Uses native node:test and node:assert for zero-dependency test execution directly from Node.
 *
 * Validates:
 * 1. Static code assets (HTML structure, CSS rules/tokens, JS syntax/engines, Nginx & Docker configs)
 * 2. Cyber HUD 3D Core, Gemini AI Assistant, Web Audio Pro+ features
 * 3. Local container runtime (port 8080, /healthz, caching, response headers)
 * 4. Public Cloudflare Tunnel Edge ingress (https://hello.aicodedao.xyz)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const INDEX_HTML = path.join(BASE_DIR, 'index.html');
const STYLE_CSS = path.join(BASE_DIR, 'style.css');
const SCRIPT_JS = path.join(BASE_DIR, 'script.js');
const NGINX_CONF = path.join(BASE_DIR, 'nginx.conf');
const DOCKERFILE = path.join(BASE_DIR, 'Dockerfile');
const COMPOSE_FILE = path.join(BASE_DIR, 'docker-compose.yml');

describe('AiCodeDao • Hello Suite - Static Code & Config Assertions', () => {
  it('1. index.html contains complete HTML5 structure, HUD 3D, and AI assistant elements', () => {
    assert.ok(fs.existsSync(INDEX_HTML), 'index.html must exist');
    const html = fs.readFileSync(INDEX_HTML, 'utf-8');

    assert.ok(html.includes('<!DOCTYPE html>'), 'Must contain <!DOCTYPE html>');
    assert.ok(html.includes('<html lang="vi">'), 'Must set lang="vi"');
    assert.ok(html.includes('AiCodeDao • Next-Gen Agentic Hello ✨ (v5.0)'), 'Must have proper title');
    assert.ok(html.includes('id="particles-canvas"'), 'Must have particles canvas');
    assert.ok(html.includes('id="hud-3d-canvas"'), 'Must have 3D HUD canvas');
    assert.ok(html.includes('id="main-card"'), 'Must have main card');
    assert.ok(html.includes('id="audio-wave"'), 'Must have audio wave visualizer');
    assert.ok(html.includes('id="canvas-mode-btn"'), 'Must have canvas mode toggle button');

    // AI Assistant Chatbot & API Modal
    assert.ok(html.includes('id="ai-assistant-section"'), 'Must have AI assistant section');
    assert.ok(html.includes('id="ai-chat-messages"'), 'Must have AI chat messages container');
    assert.ok(html.includes('id="ai-config-btn"'), 'Must have AI config button');
    assert.ok(html.includes('id="api-key-modal"'), 'Must have API key modal');
    assert.ok(html.includes('id="gemini-api-key-input"'), 'Must have Gemini API key input');

    // 8 Languages
    const languages = ['vi', 'en', 'ja', 'fr', 'es', 'ko', 'de', 'zh'];
    for (const lang of languages) {
      assert.ok(html.includes(`data-lang="${lang}"`), `Missing language button for ${lang}`);
    }

    // 4 AI Agent HUD Cards
    const agents = ['architect', 'reviewer', 'devops', 'ux'];
    for (const agent of agents) {
      assert.ok(html.includes(`data-agent="${agent}"`), `Missing agent card for ${agent}`);
    }

    // CLI Quick Chips
    const chips = ['/status', '/ai', '/hud3d', '/apikey', '/quote', '/theme', '/canvas', '/confetti', '/agents', '/sound', '/ping', '/help'];
    for (const chip of chips) {
      assert.ok(html.includes(`data-cmd="${chip}"`), `Missing quick chip for ${chip}`);
    }

    // QR Modal & Shortcuts
    assert.ok(html.includes('id="qr-modal"'), 'Must have QR modal');
    assert.ok(html.includes('id="smart-share-btn"'), 'Must have smart share button');
    assert.ok(html.includes('id="close-modal-btn"'), 'Must have close modal button');
    assert.ok(html.includes('class="keyboard-hints"'), 'Must have keyboard shortcuts hint');
  });

  it('2. style.css includes Cyber-Glassmorphism 3.0 tokens, HUD 3D styles, and responsive rules', () => {
    assert.ok(fs.existsSync(STYLE_CSS), 'style.css must exist');
    const css = fs.readFileSync(STYLE_CSS, 'utf-8');

    assert.ok(css.includes('backdrop-filter'), 'Must include backdrop-filter');
    assert.ok(css.includes('--bg-dark'), 'Must include --bg-dark variable');
    assert.ok(css.includes('--primary-gradient'), 'Must include --primary-gradient');
    assert.ok(css.includes('--primary-glow'), 'Must include --primary-glow');
    assert.ok(css.includes('.glass-card'), 'Must include .glass-card');
    assert.ok(css.includes('.hud-3d-canvas'), 'Must include .hud-3d-canvas');
    assert.ok(css.includes('.cyber-core-wrapper'), 'Must include .cyber-core-wrapper');
    assert.ok(css.includes('.ai-assistant-section'), 'Must include .ai-assistant-section');
    assert.ok(css.includes('.ai-chat-card'), 'Must include .ai-chat-card');
    assert.ok(css.includes('.chat-bubble'), 'Must include .chat-bubble');
    assert.ok(css.includes('.code-block-wrapper'), 'Must include .code-block-wrapper');
    assert.ok(css.includes('.ai-typing-indicator'), 'Must include .ai-typing-indicator');

    // Responsive design
    assert.ok(css.includes('@media'), 'Must include media queries');
    assert.ok(css.includes('max-width: 768px'), 'Must include mobile responsive breakpoint');
  });

  it('3. script.js has valid syntax and includes all v5.0 core engines and dictionaries', () => {
    assert.ok(fs.existsSync(SCRIPT_JS), 'script.js must exist');

    // Syntax validation via node --check
    assert.doesNotThrow(() => {
      execSync(`node --check "${SCRIPT_JS}"`, { stdio: 'pipe' });
    }, 'script.js syntax check failed');

    const js = fs.readFileSync(SCRIPT_JS, 'utf-8');

    // Core functions
    const coreFns = ['renderHud3dCore', 'executeAiResponse', 'streamTextToBubble', 'generateMockResponse', 'parseMarkdown'];
    for (const fn of coreFns) {
      assert.ok(js.includes(fn), `Missing core function ${fn} in script.js`);
    }

    // 6 Themes
    const themes = ['Cyber Aurora', 'Emerald Nexus', 'Solar Flare', 'Deep Cosmos', 'Matrix Cyber', 'Hyper Sunset'];
    for (const theme of themes) {
      assert.ok(js.includes(theme), `Missing theme ${theme} in script.js`);
    }

    // Sound Presets
    const presets = ['Cyber Synth', '8-Bit Arcade', 'Zen Chime', 'ASMR Click', 'Sci-Fi Holo', 'Muted'];
    for (const preset of presets) {
      assert.ok(js.includes(preset), `Missing sound preset ${preset} in script.js`);
    }

    // 4 Canvas Modes
    const canvasModes = ["'neural'", "'matrix'", "'starfield'", "'warp'"];
    for (const mode of canvasModes) {
      assert.ok(js.includes(mode), `Missing canvas mode ${mode} in script.js`);
    }

    // 8 Languages
    const languages = ['vi', 'en', 'ja', 'fr', 'es', 'ko', 'de', 'zh'];
    for (const lang of languages) {
      assert.ok(js.includes(`${lang}:`), `Missing language dictionary for ${lang} in script.js`);
    }

    // Web Audio API
    assert.ok(js.includes('AudioContext'), 'Must use AudioContext for Web Audio Synth');
    assert.ok(js.includes('ai-token'), 'Must support ai-token sound');
    assert.ok(js.includes('ai-complete'), 'Must support ai-complete sound');
    assert.ok(js.includes('measureLatency'), 'Must have latency measurement helper');
  });

  it('4. nginx.conf, Dockerfile, and docker-compose.yml configuration files are valid', () => {
    // Nginx
    assert.ok(fs.existsSync(NGINX_CONF), 'nginx.conf must exist');
    const nginx = fs.readFileSync(NGINX_CONF, 'utf-8');
    assert.ok(nginx.includes('listen 8080'), 'nginx must listen on port 8080');
    assert.ok(nginx.includes('location = /healthz'), 'nginx must have /healthz endpoint');
    assert.ok(nginx.includes('gzip on'), 'nginx must enable gzip');
    assert.ok(nginx.includes('X-Frame-Options'), 'nginx must have security header X-Frame-Options');

    // Dockerfile
    assert.ok(fs.existsSync(DOCKERFILE), 'Dockerfile must exist');
    const df = fs.readFileSync(DOCKERFILE, 'utf-8');
    assert.ok(df.includes('FROM nginx:alpine-slim'), 'Dockerfile must use nginx:alpine-slim');
    assert.ok(df.includes('EXPOSE 8080'), 'Dockerfile must expose port 8080');
    assert.ok(df.includes('HEALTHCHECK'), 'Dockerfile must declare HEALTHCHECK');

    // Docker Compose
    assert.ok(fs.existsSync(COMPOSE_FILE), 'docker-compose.yml must exist');
    const dc = fs.readFileSync(COMPOSE_FILE, 'utf-8');
    assert.ok(dc.includes('hello:'), 'Compose must declare hello service');
    assert.ok(dc.includes('hello-tunnel:'), 'Compose must declare hello-tunnel service');
    assert.ok(dc.includes('8080:8080'), 'Compose must map port 8080:8080');
  });
});

describe('AiCodeDao • Hello Suite - Runtime & Network Ingress Verification', () => {
  it('5. Local container /healthz endpoint returns HTTP 200 OK', async () => {
    const url = 'http://localhost:8080/healthz';
    const res = await fetch(url, { headers: { 'User-Agent': 'AiCodeDao-NodeTester/5.0' } });
    assert.strictEqual(res.status, 200, `Expected HTTP 200 from local healthz, got ${res.status}`);
    const text = (await res.text()).trim();
    assert.strictEqual(text, 'OK', `Expected 'OK' response body, got '${text}'`);
  });

  it('6. Local container index.html returns HTTP 200 with web application title', async () => {
    const url = 'http://localhost:8080/';
    const res = await fetch(url, { headers: { 'User-Agent': 'AiCodeDao-NodeTester/5.0' } });
    assert.strictEqual(res.status, 200, `Expected HTTP 200 from local index, got ${res.status}`);
    const html = await res.text();
    assert.ok(html.includes('AiCodeDao • Next-Gen Agentic Hello'), 'Index body must contain application title');
  });

  it('7. Public Cloudflare Tunnel Edge /healthz endpoint returns HTTP 200 OK', async () => {
    const url = 'https://hello.aicodedao.xyz/healthz';
    const startTime = performance.now();
    const res = await fetch(url, { headers: { 'User-Agent': 'AiCodeDao-NodeTester/5.0' } });
    const latency = Math.round(performance.now() - startTime);

    assert.strictEqual(res.status, 200, `Expected HTTP 200 from Cloudflare Edge healthz, got ${res.status}`);
    const text = (await res.text()).trim();
    assert.strictEqual(text, 'OK', `Expected 'OK' response body, got '${text}'`);
    console.log(`\n      [Node Live Ingress] https://hello.aicodedao.xyz/healthz: ${latency}ms (HTTP 200 OK)`);
  });

  it('8. Public Cloudflare Tunnel Edge index page is served over Cloudflare CDN with HTTP 200', async () => {
    const url = 'https://hello.aicodedao.xyz/';
    const startTime = performance.now();
    const res = await fetch(url, { headers: { 'User-Agent': 'AiCodeDao-NodeTester/5.0' } });
    const latency = Math.round(performance.now() - startTime);

    assert.strictEqual(res.status, 200, `Expected HTTP 200 from Cloudflare Edge index, got ${res.status}`);
    const serverHeader = res.headers.get('server') || '';
    assert.ok(serverHeader.toLowerCase().includes('cloudflare'), `Expected Cloudflare server header, got '${serverHeader}'`);
    const html = await res.text();
    assert.ok(html.includes('AiCodeDao • Next-Gen Agentic Hello'), 'Index body must contain application title');
    console.log(`      [Node Live Ingress] https://hello.aicodedao.xyz/: ${latency}ms (HTTP/2 200, Cloudflare Edge)`);
  });
});

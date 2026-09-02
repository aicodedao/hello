/**
 * AiCodeDao • Hello Project Comprehensive Native Node.js Test Suite (v6.0)
 * Uses native node:test and node:assert for zero-dependency test execution directly from Node.
 *
 * Validates:
 * 1. Static code assets (HTML structure, CSS rules/tokens, JS syntax/engines, Nginx & Docker configs, Manifest)
 * 2. Multi-Model Workflow Studio, Cyber HUD 3D 7-Polyhedra, Mini AI Game v2.0, Code Lab, AI Benchmark, Two-Way Voice
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
const MANIFEST_JSON = path.join(BASE_DIR, 'manifest.json');

describe('AiCodeDao • Hello Suite - Static Code & Config Assertions (v6.0)', () => {
  it('1. index.html contains complete HTML5 structure, Workflow Studio, HUD 3D, Code Lab, Benchmark, Game v2.0, and Two-Way Voice elements', () => {
    assert.ok(fs.existsSync(INDEX_HTML), 'index.html must exist');
    const html = fs.readFileSync(INDEX_HTML, 'utf-8');

    assert.ok(html.includes('<!DOCTYPE html>'), 'Must contain <!DOCTYPE html>');
    assert.ok(html.includes('<html lang="vi">'), 'Must set lang="vi"');
    assert.ok(html.includes('AiCodeDao • Next-Gen Agentic Hello ✨ (v6.0)'), 'Must have v6.0 title');
    assert.ok(html.includes('id="particles-canvas"'), 'Must have particles canvas');
    assert.ok(html.includes('id="hud-3d-canvas"'), 'Must have 3D HUD canvas');
    assert.ok(html.includes('id="shape-toggle-btn"'), 'Must have 3D shape toggle button');
    assert.ok(html.includes('id="main-card"'), 'Must have main card');
    assert.ok(html.includes('id="audio-wave"'), 'Must have audio wave visualizer');
    assert.ok(html.includes('id="binaural-drone-btn"'), 'Must have binaural drone button');

    // Multi-Model Workflow Studio
    assert.ok(html.includes('id="workflow-studio-section"'), 'Must have workflow studio section');
    assert.ok(html.includes('id="run-workflow-btn"'), 'Must have run workflow button');
    assert.ok(html.includes('id="dag-pipeline"'), 'Must have dag pipeline container');
    assert.ok(html.includes('id="stage-1"'), 'Must have stage 1');
    assert.ok(html.includes('id="stage-5"'), 'Must have stage 5');
    assert.ok(html.includes('id="workflow-console-body"'), 'Must have workflow console body');

    // Mini AI Game Modal & EMP Elements
    assert.ok(html.includes('id="mini-game-btn"'), 'Must have mini game launch button');
    assert.ok(html.includes('id="mini-game-modal"'), 'Must have mini game modal');
    assert.ok(html.includes('id="mini-game-canvas"'), 'Must have mini game canvas');
    assert.ok(html.includes('id="game-score"'), 'Must have game score element');
    assert.ok(html.includes('id="game-combo"'), 'Must have game combo element');
    assert.ok(html.includes('id="game-shields"'), 'Must have game shields element');
    assert.ok(html.includes('id="game-emp"'), 'Must have game EMP element');
    assert.ok(html.includes('id="game-emp-btn"'), 'Must have game EMP button');

    // Code Lab Playground Modal
    assert.ok(html.includes('id="codelab-modal"'), 'Must have codelab modal');
    assert.ok(html.includes('id="codelab-code-input"'), 'Must have codelab textarea input');
    assert.ok(html.includes('id="codelab-sandbox-frame"'), 'Must have codelab sandbox iframe');

    // Benchmark Modal
    assert.ok(html.includes('id="benchmark-modal"'), 'Must have benchmark modal');
    assert.ok(html.includes('id="start-benchmark-btn"'), 'Must have start benchmark button');
    assert.ok(html.includes('id="benchmark-tier-score"'), 'Must have benchmark tier score element');

    // AI Assistant Chatbot, Two-Way Voice & Export
    assert.ok(html.includes('id="ai-assistant-section"'), 'Must have AI assistant section');
    assert.ok(html.includes('id="ai-chat-messages"'), 'Must have AI chat messages container');
    assert.ok(html.includes('id="ai-mic-btn"'), 'Must have Voice STT mic button');
    assert.ok(html.includes('id="ai-tts-btn"'), 'Must have Voice TTS button');
    assert.ok(html.includes('id="ai-export-btn"'), 'Must have chat export button');
    assert.ok(html.includes('id="api-key-modal"'), 'Must have API key modal');

    // 8 Languages
    const languages = ['vi', 'en', 'ja', 'fr', 'es', 'ko', 'de', 'zh'];
    for (const lang of languages) {
      assert.ok(html.includes(`data-lang="${lang}"`), `Missing language button for ${lang}`);
    }

    // CLI Quick Chips
    const chips = ['/game', '/shapes', '/workflow', '/benchmark', '/codelab', '/drone', '/status', '/ai', '/help'];
    for (const chip of chips) {
      assert.ok(html.includes(`data-cmd="${chip}"`), `Missing quick chip for ${chip}`);
    }

    // Manifest & Viewport
    assert.ok(html.includes('manifest.json'), 'Must link manifest.json');
    assert.ok(html.includes('viewport-fit=cover'), 'Must include viewport-fit=cover for iPhone safe area rendering');
  });

  it('2. style.css includes Cyber-Glassmorphism tokens, iPhone/MacBook rendering fixes, and responsive layout', () => {
    assert.ok(fs.existsSync(STYLE_CSS), 'style.css must exist');
    const css = fs.readFileSync(STYLE_CSS, 'utf-8');

    assert.ok(css.includes('backdrop-filter'), 'Must include backdrop-filter');
    assert.ok(css.includes('--bg-dark'), 'Must include --bg-dark variable');
    assert.ok(css.includes('--primary-gradient'), 'Must include --primary-gradient');
    assert.ok(css.includes('.glass-card'), 'Must include .glass-card');
    assert.ok(css.includes('.workflow-studio-card'), 'Must include .workflow-studio-card');
    assert.ok(css.includes('.dag-pipeline-container'), 'Must include .dag-pipeline-container');
    assert.ok(css.includes('.codelab-dialog'), 'Must include .codelab-dialog');
    assert.ok(css.includes('.benchmark-score-card'), 'Must include .benchmark-score-card');
    assert.ok(css.includes('.game-modal-dialog'), 'Must include .game-modal-dialog');
    assert.ok(css.includes('.ai-mic-btn'), 'Must include .ai-mic-btn');

    // Cross-Device & Responsive Rendering Rules
    assert.ok(css.includes('pointer-events: none;'), 'Background canvas must have pointer-events: none to avoid blocking mobile touch');
    assert.ok(css.includes('safe-area-inset-top'), 'Body must support iOS safe area insets');
    assert.ok(css.includes('@media (hover: none)'), 'Must hide cursor glow on touch devices');
    assert.ok(css.includes('max-width: 768px'), 'Must include mobile responsive breakpoint');
  });

  it('3. script.js has valid syntax, DPR scaling, and includes all v6.0 core engines and classes', () => {
    assert.ok(fs.existsSync(SCRIPT_JS), 'script.js must exist');

    // Syntax validation via node --check
    assert.doesNotThrow(() => {
      execSync(`node --check "${SCRIPT_JS}"`, { stdio: 'pipe' });
    }, 'script.js syntax check failed');

    const js = fs.readFileSync(SCRIPT_JS, 'utf-8');

    // DPR Scaling
    assert.ok(js.includes('devicePixelRatio'), 'Must support devicePixelRatio for MacBook Retina & iPhone');
    assert.ok(js.includes('setTransform'), 'Must set canvas transform according to DPR');

    // Core Classes
    const coreClasses = ['WebAudioEngine', 'Hud3DPolyhedraReactor', 'WorkflowSimulator', 'CodeLabEngine', 'BenchmarkSuite', 'MiniGameEngine', 'GeminiAssistant', 'BackgroundCanvas'];
    for (const cls of coreClasses) {
      assert.ok(js.includes(cls), `Missing core class ${cls} in script.js`);
    }

    // 7 Polyhedra 3D Shapes
    const shapes = ['Icosahedron', 'Hypercube 4D', 'Quantum Dodecahedron', 'Octahedron', 'Klein Torus', 'Stellated Star', 'DNA Helix'];
    for (const shape of shapes) {
      assert.ok(js.includes(shape), `Missing shape ${shape} in script.js`);
    }

    // 8 Languages
    const languages = ['vi', 'en', 'ja', 'fr', 'es', 'ko', 'de', 'zh'];
    for (const lang of languages) {
      assert.ok(js.includes(`${lang}:`), `Missing language dictionary for ${lang} in script.js`);
    }
  });

  it('4. nginx.conf, Dockerfile, docker-compose.yml, and manifest.json are valid', () => {
    // Nginx
    assert.ok(fs.existsSync(NGINX_CONF), 'nginx.conf must exist');
    const nginx = fs.readFileSync(NGINX_CONF, 'utf-8');
    assert.ok(nginx.includes('listen 8080'), 'nginx must listen on port 8080');
    assert.ok(nginx.includes('location = /healthz'), 'nginx must have /healthz endpoint');

    // Dockerfile
    assert.ok(fs.existsSync(DOCKERFILE), 'Dockerfile must exist');
    const df = fs.readFileSync(DOCKERFILE, 'utf-8');
    assert.ok(df.includes('FROM nginx:alpine-slim'), 'Dockerfile must use nginx:alpine-slim');
    assert.ok(df.includes('EXPOSE 8080'), 'Dockerfile must expose port 8080');

    // Docker Compose
    assert.ok(fs.existsSync(COMPOSE_FILE), 'docker-compose.yml must exist');
    const dc = fs.readFileSync(COMPOSE_FILE, 'utf-8');
    assert.ok(dc.includes('hello:'), 'Compose must declare hello service');
    assert.ok(dc.includes('hello-tunnel:'), 'Compose must declare hello-tunnel service');

    // Manifest
    assert.ok(fs.existsSync(MANIFEST_JSON), 'manifest.json must exist');
    const mf = JSON.parse(fs.readFileSync(MANIFEST_JSON, 'utf-8'));
    assert.ok(mf.name.includes('AiCodeDao'), 'Manifest must have proper name');
  });
});

describe('AiCodeDao • Hello Suite - Runtime & Network Ingress Verification', () => {
  it('5. Local container /healthz endpoint returns HTTP 200 OK', async () => {
    const url = 'http://localhost:8080/healthz';
    const res = await fetch(url, { headers: { 'User-Agent': 'AiCodeDao-NodeTester/6.0' } });
    assert.strictEqual(res.status, 200, `Expected HTTP 200 from local healthz, got ${res.status}`);
    const text = (await res.text()).trim();
    assert.strictEqual(text, 'OK', `Expected 'OK' response body, got '${text}'`);
  });

  it('6. Local container index.html returns HTTP 200 with web application title', async () => {
    const url = 'http://localhost:8080/';
    const res = await fetch(url, { headers: { 'User-Agent': 'AiCodeDao-NodeTester/6.0' } });
    assert.strictEqual(res.status, 200, `Expected HTTP 200 from local index, got ${res.status}`);
    const html = await res.text();
    assert.ok(html.includes('AiCodeDao • Next-Gen Agentic Hello'), 'Index body must contain application title');
  });

  it('7. Public Cloudflare Tunnel Edge /healthz endpoint returns HTTP 200 OK', async () => {
    const url = 'https://hello.aicodedao.xyz/healthz';
    const startTime = performance.now();
    const res = await fetch(url, { headers: { 'User-Agent': 'AiCodeDao-NodeTester/6.0' } });
    const latency = Math.round(performance.now() - startTime);

    assert.strictEqual(res.status, 200, `Expected HTTP 200 from Cloudflare Edge healthz, got ${res.status}`);
    const text = (await res.text()).trim();
    assert.strictEqual(text, 'OK', `Expected 'OK' response body, got '${text}'`);
    console.log(`\n      [Node Live Ingress] https://hello.aicodedao.xyz/healthz: ${latency}ms (HTTP 200 OK)`);
  });

  it('8. Public Cloudflare Tunnel Edge index page is served over Cloudflare CDN with HTTP 200', async () => {
    const url = 'https://hello.aicodedao.xyz/';
    const startTime = performance.now();
    const res = await fetch(url, { headers: { 'User-Agent': 'AiCodeDao-NodeTester/6.0' } });
    const latency = Math.round(performance.now() - startTime);

    assert.strictEqual(res.status, 200, `Expected HTTP 200 from Cloudflare Edge index, got ${res.status}`);
    const serverHeader = res.headers.get('server') || '';
    assert.ok(serverHeader.toLowerCase().includes('cloudflare'), `Expected Cloudflare server header, got '${serverHeader}'`);
    const html = await res.text();
    assert.ok(html.includes('AiCodeDao • Next-Gen Agentic Hello'), 'Index body must contain application title');
    console.log(`      [Node Live Ingress] https://hello.aicodedao.xyz/: ${latency}ms (HTTP/2 200, Cloudflare Edge)`);
  });
});

#!/usr/bin/env python3
"""
AiCodeDao • Hello Project Comprehensive Test Suite (v5.0)
Validates:
1. Static code assets (HTML structure, CSS rules/tokens, JS syntax/engines, Nginx configuration)
2. Cyber HUD 3D Core, Gemini AI Assistant, and Web Audio Pro+ features
3. Dockerfile & Docker Compose configurations
4. Local container runtime (port 8080, health endpoint, caching, response headers)
5. Public Cloudflare Tunnel Edge ingress (https://hello.aicodedao.xyz)
"""

import os
import re
import sys
import json
import time
import urllib.request
import urllib.error
import subprocess
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_HTML = os.path.join(BASE_DIR, "index.html")
STYLE_CSS = os.path.join(BASE_DIR, "style.css")
SCRIPT_JS = os.path.join(BASE_DIR, "script.js")
NGINX_CONF = os.path.join(BASE_DIR, "nginx.conf")
DOCKERFILE = os.path.join(BASE_DIR, "Dockerfile")
COMPOSE_FILE = os.path.join(BASE_DIR, "docker-compose.yml")


class TestStaticAssets(unittest.TestCase):
    """1. Static Code Analysis & Syntax Assertions (v5.0)"""

    def test_index_html_structure(self):
        self.assertTrue(os.path.exists(INDEX_HTML), "index.html must exist")
        with open(INDEX_HTML, "r", encoding="utf-8") as f:
            html = f.read()

        # Semantic Structure
        self.assertIn("<!DOCTYPE html>", html)
        self.assertIn('<html lang="vi">', html)
        self.assertIn("AiCodeDao • Next-Gen Agentic Hello ✨ (v5.0)", html)
        self.assertIn('id="particles-canvas"', html)
        self.assertIn('id="hud-3d-canvas"', html)
        self.assertIn('id="main-card"', html)
        self.assertIn('id="audio-wave"', html)
        self.assertIn('id="canvas-mode-btn"', html)

        # AI Assistant Chatbot & API Modal
        self.assertIn('id="ai-assistant-section"', html)
        self.assertIn('id="ai-chat-messages"', html)
        self.assertIn('id="ai-config-btn"', html)
        self.assertIn('id="api-key-modal"', html)
        self.assertIn('id="gemini-api-key-input"', html)

        # 8 Language Buttons
        for lang in ["vi", "en", "ja", "fr", "es", "ko", "de", "zh"]:
            self.assertIn(f'data-lang="{lang}"', html, f"Language button for {lang} missing")

        # 4 AI Agent HUD Cards
        for agent in ["architect", "reviewer", "devops", "ux"]:
            self.assertIn(f'data-agent="{agent}"', html, f"Agent card for {agent} missing")

        # CLI Quick Chips including /ai, /hud3d, /apikey
        chips = ["/status", "/ai", "/hud3d", "/apikey", "/quote", "/theme", "/canvas", "/confetti", "/agents", "/sound", "/ping", "/help"]
        for chip in chips:
            self.assertIn(f'data-cmd="{chip}"', html, f"Quick chip for {chip} missing")

        # QR Modal & Keyboard Shortcuts
        self.assertIn('id="qr-modal"', html)
        self.assertIn('id="smart-share-btn"', html)
        self.assertIn('id="close-modal-btn"', html)
        self.assertIn('class="keyboard-hints"', html)

    def test_style_css_rules_and_tokens(self):
        self.assertTrue(os.path.exists(STYLE_CSS), "style.css must exist")
        with open(STYLE_CSS, "r", encoding="utf-8") as f:
            css = f.read()

        # Check CSS properties & tokens
        self.assertIn("backdrop-filter", css)
        self.assertIn("--bg-dark", css)
        self.assertIn("--primary-gradient", css)
        self.assertIn("--primary-glow", css)
        self.assertIn(".glass-card", css)
        self.assertIn(".hud-3d-canvas", css)
        self.assertIn(".cyber-core-wrapper", css)
        self.assertIn(".ai-assistant-section", css)
        self.assertIn(".ai-chat-card", css)
        self.assertIn(".chat-bubble", css)
        self.assertIn(".code-block-wrapper", css)
        self.assertIn(".ai-typing-indicator", css)

        # Responsive Breakpoints
        self.assertIn("@media", css)
        self.assertIn("max-width: 768px", css)

    def test_script_js_syntax_and_engine(self):
        self.assertTrue(os.path.exists(SCRIPT_JS), "script.js must exist")
        
        # Verify Javascript syntax via node --check
        res = subprocess.run(["node", "--check", SCRIPT_JS], capture_output=True, text=True)
        self.assertEqual(res.returncode, 0, f"JS Syntax Error: {res.stderr}")

        with open(SCRIPT_JS, "r", encoding="utf-8") as f:
            js = f.read()

        # Check v5.0 Core Functions
        self.assertIn("renderHud3dCore", js)
        self.assertIn("executeAiResponse", js)
        self.assertIn("streamTextToBubble", js)
        self.assertIn("generateMockResponse", js)
        self.assertIn("parseMarkdown", js)

        # Check 6 Themes
        themes = ["Cyber Aurora", "Emerald Nexus", "Solar Flare", "Deep Cosmos", "Matrix Cyber", "Hyper Sunset"]
        for theme in themes:
            self.assertIn(theme, js, f"Theme {theme} missing in script.js")

        # Check Sound Presets
        for preset in ["Cyber Synth", "8-Bit Arcade", "Zen Chime", "ASMR Click", "Sci-Fi Holo", "Muted"]:
            self.assertIn(preset, js, f"Preset {preset} missing in script.js")

        # 4 Canvas Modes
        for mode in ["neural", "matrix", "starfield", "warp"]:
            self.assertIn(f"'{mode}'", js, f"Canvas mode {mode} missing in script.js")

        # 8 Languages
        for lang in ["vi", "en", "ja", "fr", "es", "ko", "de", "zh"]:
            self.assertIn(f"{lang}:", js, f"Language dictionary {lang} missing in script.js")

        # Web Audio API Synth Pro+
        self.assertIn("AudioContext", js)
        self.assertIn("ai-token", js)
        self.assertIn("ai-complete", js)
        self.assertIn("measureLatency", js)

    def test_nginx_and_docker_configs(self):
        # Nginx Config
        self.assertTrue(os.path.exists(NGINX_CONF), "nginx.conf must exist")
        with open(NGINX_CONF, "r", encoding="utf-8") as f:
            conf = f.read()
        self.assertIn("listen 8080", conf)
        self.assertIn("location = /healthz", conf)
        self.assertIn("gzip on", conf)
        self.assertIn("X-Frame-Options", conf)
        self.assertIn("X-Content-Type-Options", conf)

        # Dockerfile
        self.assertTrue(os.path.exists(DOCKERFILE), "Dockerfile must exist")
        with open(DOCKERFILE, "r", encoding="utf-8") as f:
            df = f.read()
        self.assertIn("FROM nginx:alpine-slim", df)
        self.assertIn("EXPOSE 8080", df)
        self.assertIn("HEALTHCHECK", df)

        # Docker Compose
        self.assertTrue(os.path.exists(COMPOSE_FILE), "docker-compose.yml must exist")
        with open(COMPOSE_FILE, "r", encoding="utf-8") as f:
            dc = f.read()
        self.assertIn("hello:", dc)
        self.assertIn("hello-tunnel:", dc)
        self.assertIn("8080:8080", dc)


class TestRuntimeEndpoints(unittest.TestCase):
    """2. Container Runtime & Network Ingress Verification"""

    def test_local_healthz_endpoint(self):
        url = "http://localhost:8080/healthz"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "AiCodeDao-Tester/5.0"})
            with urllib.request.urlopen(req, timeout=5) as response:
                status_code = response.getcode()
                body = response.read().decode("utf-8").strip()
                self.assertEqual(status_code, 200, f"Local healthz returned HTTP {status_code}")
                self.assertEqual(body, "OK", f"Healthz body expected 'OK', got '{body}'")
        except Exception as e:
            self.fail(f"Local healthz request failed: {e}")

    def test_local_index_html_endpoint(self):
        url = "http://localhost:8080/"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "AiCodeDao-Tester/5.0"})
            with urllib.request.urlopen(req, timeout=5) as response:
                status_code = response.getcode()
                body = response.read().decode("utf-8")
                self.assertEqual(status_code, 200)
                self.assertIn("AiCodeDao • Next-Gen Agentic Hello", body)
        except Exception as e:
            self.fail(f"Local index request failed: {e}")

    def test_public_cloudflare_tunnel_healthz(self):
        url = "https://hello.aicodedao.xyz/healthz"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "AiCodeDao-Tester/5.0"})
            start_t = time.time()
            with urllib.request.urlopen(req, timeout=10) as response:
                elapsed = (time.time() - start_t) * 1000
                status_code = response.getcode()
                body = response.read().decode("utf-8").strip()
                self.assertEqual(status_code, 200, f"Public healthz returned HTTP {status_code}")
                self.assertEqual(body, "OK")
                print(f"\n   [Edge Latency] https://hello.aicodedao.xyz/healthz: {elapsed:.1f}ms (HTTP 200 OK)")
        except Exception as e:
            self.fail(f"Public Cloudflare Tunnel healthz check failed: {e}")

    def test_public_cloudflare_tunnel_index(self):
        url = "https://hello.aicodedao.xyz/"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "AiCodeDao-Tester/5.0"})
            start_t = time.time()
            with urllib.request.urlopen(req, timeout=10) as response:
                elapsed = (time.time() - start_t) * 1000
                status_code = response.getcode()
                headers = dict(response.info())
                body = response.read().decode("utf-8")
                self.assertEqual(status_code, 200)
                self.assertIn("AiCodeDao • Next-Gen Agentic Hello", body)
                server_header = headers.get("Server", headers.get("server", ""))
                self.assertIn("cloudflare", server_header.lower())
                print(f"   [Edge Ingress] https://hello.aicodedao.xyz/: {elapsed:.1f}ms (HTTP/2 200, Cloudflare Edge)")
        except Exception as e:
            self.fail(f"Public Cloudflare Tunnel index check failed: {e}")


if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("⚡ AiCodeDao • Running Hello Comprehensive Test Suite v5.0")
    print("=" * 60)
    unittest.main(verbosity=2)

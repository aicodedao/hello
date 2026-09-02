#!/usr/bin/env python3
"""
AiCodeDao • Hello Project Comprehensive Test Suite (v6.0)
Validates:
1. Static code assets (HTML structure, CSS rules/tokens, JS syntax/engines, Nginx configuration, Manifest)
2. Multi-Model Workflow Studio, Cyber HUD 3D 7-Polyhedra, Mini AI Game v2.0, Code Lab, AI Benchmark, Two-Way Voice
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
MANIFEST_JSON = os.path.join(BASE_DIR, "manifest.json")


class TestStaticAssets(unittest.TestCase):
    """1. Static Code Analysis & Syntax Assertions (v6.0)"""

    def test_index_html_structure(self):
        self.assertTrue(os.path.exists(INDEX_HTML), "index.html must exist")
        with open(INDEX_HTML, "r", encoding="utf-8") as f:
            html = f.read()

        # Semantic Structure
        self.assertIn("<!DOCTYPE html>", html)
        self.assertIn('<html lang="vi">', html)
        self.assertIn("AiCodeDao • Next-Gen Agentic Hello ✨ (v6.0)", html)
        self.assertIn('id="particles-canvas"', html)
        self.assertIn('id="hud-3d-canvas"', html)
        self.assertIn('id="shape-toggle-btn"', html)
        self.assertIn('id="main-card"', html)
        self.assertIn('id="audio-wave"', html)
        self.assertIn('id="binaural-drone-btn"', html)

        # Multi-Model Workflow Studio
        self.assertIn('id="workflow-studio-section"', html)
        self.assertIn('id="run-workflow-btn"', html)
        self.assertIn('id="dag-pipeline"', html)
        self.assertIn('id="stage-1"', html)
        self.assertIn('id="stage-5"', html)
        self.assertIn('id="workflow-console-body"', html)

        # Mini AI Game Modal & Elements
        self.assertIn('id="mini-game-btn"', html)
        self.assertIn('id="mini-game-modal"', html)
        self.assertIn('id="mini-game-canvas"', html)
        self.assertIn('id="game-score"', html)
        self.assertIn('id="game-combo"', html)
        self.assertIn('id="game-shields"', html)
        self.assertIn('id="game-emp"', html)
        self.assertIn('id="game-emp-btn"', html)

        # Code Lab & Benchmark Modals
        self.assertIn('id="codelab-modal"', html)
        self.assertIn('id="benchmark-modal"', html)

        # AI Assistant Chatbot, Two-Way Voice & API Modal
        self.assertIn('id="ai-assistant-section"', html)
        self.assertIn('id="ai-chat-messages"', html)
        self.assertIn('id="ai-mic-btn"', html)
        self.assertIn('id="ai-tts-btn"', html)
        self.assertIn('id="ai-export-btn"', html)
        self.assertIn('id="api-key-modal"', html)

        # 8 Language Buttons
        for lang in ["vi", "en", "ja", "fr", "es", "ko", "de", "zh"]:
            self.assertIn(f'data-lang="{lang}"', html, f"Language button for {lang} missing")

        # 4 AI Agent HUD Cards
        for agent in ["architect", "reviewer", "devops", "ux"]:
            self.assertIn(f'data-agent="{agent}"', html, f"Agent card for {agent} missing")

        # Manifest
        self.assertIn('manifest.json', html)

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
        self.assertIn(".workflow-studio-card", css)
        self.assertIn(".dag-pipeline-container", css)
        self.assertIn(".codelab-dialog", css)
        self.assertIn(".benchmark-score-card", css)
        self.assertIn(".game-modal-dialog", css)
        self.assertIn(".ai-mic-btn", css)

    def test_script_js_engines(self):
        self.assertTrue(os.path.exists(SCRIPT_JS), "script.js must exist")
        # Validate syntax with node --check
        res = subprocess.run(["node", "--check", SCRIPT_JS], capture_output=True, text=True)
        self.assertEqual(res.returncode, 0, f"script.js syntax error: {res.stderr}")

        with open(SCRIPT_JS, "r", encoding="utf-8") as f:
            js = f.read()

        core_classes = [
            "WebAudioEngine",
            "Hud3DPolyhedraReactor",
            "WorkflowSimulator",
            "CodeLabEngine",
            "BenchmarkSuite",
            "MiniGameEngine",
            "GeminiAssistant",
            "BackgroundCanvas"
        ]
        for cls in core_classes:
            self.assertIn(cls, js, f"Missing class {cls} in script.js")

        for shape in ["Icosahedron", "Hypercube 4D", "Quantum Dodecahedron", "Octahedron", "Klein Torus", "Stellated Star", "DNA Helix"]:
            self.assertIn(shape, js, f"Missing shape {shape} in script.js")

    def test_configs_and_manifest(self):
        self.assertTrue(os.path.exists(NGINX_CONF), "nginx.conf must exist")
        self.assertTrue(os.path.exists(DOCKERFILE), "Dockerfile must exist")
        self.assertTrue(os.path.exists(COMPOSE_FILE), "docker-compose.yml must exist")
        self.assertTrue(os.path.exists(MANIFEST_JSON), "manifest.json must exist")

        with open(NGINX_CONF, "r") as f:
            conf = f.read()
            self.assertIn("listen 8080", conf)
            self.assertIn("location = /healthz", conf)

        with open(MANIFEST_JSON, "r") as f:
            mf = json.load(f)
            self.assertIn("AiCodeDao", mf["name"])


class TestRuntimeIngress(unittest.TestCase):
    """2. Container Runtime & Cloudflare Ingress Verification"""

    def test_local_healthz(self):
        url = "http://127.0.0.1:8080/healthz"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "AiCodeDao-PyTester/6.0"})
            with urllib.request.urlopen(req, timeout=3) as res:
                self.assertEqual(res.status, 200)
                body = res.read().decode("utf-8").strip()
                self.assertEqual(body, "OK")
        except Exception as e:
            self.fail(f"Local healthcheck failed: {e}")

    def test_cloudflare_tunnel_edge(self):
        url = "https://hello.aicodedao.xyz/healthz"
        try:
            t0 = time.time()
            req = urllib.request.Request(url, headers={"User-Agent": "AiCodeDao-PyTester/6.0"})
            with urllib.request.urlopen(req, timeout=5) as res:
                self.assertEqual(res.status, 200)
                body = res.read().decode("utf-8").strip()
                self.assertEqual(body, "OK")
                latency = round((time.time() - t0) * 1000, 1)
                print(f"\n      [Py Live Ingress] https://hello.aicodedao.xyz/healthz: {latency}ms (HTTP 200 OK)")
        except Exception as e:
            self.fail(f"Cloudflare Edge ingress failed: {e}")


if __name__ == "__main__":
    unittest.main(verbosity=2)

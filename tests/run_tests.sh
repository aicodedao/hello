#!/usr/bin/env bash
set -e

echo "========================================================"
echo "🚀 AICODEDAO • HELLO COMPREHENSIVE VERIFICATION RUNNER"
echo "========================================================"

# 1. Syntax check
echo "[1/5] Checking JavaScript Syntax..."
node --check script.js
echo "      ✅ script.js syntax OK"

# 2. Node Native Test Suite
echo "[2/5] Executing Direct Node.js Native Test Suite..."
node --test tests/test_hello.test.mjs
echo "      ✅ Node.js native test suite passed"

# 3. Python Unit & Ingress Tests
echo "[3/5] Executing Python Test Suite..."
python3 tests/test_hello.py

# 4. Docker Health Checks
echo "[4/5] Checking Docker Compose Containers..."
docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

# 5. Live Edge Smoke Check
echo "[5/5] Verifying Live Cloudflare Edge Endpoint..."
LIVE_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://hello.aicodedao.xyz/healthz)
if [ "$LIVE_CODE" -eq 200 ]; then
  echo "      ✅ Live Cloudflare Tunnel Endpoint (https://hello.aicodedao.xyz/healthz) -> 200 OK"
else
  echo "      ❌ Live Cloudflare Tunnel Endpoint returned HTTP $LIVE_CODE"
  exit 1
fi

echo "========================================================"
echo "🎉 ALL TESTS & VERIFICATION CHECKS PASSED (100% GREEN)"
echo "========================================================"

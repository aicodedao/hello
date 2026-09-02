# AiCodeDao • Next-Gen Agentic Hello ✨ (v4.0)

Ứng dụng Web thế hệ mới theo phong cách **Cyber-Glassmorphism 3.0**, tích hợp **AI Agentic Core HUD**, **Multi-mode Particle & Canvas Engine (4 Chế độ)**, **Web Audio API Synth Engine Pro (6 Presets)** với Waveform Visualizer, **Hỗ trợ 8 Ngôn ngữ Quốc tế**, **Mini AI Terminal CLI v4.0**, **6 Bảng màu Neon**, **AI Wisdom Quotes Engine**, và triển khai Container **Nginx Alpine (Port 8080)** với **Cloudflare Tunnel Ingress** cho subdomain `hello.aicodedao.xyz`.

---

## 🚀 Tính năng nổi bật thế hệ v4.0

- 🤖 **AI Agentic Core HUD Grid:** Bảng điều khiển trực quan 4 Agent chuyên biệt (`Gemini 3.7 Flash Architect`, `Gemini 3.1 Pro Sentinel`, `TrueForge DevOps`, `Glass 3.0 UI Engine`) với chỉ số telemetry và trạng thái live.
- 🌌 **Multi-Mode Dynamic Canvas Engine (4 Chế độ):**
  - `Neural Web`: Mạng nơ-ron liên kết động với lực tương tác vật lý.
  - `Matrix Rain`: Cơn mưa ký tự số phong cách Cyberspace với bảng mã Katakana.
  - `Starfield`: Không gian vũ trụ 3D sao trôi chiều sâu.
  - `Warp Speed`: Vận tốc ánh sáng lượng tử siêu tốc độ.
- 🎵 **Web Audio API Synth Engine Pro (6 Presets):** Polyphonic Synth (`Cyber Synth`, `8-Bit Arcade`, `Zen Chime`, `ASMR Click`, `Sci-Fi Holo`, `Muted`) sinh âm thanh toán học động không cần tải audio ngoài, kèm live audio wave visualizer.
- 🌍 **Đa ngôn ngữ thông minh (8 Ngôn ngữ):** 🇻🇳 Tiếng Việt, 🇬🇧 English, 🇯🇵 日本語, 🇫🇷 Français, 🇪🇸 Español, 🇰🇷 한국어, 🇩🇪 Deutsch, 🇨🇳 中文 kèm lời chào theo 5 khung giờ (Rạng đông, Sáng, Chiều, Tối, Khuya).
- 💻 **Mini AI Terminal CLI v4.0:** Giao diện dòng lệnh phong cách hacker với thanh Quick Command Chips (`/status`, `/quote`, `/theme`, `/canvas`, `/confetti`, `/agents`, `/sound`, `/ping`, `/clear`, `/share`).
- 🧊 **Cyber-Glassmorphism 3.0 & HUD Brackets:** Thẻ kính mờ với góc vát HUD Tech, viền neon xoay chuyển gradient, hiệu ứng 3D Perspective Tilt theo chuột và Ambient Glow.
- 🎨 **6 Bảng màu Neon Tuyệt đẹp:** `Cyber Aurora`, `Emerald Nexus`, `Solar Flare`, `Deep Cosmos`, `Matrix Cyber`, `Hyper Sunset`.
- 💡 **AI Wisdom Engine:** Bộ sưu tập danh ngôn kỹ thuật phần mềm và AI Agentic với tính năng sao chép và đánh dấu yêu thích (Bookmarks) lưu trên `localStorage`.
- 📱 **Smart Share & QR Code Modal:** Tích hợp Web Share API native và mã QR độ phân giải cao hỗ trợ quét từ smartphone.
- ⌨️ **Keyboard Shortcuts:** Hỗ trợ đầy đủ phím tắt (`T` Theme, `C` Pháo hoa, `W` Đổi nền Canvas, `Q` AI Quote, `M` Âm thanh, `L` Đổi ngôn ngữ, `F` Toàn màn hình, `Space` Bắn pháo hoa).
- ⚡ **Real-time Live Metrics:** Đo FPS thời gian thực, đồng hồ múi giờ kép (Việt Nam UTC+7 & UTC), đo độ trễ Edge server và đếm tương tác.
- 🐳 **Dockerized Production Ready:** Chạy trên Nginx Alpine siêu nhẹ (< 15MB) với Gzip Compression, Security Headers (`X-Frame-Options`, `X-Content-Type-Options`) và `/healthz` endpoint trên port 8080.
- 🌐 **Cloudflare Tunnel Ingress:** Tích hợp container `hello-tunnel` kết nối an toàn với Cloudflare Zero-Trust Edge về domain `hello.aicodedao.xyz`.

---

## 📂 Cấu trúc dự án

```text
/Users/scott_ng/Develop/aicodedao/hello/
├── index.html            # Cấu trúc DOM Cyber-Glassmorphism 3.0, Agent HUD, CLI & Modal
├── style.css             # CSS Tokens, 3D Tilt, HUD Brackets, 6 Neon Themes & Responsive
├── script.js             # Multi-mode Canvas, Web Audio Pro Synth, 8 Languages & CLI v4.0
├── nginx.conf            # Cấu hình Nginx tối ưu (Gzip, Security headers, Caching, Port 8080)
├── Dockerfile            # Multi-stage Nginx Alpine container (Port 8080)
├── docker-compose.yml    # Docker Compose orchestration (hello + hello-tunnel)
├── .dockerignore         # Loại trừ files không cần thiết khi build Docker
├── .env.example          # File mẫu cấu hình biến môi trường
├── .env                  # Cấu hình môi trường thực tế (Tunnel token)
├── .gitignore            # Bỏ qua files nhạy cảm và rác hệ thống
└── README.md             # Tài liệu hướng dẫn dự án
```

---

## 💻 Hướng dẫn khởi chạy & Triển khai

### 1. Chạy với Docker Compose
Khởi chạy toàn bộ hệ thống gồm web app và Cloudflare Tunnel:
```bash
docker compose up -d --build
```

### 2. Kiểm tra Trạng thái & Logs
```bash
docker compose ps
docker compose logs --tail=50 hello-tunnel
curl -I -s "http://localhost:8080/healthz"
curl -I -s "https://hello.aicodedao.xyz"
```

---

## 🛡️ Giấy phép & Bản quyền
Phát triển bởi **AiCodeDao** © 2026.  
Website: [aicodedao.xyz](https://aicodedao.xyz)  
Domain dự án: [hello.aicodedao.xyz](https://hello.aicodedao.xyz)


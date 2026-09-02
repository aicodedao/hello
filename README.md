# AiCodeDao • Next-Gen Agentic Hello ✨

Ứng dụng Web thế hệ mới theo phong cách **Cyber-Glassmorphism 3D**, tích hợp **Web Audio API Synth Engine (4 Sound Modes)**, **Particle Physics & Fireworks Engine**, **Multi-language Selector**, **Mini AI Terminal CLI**, **Theme Switcher (5 Neon Palettes)**, **AI Wisdom Quotes Engine** và triển khai Container **Nginx Alpine (Port 8080)** với **Cloudflare Tunnel Ingress** cho subdomain `hello.aicodedao.xyz`.

---

## 🚀 Tính năng nổi bật

- 🌌 **Dynamic Particle Canvas Background:** Hiệu ứng tương tác hạt vật lý theo chuột với mạng lưới nơ-ron (neural connections) và hiệu ứng nổ pháo hoa đa tầng.
- 🎵 **Web Audio API Sound Engine (4 Chế độ):** Bộ tổng hợp âm thanh Polyphonic Synth (`Cyber Synth`, `8-Bit Arcade`, `Zen Chime`, `ASMR Click`, `Muted`) sinh âm thanh động mà không cần tải file MP3 bên ngoài.
- 🌍 **Đa ngôn ngữ thông minh (Multi-language):** Hỗ trợ 6 ngôn ngữ: 🇻🇳 Tiếng Việt, 🇬🇧 English, 🇯🇵 日本語, 🇫🇷 Français, 🇪🇸 Español, 🇰🇷 한국어 kèm lời chào cá nhân hoá.
- 💻 **Mini AI Terminal CLI:** Trình giả lập dòng lệnh tương tác với các lệnh `/help`, `/status`, `/quote`, `/theme`, `/confetti`, `/agents`, `/ping`, `/clear`.
- 🧊 **3D Hover Perspective Tilt & Cursor Glow:** Thẻ kính mờ phản hồi góc nghiêng 3D chân thực theo con trỏ chuột và vệt sáng hào quang Ambient.
- 🎨 **5 Bảng màu Neon Tuyệt đẹp:** `Cyber Aurora`, `Emerald Nexus`, `Solar Flare`, `Deep Cosmos`, `Matrix Cyber`, tự động lưu trạng thái vào `localStorage`.
- 💡 **AI Wisdom Engine:** Bộ trích dẫn triết lý AI Agentic / Kỹ thuật phần mềm với khả năng sao chép và thông báo toast notification tức thì.
- 📱 **QR Code Modal:** Tạo mã QR tiện lợi để mở ngay trên điện thoại.
- ⌨️ **Keyboard Shortcuts:** Hỗ trợ đầy đủ phím tắt (`T` Theme, `C` Pháo hoa, `Q` AI Quote, `M` Sound, `L` Ngôn ngữ, `Space` Hiệu ứng).
- ⚡ **Real-time Live Metrics:** Đo lường FPS thời gian thực, đồng hồ múi giờ kép (Việt Nam UTC+7 & UTC), đo độ trễ Edge server và số lượng AI Agent.
- 🐳 **Dockerized Production Ready:** Chạy trên Nginx Alpine siêu nhẹ (< 15MB) với Gzip Compression, Security Headers (`X-Frame-Options`, `X-Content-Type-Options`) và `/healthz` endpoint trên port 8080.
- 🌐 **Cloudflare Tunnel Ingress:** Tích hợp service `hello-tunnel` định tuyến an toàn về domain `hello.aicodedao.xyz` mà không làm lộ IP máy chủ.

---

## 📂 Cấu trúc dự án

```text
/Users/scott_ng/Develop/aicodedao/hello/
├── index.html            # Cấu trúc DOM ngữ nghĩa, Mini Terminal, Modal & Glassmorphism
├── style.css             # CSS Variables, 3D Tilt, Neon Themes & Responsive
├── script.js             # Web Audio API Synth, Particle Physics, Multi-language & CLI
├── nginx.conf            # Cấu hình Nginx tối ưu (Gzip, Security headers, Caching, Port 8080)
├── Dockerfile            # Multi-stage Nginx Alpine container (Port 8080)
├── docker-compose.yml    # Docker Compose orchestration (hello + hello-tunnel)
├── .dockerignore         # Loại trừ files không cần thiết khi build Docker
├── .env.example          # File mẫu cấu hình biến môi trường
├── .env                  # Cấu hình môi trường thực tế
├── .gitignore            # Bỏ qua files nhạy cảm và rác hệ thống
└── README.md             # Tài liệu hướng dẫn dự án
```

---

## 💻 Hướng dẫn khởi chạy & Triển khai

### 1. Khởi tạo Tunnel & Định tuyến DNS (trên Host)
```bash
cloudflared tunnel list | grep "hello-tunnel" || cloudflared tunnel create "hello-tunnel"
cloudflared tunnel route dns "hello-tunnel" "hello.aicodedao.xyz"
```

### 2. Chạy với Docker Compose
Khởi chạy toàn bộ hệ thống gồm web app và Cloudflare Tunnel:
```bash
docker compose up -d --build
```

### 3. Kiểm tra Verification
```bash
docker compose ps
docker compose logs --tail=50 hello-tunnel
curl -I -s "https://hello.aicodedao.xyz" | head -n 5
```

---

## 🛡️ Giấy phép & Bản quyền
Phát triển bởi **AiCodeDao** © 2026.  
Website: [aicodedao.xyz](https://aicodedao.xyz)  
Domain dự án: [hello.aicodedao.xyz](https://hello.aicodedao.xyz)

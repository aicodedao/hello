# AiCodeDao • Hello World ✨

Ứng dụng Web tĩnh phong cách **Dark Glassmorphism 3D**, tích hợp **Web Audio API Synth Engine**, **Particle Physics**, **Confetti Engine**, **Theme Switcher**, **AI Wisdom Quotes Engine** và triển khai Container **Nginx Alpine (Port 8080)** với **Cloudflare Tunnel Ingress** cho subdomain `hello.aicodedao.xyz`.

---

## 🚀 Tính năng nổi bật

- 🌌 **Dynamic Particle Canvas Background:** Hiệu ứng tương tác hạt vật lý theo chuột với kết nối động và tính năng nổ hạt (ripple burst) khi click vào nền.
- 🎵 **Web Audio API Sound Engine:** Bộ tổng hợp âm thanh Synth tích hợp sẵn (không cần tải file MP3 bên ngoài), tạo âm thanh click, đổi theme và chime chào mừng mượt mà. Kèm nút chuyển đổi Bật/Tắt âm thanh (Mute/Unmute).
- 🧊 **3D Hover Perspective Tilt:** Thẻ kính mờ Glassmorphism phản hồi góc nghiêng 3D chân thực theo vị trí con trỏ chuột.
- 🎨 **Neon Theme Switcher:** 4 bảng màu ánh sáng neon siêu đẹp (`Cyberpunk Aurora`, `Emerald Nexus`, `Solar Flare`, `Deep Cosmos`), tự động lưu trạng thái vào `localStorage`.
- 💡 **AI Wisdom Engine:** Tích hợp bộ sưu tập danh ngôn công nghệ AI truyền cảm hứng với khả năng chuyển đổi tức thì.
- ⌨️ **Keyboard Shortcuts:** Hỗ trợ đầy đủ phím tắt thao tác nhanh (`T` đổi theme, `C` bắn pháo hoa, `Q` đổi quote, `M` bật/tắt âm thanh, `Enter` chào mừng).
- 🌅 **Smart Dynamic Greetings:** Lời chào thông minh tự động thay đổi theo thời gian thực (Sáng / Chiều / Tối / Đêm).
- 🎉 **Confetti Celebration:** Bắn pháo hoa rực rỡ với hiệu ứng xoay và trọng lực khi chào mừng hoặc click nút.
- ⚡ **Real-time Live Metrics:** Đo lường FPS thời gian thực, đồng hồ múi giờ Việt Nam, đo độ trễ Edge server và bộ đếm tương tác.
- 🐳 **Dockerized Production Ready:** Chạy trên Nginx Alpine siêu nhẹ (< 15MB) với Gzip Compression, Security Headers (`X-Frame-Options`, `X-Content-Type-Options`, CSP) và `/healthz` endpoint trên port 8080.
- 🌐 **Cloudflare Tunnel Ingress:** Tích hợp sẵn service `hello-tunnel` định tuyến an toàn về domain `hello.aicodedao.xyz` mà không làm lộ IP máy chủ.

---

## 📂 Cấu trúc dự án

```text
/Users/scott_ng/Develop/aicodedao/hello/
├── index.html            # Cấu trúc DOM ngữ nghĩa & Glassmorphism
├── style.css             # CSS Variables, 3D Tilt, Glass card & Responsive
├── script.js             # Web Audio API Synth, Particle Physics & Theme engine
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

### 1. Mở trực tiếp trên trình duyệt (Local Dev)
```bash
open index.html
```

### 2. Chạy với Docker Compose
Khởi chạy toàn bộ hệ thống gồm web app và Cloudflare Tunnel:
```bash
docker compose up -d --build
```

Kiểm tra trạng thái container và logs:
```bash
docker compose ps
docker compose logs --tail=50 hello-tunnel
```

Kiểm tra kết nối:
```bash
# Kiểm tra cục bộ
curl -I http://127.0.0.1:8080/healthz

# Kiểm tra trực tiếp qua Cloudflare Tunnel Domain
curl -I -s "https://hello.aicodedao.xyz" | head -n 5
```

---

## 🛡️ Giấy phép & Bản quyền
Phát triển bởi **AiCodeDao** © 2026.
Website: [aicodedao.xyz](https://aicodedao.xyz)
Domain dự án: [hello.aicodedao.xyz](https://hello.aicodedao.xyz)

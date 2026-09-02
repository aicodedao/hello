# AiCodeDao • Hello World ✨

Ứng dụng Web tĩnh phong cách **Dark Glassmorphism 3D**, tích hợp **Web Audio API Synth Engine**, **Particle Physics**, **Confetti Engine**, **Theme Switcher** và sẵn sàng triển khai Container **Nginx Alpine** với **Cloudflare Tunnel Ingress** cho domain `aicodedao.xyz`.

---

## 🚀 Tính năng nổi bật

- 🌌 **Dynamic Particle Canvas Background:** Hiệu ứng tương tác hạt vật lý theo chuột với kết nối động và tính năng nổ hạt (ripple burst) khi click vào nền.
- 🎵 **Web Audio API Sound Engine:** Bộ tổng hợp âm thanh Synth tích hợp sẵn (không cần tải file MP3 bên ngoài), tạo âm thanh click, đổi theme và chime chào mừng mượt mà. Kèm nút chuyển đổi Bật/Tắt âm thanh (Mute/Unmute).
- 🧊 **3D Hover Perspective Tilt:** Thẻ kính mờ Glassmorphism phản hồi góc nghiêng 3D chân thực theo vị trí con trỏ chuột.
- 🎨 **Neon Theme Switcher:** 4 bảng màu ánh sáng neon siêu đẹp (`Cyberpunk Aurora`, `Emerald Nexus`, `Solar Flare`, `Deep Cosmos`), tự động lưu trạng thái vào `localStorage`.
- 🌅 **Smart Dynamic Greetings:** Lời chào thông minh tự động thay đổi theo thời gian thực (Sáng / Chiều / Tối / Đêm).
- 🎉 **Confetti Celebration:** Bắn pháo hoa rực rỡ với hiệu ứng xoay và trọng lực khi chào mừng hoặc click nút.
- ⚡ **Real-time Live Metrics:** Đo lường FPS thời gian thực, đồng hồ múi giờ Việt Nam và bộ đếm tương tác.
- 🐳 **Dockerized Production Ready:** Chạy trên Nginx Alpine siêu nhẹ (< 15MB) với Gzip Compression, Security Headers (`X-Frame-Options`, `X-Content-Type-Options`, CSP) và `/healthz` endpoint.
- 🌐 **Cloudflare Tunnel Ingress:** Tích hợp sẵn service `cloudflared` định tuyến an toàn về domain `aicodedao.xyz` mà không cần mở port router.

---

## 📂 Cấu trúc dự án

```text
/Users/scott_ng/Develop/aicodedao/hello/
├── index.html            # Cấu trúc DOM ngữ nghĩa & Glassmorphism
├── style.css             # CSS Variables, 3D Tilt, Glass card & Responsive
├── script.js             # Web Audio API Synth, Particle Physics & Theme engine
├── nginx.conf            # Cấu hình Nginx tối ưu (Gzip, Security headers, Caching)
├── Dockerfile            # Multi-stage Nginx Alpine container
├── docker-compose.yml    # Docker Compose orchestration (Web + Cloudflare Tunnel)
├── .dockerignore         # Loại trừ files không cần thiết khi build Docker
├── .env.example          # File mẫu cấu hình biến môi trường
├── .env                  # Cấu hình môi trường thực tế (PORT, Token)
├── .gitignore            # Bỏ qua files nhạy cảm và rác hệ thống
└── README.md             # Tài liệu hướng dẫn dự án
```

---

## 💻 Hướng dẫn khởi chạy

### 1. Mở trực tiếp trên trình duyệt (Local Dev)
```bash
open index.html
```

### 2. Chạy với Docker Compose
Khởi chạy dịch vụ Web cục bộ (cổng `8080`):
```bash
docker compose up -d web
```
Kiểm tra container đang chạy:
```bash
docker compose ps
curl -I http://127.0.0.1:8080/healthz
```

### 3. Triển khai với Cloudflare Tunnel (Domain `aicodedao.xyz`)
1. Điền token của Cloudflare Tunnel vào file `.env`:
   ```env
   CLOUDFLARE_TUNNEL_TOKEN=your_token_here
   ```
2. Khởi chạy toàn bộ hệ thống gồm cả Web và Tunnel:
   ```bash
   docker compose --profile tunnel up -d
   ```

---

## 🛡️ Giấy phép & Bản quyền
Phát triển bởi **AiCodeDao** © 2026.
Website: [aicodedao.xyz](https://aicodedao.xyz)

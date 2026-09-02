FROM nginx:alpine-slim

LABEL maintainer="AiCodeDao <contact@aicodedao.xyz>"
LABEL description="AiCodeDao Hello World Web Application"

# Clean default configuration
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static web assets
COPY index.html style.css script.js /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 8080

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]

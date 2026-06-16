# ── Stage 1: build React app ──────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy manifests and install ALL deps (lock file may be out of sync — use install)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Create optimised production bundle
RUN npm run build

# ── Stage 2: serve with nginx ──────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy React build output
COPY --from=builder /app/build /usr/share/nginx/html

# SPA routing + gzip + security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

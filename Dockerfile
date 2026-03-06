# Build Stage: Node + Webpack
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files needed for build
COPY webpack.config.js .
COPY public/ ./public/
COPY src/ ./src/
COPY index.html .

# Build production assets
RUN npm run build

# Final Stage: Nginx (non-root)
FROM nginx:1.29-alpine-slim

# Create non-root user and group
RUN addgroup -S appgroup \
    && adduser -S appuser -G appgroup \
    # Remove default Nginx config
    && rm /etc/nginx/conf.d/default.conf

# Copy static build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public/images /usr/share/nginx/html/images

# Copy custom nginx.conf (SPA-friendly)
COPY nginx.conf /etc/nginx/conf.d/default.conf 
COPY nginx-main.conf /etc/nginx/nginx.conf

# Create writable directories for Nginx runtime (WSL2-safe)
RUN mkdir -p /run/nginx \
    && chown -R appuser:appgroup /run/nginx \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /usr/share/nginx/html

# Switch to non-root user
USER appuser

EXPOSE 8080

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
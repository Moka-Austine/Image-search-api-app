# Build Stage (Node image to run Webpack)
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
# Copy only what's needed for build
COPY public/ ./public/
COPY webpack.config.js .
COPY src/ ./src/
COPY index.html .

RUN npm run build

# Final Stage: Only serve static files via Nginx (No Node, No Express)
FROM nginx:1.29-alpine-slim

# Create a non-root user and group
RUN addgroup -S appgroup \
&& adduser -S appuser -G appgroup

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy static build output
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public/images /usr/share/nginx/html/images
# Optional: Add custom Nginx config for SPA (e.g. route fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Change ownership so non-root can read files
RUN chown -R appuser:appgroup /usr/share/nginx/html \
&& chown -R appuser:appgroup /var/cache/nginx \
&& chown -R appuser:appgroup /var/run
# Switch to non-root user
USER appuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

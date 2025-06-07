# Build Stage (Node image to run Webpack)
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
# Copy only what's needed for build
COPY src/ ./src/
COPY public/ ./public/
COPY webpack.config.js .
COPY index.html .

RUN npm run build

# Final Stage: Only serve static files via Nginx (No Node, No Express)
FROM nginx:stable-alpine

# Copy static build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default config and optionally replace it
RUN rm /etc/nginx/conf.d/default.conf

# Optional: Add custom Nginx config for SPA (e.g. route fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

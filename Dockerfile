# Build Stage
FROM node:16-alpine as builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Production Stage (Nginx)
FROM nginx:alpine3.21

# Copy the build output to the Nginx container
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

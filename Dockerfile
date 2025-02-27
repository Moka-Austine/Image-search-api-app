# Use the official nginx image as the base image
FROM nginx:alpine

# Create a directory inside the container where you will copy the files
RUN mkdir -p /home/app

# Copy the frontend app's build files (e.g., from 'async' folder in your local machine) to the Nginx default HTML directory
COPY ./ASYNC /usr/share/nginx/html

# Expose port 80 (default for nginx)
EXPOSE 80

# Start nginx server (Nginx runs by default in the container)
CMD ["nginx", "-g", "daemon off;"]

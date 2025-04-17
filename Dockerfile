# Stage 1: Build Angular app using Node.js official image
FROM node:18-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies (npm ci for clean install)
COPY package.json package-lock.json ./
RUN npm ci

# Copy all source files to container
COPY . .

# Build Angular app in production mode (outputs to /dist/your-frontend)
RUN npm run build --prod

# Stage 2: Use lightweight Nginx image to serve built files
FROM nginx:alpine

# Copy custom Nginx configuration to container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular app from previous stage to Nginx's html folder
COPY --from=build /app/dist/your-frontend /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80

# Nginx runs by default, no CMD needed here

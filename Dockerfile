# Development Dockerfile for Angular
FROM artifactory.otxlab.net/core-docker-dev/hardened/node18-alpine3:18.20.5.202411.3274914-alpine-11eea529.3366681 as development
WORKDIR /app
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]

# Production Dockerfile for Angular
FROM artifactory.otxlab.net/core-docker-dev/hardened/node18-alpine3:18.20.5.202411.3274914-alpine-11eea529.3366681 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM artifactory.otxlab.net/core-docker-dev/nginx:1.27.1.202409.2691649-alpine-f9e67ba1.2695538 as production
COPY --from=builder /app/dist/todo-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]
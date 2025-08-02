# Angular build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

# Nginx serving
FROM nginx:alpine
COPY --from=builder /app/dist/activity-blog/browser /usr/share/nginx/html


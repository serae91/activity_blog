# Angular build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build -- --configuration production

# Nginx serving
FROM nginx:alpine
COPY --from=builder /app/dist/activity-blog/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

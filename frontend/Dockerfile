# Use Node.js as the base image
FROM node:18 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use Nginx to serve the Angular app
FROM nginx:alpine

# Copy built Angular files to Nginx's default directory
COPY --from=build /usr/src/app/dist/your-angular-app-name /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

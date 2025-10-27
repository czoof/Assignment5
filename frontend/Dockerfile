# Stage 1: Build the Vite app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# 👇 ADD THIS LINE (to accept the build argument)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the app with the correct API URL baked in
RUN npm run build

# Stage 2: Serve the built app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

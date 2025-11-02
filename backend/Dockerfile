FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of your app
COPY . .

# Ensure SQLite data folder exists
RUN mkdir -p /app/data

# Cloud Run requires port 8080
ENV PORT=8080
EXPOSE 8080

# Start the app
CMD ["npm", "start"]

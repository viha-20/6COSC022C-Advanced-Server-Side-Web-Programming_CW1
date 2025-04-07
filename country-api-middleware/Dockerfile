# Use official Node.js image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Run the app
CMD ["npm", "start"]
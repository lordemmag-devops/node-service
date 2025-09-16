
# Use official Node.js LTS (Long Term Support) image based on Alpine Linux for smaller size
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run when the container starts
CMD ["npm", "start"]

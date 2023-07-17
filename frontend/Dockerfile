# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the Next.js application will listen on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]

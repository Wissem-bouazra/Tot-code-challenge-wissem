# Stage 1: Build
# Use an official Node.js runtime as a parent image
# Consider using a newer LTS version of Node.js based on your project requirements
FROM node:14-alpine as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies, including 'devDependencies'
RUN npm install

# Copy the rest of your application's code
COPY . .

# Run the development server script specified in package.json
# Note: Replace "dev" with the correct script name if it's different
CMD ["npm", "run", "dev"]

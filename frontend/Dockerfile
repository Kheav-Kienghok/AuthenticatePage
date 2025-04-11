# Use an official Node.js image with Alpine for a smaller image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
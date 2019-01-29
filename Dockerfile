FROM node:10-alpine

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
# EXPOSE 80

RUN npm test

# ENV PORT=80

# Launch application
CMD ["npm","start"]

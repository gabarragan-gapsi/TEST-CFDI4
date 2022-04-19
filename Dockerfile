FROM node:15

WORKDIR /usr/src/cfdi4/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install --only=production

# Copy the local code to the container
COPY . .

# Build production app
# RUN npm run Build

# Start the service
CMD npm start


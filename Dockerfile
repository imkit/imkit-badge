FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
#COPY package.json .
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY app.js ./
COPY bin ./bin
COPY routes ./routes

EXPOSE 3120
CMD [ "npm", "run", "start" ]

FROM node:14.16.1-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm i --production

COPY . /app

EXPOSE 3000
CMD ["npm", "run", "start"]

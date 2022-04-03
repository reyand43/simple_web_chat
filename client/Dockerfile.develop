FROM node:14.16.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i

COPY . /app

RUN npm build

EXPOSE 3000
CMD ["npm", "start"]

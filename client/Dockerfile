FROM node:14.16.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i --production

COPY . /app

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]

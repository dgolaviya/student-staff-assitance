FROM node:12-alpine

RUN mkdir -p /usr/src/app

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install -g yarn

RUN yarn install

COPY . .

CMD yarn start
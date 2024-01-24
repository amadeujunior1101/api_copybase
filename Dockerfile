FROM node:18

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start:dev"]

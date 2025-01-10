ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json package-lock.json .

RUN npm i --omit=dev

COPY . .

CMD ["npm", "start"]

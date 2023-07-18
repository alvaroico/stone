FROM node:lts-slim
WORKDIR /home/node/stone
COPY package.json .
RUN npm install
COPY . .
RUN npm run test
RUN npm run build
CMD node dist/main.js
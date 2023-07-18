FROM node:lts-slim
WORKDIR /home/node/stone
COPY package.json .
RUN npm install
COPY . .
RUN npm run test
CMD npm run start
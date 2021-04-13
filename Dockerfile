FROM node:14.16.0

WORKDIR /message-app

COPY package.json /message-app

RUN npm install

COPY . /message-app

CMD [ "node", "server" ]
FROM node:12.16.1-alpine3.9

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
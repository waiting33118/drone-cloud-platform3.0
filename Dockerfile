FROM node:lts-alpine3.13

WORKDIR /frontend

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
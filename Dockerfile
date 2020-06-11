FROM node:12

WORKDIR /user/app/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]
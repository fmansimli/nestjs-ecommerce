FROM node:18-alpine

WORKDIR /apps/nestjs-app

ENV BASE_URL http://localhost:3000

RUN npm install -g pm2

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3030

RUN npm run build-image

CMD ["npm","start"]
FROM node:18-alpine

WORKDIR /apps/myapp

#RUN npm install -g pm2

COPY package.json .
RUN npm install

COPY . .

ENV DB_HOST 172.16.238.12
ENV DB_PORT 5432
ENV DB_NAME mydb
ENV DB_USER pguser
ENV DB_PASSWORD 12345
ENV JWT_SECRET extremly-secret-key

EXPOSE 3000

RUN npm run build

CMD ["npm","start"]
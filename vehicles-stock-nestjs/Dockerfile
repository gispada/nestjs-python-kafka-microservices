FROM node:16.15-alpine

COPY . .

RUN npm install
RUN npm run build

CMD ./wait-for http://ms-schema-registry:8081 -t 60 -- npm run start:prod

FROM node:16.15-alpine

COPY . .

RUN wget -qO wait-for https://raw.githubusercontent.com/eficode/wait-for/master/wait-for
RUN chmod +x wait-for
RUN npm install
RUN npm run build

CMD ./wait-for http://ms-schema-registry-balancer:8088 -t 90 -- npm run start:prod

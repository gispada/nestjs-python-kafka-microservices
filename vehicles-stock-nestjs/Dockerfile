FROM node:16.15-alpine

ARG WAIT_FOR_VERSION=4df3f9262d84cab0039c07bf861045fbb3c20ab7

COPY . .

RUN wget -qO wait-for https://raw.githubusercontent.com/eficode/wait-for/4df3f9262d84cab0039c07bf861045fbb3c20ab7/wait-for
RUN chmod +x wait-for
RUN npm install
RUN npm run build

CMD ./wait-for http://ms-schema-registry:8081 -t 60 -- npm run start:prod

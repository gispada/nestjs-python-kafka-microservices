FROM node:16.15-alpine

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]

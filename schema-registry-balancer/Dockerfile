FROM nginx

RUN curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -o wait-for-it -s
RUN chmod +x wait-for-it

COPY nginx.conf /etc/nginx/nginx.conf

CMD ./wait-for-it ms-schema-registry-1:8081 -t 90 -- nginx -g 'daemon off;'
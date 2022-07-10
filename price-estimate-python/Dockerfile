FROM python:3.9.13-slim

COPY . .

ENV KAFKA_BOOTSTRAP_SERVER=ms-kafka-1:9092
ENV SCHEMA_REGISTRY_URL=http://ms-schema-registry-balancer:8088

RUN apt-get update && apt-get install -y wget
RUN wget -qO wait-for https://raw.githubusercontent.com/eficode/wait-for/master/wait-for
RUN chmod +x wait-for
RUN pip install kafka-python
RUN pip install python-schema-registry-client

# The schema registry takes a while to get up and running
CMD ./wait-for http://ms-schema-registry-balancer:8088 -t 90 -- python -u main.py

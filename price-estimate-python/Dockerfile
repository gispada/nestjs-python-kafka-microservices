FROM python:3.9.13-slim

ARG WAIT_FOR_VERSION=4df3f9262d84cab0039c07bf861045fbb3c20ab7

COPY . .

ENV KAFKA_BOOTSTRAP_SERVER=ms-kafka-1:9092
ENV SCHEMA_REGISTRY_URL=http://ms-schema-registry:8081

RUN apt-get update && apt-get install -y wget
RUN wget -qO wait-for https://raw.githubusercontent.com/eficode/wait-for/4df3f9262d84cab0039c07bf861045fbb3c20ab7/wait-for
RUN chmod +x wait-for
RUN pip install kafka-python
RUN pip install python-schema-registry-client

# The schema registry takes a while to get up and running
CMD ./wait-for http://ms-schema-registry:8081 -t 60 -- python -u main.py

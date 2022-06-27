FROM python:3.8.13-slim

ADD . .

RUN apt-get update && apt-get install -y wget
RUN pip install kafka-python
RUN pip install python-schema-registry-client

# The schema registry takes a while to get up and running
CMD ./wait-for http://ms-schema-registry:8081 -t 60 -- python -u main.py

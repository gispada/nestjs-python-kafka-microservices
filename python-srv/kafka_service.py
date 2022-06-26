import signal
import json
from kafka import KafkaConsumer
from kafka import KafkaProducer

class KafkaService:
    in_topic = 'test_topic'
    out_topic = 'results_topic'
    bootstrap_servers = 'ms-kafka-1:9092'
    api_version = (0, 10, 2)

    consumer = KafkaConsumer(
        bootstrap_servers=bootstrap_servers,
        group_id='python-srv',
        value_deserializer=lambda v: json.loads(v),
        api_version=api_version)

    producer = KafkaProducer(
        bootstrap_servers=bootstrap_servers,
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),
        api_version=api_version)

    def __init__(self):
        signal.signal(signal.SIGINT, self.stop)
        signal.signal(signal.SIGTERM, self.stop)

    def start(self):
        self.consumer.subscribe([self.in_topic])

        print (f'Subscribed to "{self.in_topic}"')

        for message in self.consumer:
            print(message.value)
            self.producer.send(self.out_topic, {'message': 'Hello from Python', 'content': message.value})
  
    def stop(self, signalnum, handler):
        print('Stopping Kafka service')
        self.consumer.close()
        self.producer.close()

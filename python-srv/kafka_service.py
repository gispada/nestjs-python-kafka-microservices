import signal
import json
from person_consumer import PersonConsumer
from car_producer import CarProducer

class KafkaService:
    def __init__(self):
        signal.signal(signal.SIGINT, self.stop)
        signal.signal(signal.SIGTERM, self.stop)

        self.person_consumer = PersonConsumer()
        self.car_producer = CarProducer()

    def start(self):
        self.person_consumer.subscribe(self.onMessage)
  
    def stop(self, signalnum, handler):
        print('Stopping Kafka service')
        self.person_consumer.close()
        self.car_producer.close()

    def onMessage(self, message):
        print(message)
        self.car_producer.send({'message': 'Hello'}) # Throws as it does not conform to car schema

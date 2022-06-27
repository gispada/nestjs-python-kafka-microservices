import json
from kafka import KafkaProducer
from schema import Schema

with open('./schemas/car.json') as f:
   car_schema_file = json.load(f)

class CarProducer:
    def __init__(self):
        car_schema = Schema('car-value', car_schema_file)

        self.producer = KafkaProducer(
            bootstrap_servers='ms-kafka-1:9092',
            value_serializer=lambda v: car_schema.encode_message(v),
            api_version=(0, 10, 2))

    def send(self, message):
        return self.producer.send('car', message)

import os
import json
from kafka import KafkaProducer
from schema import Schema
import constants as c

with open('./schemas/processed-vehicle.json') as f:
   producer_schema_file = json.load(f)

class ProcessedVehicleProducer:
    def __init__(self):
        producer_schema = Schema(f'{c.VEHICLE_PROCESSED_TOPIC}-value', producer_schema_file)

        self.producer = KafkaProducer(
            bootstrap_servers=os.getenv('KAFKA_BOOTSTRAP_SERVER'),
            value_serializer=producer_schema.encode_message,
            api_version=(0, 10, 2))

    def send(self, message):
        return self.producer.send(c.VEHICLE_PROCESSED_TOPIC, message)

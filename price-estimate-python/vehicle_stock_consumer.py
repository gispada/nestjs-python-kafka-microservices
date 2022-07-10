import os
import json
from kafka import KafkaConsumer
from schema import Schema
import constants as c

with open('./schemas/vehicle-stock.json') as f:
   consumer_schema_file = json.load(f)

class VehicleStockConsumer:
    def __init__(self):
        consumer_schema = Schema(f'{c.VEHICLE_CREATED_TOPIC}-value', consumer_schema_file)

        self.consumer = KafkaConsumer(
            bootstrap_servers=os.getenv('KAFKA_BOOTSTRAP_SERVER'),
            group_id=c.CONSUMER_GROUP_ID,
            value_deserializer=consumer_schema.decode_message,
            api_version=(0, 10, 2))

    def subscribe(self, onMessage):
        self.consumer.subscribe([c.VEHICLE_CREATED_TOPIC])
        print(f'Subscribed to "{c.VEHICLE_CREATED_TOPIC}"')

        for message in self.consumer:
            onMessage(message)

import json
from kafka import KafkaConsumer
from schema import Schema

with open('./schemas/person.json') as f:
   person_schema_file = json.load(f)

class PersonConsumer:
    def __init__(self):
        person_schema = Schema('person-value', person_schema_file)

        self.consumer = KafkaConsumer(
            bootstrap_servers='ms-kafka-1:9092',
            group_id='python-srv',
            value_deserializer=lambda v: person_schema.decode_message(v),
            api_version=(0, 10, 2))

    def subscribe(self, onMessage):
        self.consumer.subscribe(['person'])
        print('Subscribed to "person"')

        for message in self.consumer:
            onMessage(message)

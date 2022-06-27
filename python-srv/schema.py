from schema_registry.client import SchemaRegistryClient, schema as s
from schema_registry.serializers import JsonMessageSerializer

class Schema:
    def __init__(self, schema_name, schema):
        self.client = SchemaRegistryClient(url='http://ms-schema-registry:8081')
        
        self.json_message_serializer = JsonMessageSerializer(
            schemaregistry_client=self.client, reader_schema=schema)
        
        self.schema_id = self.client.register(
            schema_name, s.JsonSchema(schema))
        
        print(f'Registered schema "{schema_name}" with ID {self.schema_id}')

    def encode_message(self, message):
        return self.json_message_serializer.encode_record_with_schema_id(
           self.schema_id, message)
    
    def decode_message(self, message):
        return self.json_message_serializer.decode_message(message)

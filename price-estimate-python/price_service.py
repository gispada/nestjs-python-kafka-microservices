import signal
import json
import threading
from random import uniform
from vehicle_stock_consumer import VehicleStockConsumer
from processed_vehicle_producer import ProcessedVehicleProducer

class PriceService:
    """
    Consume messages from a vehicles stock topic,
    process those messages to add price information,
    then publish them to another topic.
    """

    def __init__(self):
        signal.signal(signal.SIGINT, self.stop)
        signal.signal(signal.SIGTERM, self.stop)

        self.vehicle_stock_consumer = VehicleStockConsumer()
        self.processed_vehicle_producer = ProcessedVehicleProducer()

    def start(self):
        self.vehicle_stock_consumer.subscribe(self.onMessage)
  
    def stop(self, signalnum, handler):
        print('Stopping Price service')
        self.vehicle_stock_consumer.close()
        self.processed_vehicle_producer.close()

    def process_vehicle(self, v):
        processed_vehicle = {
            'vin': v['vin'],
            'model': v['model'],
            'manufacturer': v['manufacturer'],
            'year': v['year'],
            'odometer': v['odometer'],
            'odometerUnit': v['odometerUnit'],
            'price': round(uniform(1000, 50000), 2),
            'priceUnit': 'USD',
        }
        # Simulate a long processing time
        t = threading.Timer(30.0,
            lambda : self.processed_vehicle_producer.send(processed_vehicle))
        t.daemon = True
        t.start()

    def onMessage(self, message):
        print(message)
        self.process_vehicle(message.value)

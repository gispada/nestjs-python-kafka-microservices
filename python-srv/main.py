from kafka_service import KafkaService

def main():
    print('Starting Python app')
    service = KafkaService()
    service.start()

if __name__ == "__main__":
    main()

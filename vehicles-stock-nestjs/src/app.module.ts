import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices'
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { PrismaService } from './services/prisma.service'
import { VehicleCreatedProducer } from './services/vehicle-created-producer.service'
import { AppController } from './app.controller'
import { KAFKA_SERVICE } from './constants'

// Note: this app is only a producer
@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'vehicles-stock-app',
            brokers: ['ms-kafka-1:9092'],
          },
          producer: { idempotent: true, allowAutoTopicCreation: true },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: SchemaRegistry,
      useValue: new SchemaRegistry({ host: 'http://ms-schema-registry:8081' }),
    },
    VehicleCreatedProducer,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  // Connect to Kafka immediately, not lazily at the first microservice call
  // https://docs.nestjs.com/microservices/basics#client
  async onApplicationBootstrap() {
    await this.kafkaClient.connect()
  }
}

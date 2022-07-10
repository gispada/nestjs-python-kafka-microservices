import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { PrismaService } from './services/prisma.service'
import { VehicleCreatedProducer } from './services/vehicle-created-producer.service'
import { AppController } from './app.controller'
import configuration from './config'
import { KAFKA_SERVICE } from './constants'

const imports = [
  ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }),
  ClientsModule.registerAsync([
    {
      name: KAFKA_SERVICE,
      useFactory: (config: ConfigService) => ({
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'vehicles-stock-app',
            brokers: [config.get('kafka.bootstrapServer')],
          },
          producer: { idempotent: true, allowAutoTopicCreation: true },
        },
      }),
      inject: [ConfigService],
    },
  ]),
]

const providers = [
  PrismaService,
  {
    provide: SchemaRegistry,
    useFactory: (config: ConfigService) =>
      new SchemaRegistry({ host: config.get('kafka.schemaRegistry') }),
    inject: [ConfigService],
  },
  VehicleCreatedProducer,
]

// Note: this app is only a producer
@Module({
  imports,
  controllers: [AppController],
  providers,
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

import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CONSUMER_GROUP_ID } from './constants'

const DEFAULT_PORT = 3003

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'vehicles-ads-app',
        brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
      },
      consumer: {
        groupId: CONSUMER_GROUP_ID,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  })

  await app.startAllMicroservices()
  await app.listen(process.env.PORT || DEFAULT_PORT)
}

bootstrap()

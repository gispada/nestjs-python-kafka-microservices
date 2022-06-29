import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const DEFAULT_PORT = 3002

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT || DEFAULT_PORT)
}

bootstrap()

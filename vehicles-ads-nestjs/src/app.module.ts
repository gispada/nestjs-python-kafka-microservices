import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { AppController } from './app.controller'
import { VehicleAd, VehicleAdSchema } from './models/vehicle-ad.schema'
import configuration from './config'

const imports = [
  ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }),
  MongooseModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      uri: config.get('database.url'),
    }),
    inject: [ConfigService],
  }),
  MongooseModule.forFeature([
    { name: VehicleAd.name, schema: VehicleAdSchema },
  ]),
]

const providers = [
  {
    provide: SchemaRegistry,
    useFactory: (config: ConfigService) =>
      new SchemaRegistry({ host: config.get('kafka.schemaRegistry') }),
    inject: [ConfigService],
  },
]

// Note: this app is only a consumer
@Module({
  imports,
  controllers: [AppController],
  providers,
})
export class AppModule {}

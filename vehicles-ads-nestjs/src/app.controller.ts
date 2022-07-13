import { Controller, Get, Param } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { KafkaMessage } from 'kafkajs'
import { VehicleAd, VehicleAdDocument } from './models/vehicle-ad.schema'
import { VEHICLE_PROCESSED_TOPIC } from './constants'
import { ProcessedVehicle } from './types'

@Controller('ads')
export class AppController {
  constructor(
    @InjectModel(VehicleAd.name) private vehicleAd: Model<VehicleAdDocument>,
    private readonly schemaRegistry: SchemaRegistry,
  ) {}

  @Get()
  getAds() {
    return this.vehicleAd.find({})
  }

  @Get(':id')
  getAdById(@Param('id') id: string) {
    return this.vehicleAd.findOne({ id })
  }

  // Subscribe to Kafka topic for processed vehicles and save the message on MongoDB
  @EventPattern(VEHICLE_PROCESSED_TOPIC)
  async onVehicleProcessed(@Payload() message: KafkaMessage) {
    const decodedMessage: ProcessedVehicle = await this.schemaRegistry.decode(
      message.value,
    )
    const newVehicleAd = new this.vehicleAd(decodedMessage)
    await newVehicleAd.save()
    console.log(`Successfully created vehicle ad with ID ${newVehicleAd._id}`)
  }
}

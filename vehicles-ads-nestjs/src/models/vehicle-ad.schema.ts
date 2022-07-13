import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

@Schema({ collection: 'ads' })
export class VehicleAd {
  @Prop({ default: () => new Date().toISOString() })
  publishedAt: string

  @Prop({ required: true, unique: true })
  vin: string

  @Prop({ required: true })
  model: string

  @Prop({ required: true })
  manufacturer: string

  @Prop({ required: true })
  year: number

  @Prop({ required: true })
  odometer: number

  @Prop({ required: true })
  odometerUnit: string

  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  priceUnit: string
}

export type VehicleAdDocument = VehicleAd & Document<ObjectId>

export const VehicleAdSchema = SchemaFactory.createForClass(VehicleAd)

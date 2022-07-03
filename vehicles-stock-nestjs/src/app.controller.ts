import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
import { VehicleCreatedProducer } from './services/vehicle-created-producer.service'
import { CreateVehicleDto } from './dtos/create-vehicle.dto'

@Controller('stock')
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vehicleCreatedProducer: VehicleCreatedProducer,
  ) {}

  @Get()
  getVehicles() {
    return this.prisma.vehicle.findMany({})
  }

  @Get(':id')
  getVehicleById(@Param('id', ParseIntPipe) vehicleId: number) {
    return this.prisma.vehicle.findFirst({
      where: { id: vehicleId },
    })
  }

  @Post()
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    const vehicle = await this.prisma.vehicle.create({
      data: createVehicleDto,
    })

    this.vehicleCreatedProducer.emit(vehicle).catch((error) => {
      console.log('ERROR emitting:', vehicle, error)
    })

    return vehicle
  }
}

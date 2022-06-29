import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { CreateVehicleDto } from './dtos/create-vehicle.dto'

@Controller('stock')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

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
  createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: createVehicleDto,
    })
  }
}

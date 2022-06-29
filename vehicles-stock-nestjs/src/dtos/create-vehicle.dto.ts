import { IsIn, IsNotEmpty, IsPositive, IsString } from 'class-validator'

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  vin: string

  @IsString()
  @IsNotEmpty()
  model: string

  @IsIn([1900, new Date().getFullYear()])
  year: number

  @IsString()
  @IsNotEmpty()
  manufacturer: string

  @IsPositive()
  odometer: number

  @IsString()
  @IsNotEmpty()
  odometerUnit: string
}

import {
  IsIn,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator'

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  vin: string

  @IsString()
  @IsNotEmpty()
  model: string

  @Min(1900)
  @Max(new Date().getFullYear())
  year: number

  @IsString()
  @IsNotEmpty()
  manufacturer: string

  @IsPositive()
  odometer: number

  @IsIn(['km', 'mi'])
  @IsNotEmpty()
  odometerUnit: string
}

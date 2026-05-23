import {
  IsString,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  ValidateNested,
  IsDateString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddOnsDto {
  @IsBoolean()
  breakfast!: boolean;

  @IsBoolean()
  spa!: boolean;

  @IsBoolean()
  airportTransfer!: boolean;
}

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  roomType!: string;

  @IsString()
  @IsNotEmpty()
  roomNumber!: string;

  @IsString()
  @IsNotEmpty()
  checkInDate!: string;

  @IsString()
  @IsNotEmpty()
  checkOutDate!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  icNumber!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ValidateNested()
  @Type(() => AddOnsDto)
  addOns!: AddOnsDto;

  @IsNumber()
  @Min(0)
  totalPrice!: number;

  @IsNumber()
  @Min(1)
  totalNights!: number;
}

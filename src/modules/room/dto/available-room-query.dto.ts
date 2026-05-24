import { IsString, IsNotEmpty } from 'class-validator';

export class AvailableRoomsQueryDto {
  @IsString()
  @IsNotEmpty()
  roomCategoryId!: string;

  @IsString()
  @IsNotEmpty()
  checkInDate!: string;

  @IsString()
  @IsNotEmpty()
  checkOutDate!: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
export class RoomTypeOptDto {
  @IsString()
  @IsNotEmpty()
  value!: string;

  @IsString()
  @IsNotEmpty()
  label!: string;
}

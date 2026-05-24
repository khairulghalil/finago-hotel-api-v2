import { Controller, Get, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { AvailableRoomsQueryDto } from './dto/available-room-query.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('getRoomTypeOpt')
  async getRoomTypeOptions() {
    return this.roomService.getRoomTypeOptions();
  }

  @Get('getAvailableRoom')
  async getAvailableRoom(
    @Query()
    query: AvailableRoomsQueryDto,
  ) {
    return this.roomService.getAvailableRooms(query);
  }
}

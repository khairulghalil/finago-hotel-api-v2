import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import {
  RoomCategoryTbl,
  BookingTbl,
  RoomStatusTbl,
  RoomTbl,
} from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomCategoryTbl,
      BookingTbl,
      RoomStatusTbl,
      RoomTbl,
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}

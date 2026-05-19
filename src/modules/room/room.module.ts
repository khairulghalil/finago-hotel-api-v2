import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomCategoryTbl } from '../../entities/room-category';

@Module({
  imports: [TypeOrmModule.forFeature([RoomCategoryTbl])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}

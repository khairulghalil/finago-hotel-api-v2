import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, MoreThan, Repository } from 'typeorm';
import {
  RoomCategoryTbl,
  BookingTbl,
  RoomStatusTbl,
  RoomTbl,
} from '../../entities';
import { RoomTypeOptDto } from './dto/room-type-option.dto';
import { AvailableRoomsDto } from './dto/available-room.dto';
import { AvailableRoomsQueryDto } from './dto/available-room-query.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomCategoryTbl)
    private readonly roomCategoryRepository: Repository<RoomCategoryTbl>,

    @InjectRepository(BookingTbl)
    private readonly bookingRepository: Repository<BookingTbl>,

    @InjectRepository(RoomStatusTbl)
    private readonly roomStatusRepository: Repository<RoomStatusTbl>,

    @InjectRepository(RoomTbl)
    private readonly roomRepository: Repository<RoomTbl>,
  ) {}

  async getRoomTypeOptions(): Promise<RoomTypeOptDto[]> {
    const roomCategories = await this.roomCategoryRepository.find({
      order: { orderIndex: 'ASC' },
    });

    roomCategories.unshift({
      id: 'all',
      name: 'All Categories',
      orderIndex: 0,
    });

    return roomCategories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }

  async getAvailableRooms(
    query: AvailableRoomsQueryDto,
  ): Promise<AvailableRoomsDto[]> {
    const queryBuilder = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin(
        RoomCategoryTbl,
        'roomCategory',
        'room.roomCategoryId = roomCategory.id',
      )
      .leftJoin(
        RoomStatusTbl,
        'roomStatus',
        'room.roomStatusId = roomStatus.id',
      )
      .where('roomStatus.name = "Available"')
      .orderBy('roomCategory.orderIndex', 'ASC')
      .select([
        'room.id as id',
        'room.img as img',
        'roomCategory.name as roomType',
        'room.description as description',
        'room.size as size',
        'room.bedType as bedType',
        'room.roomNumber as roomNumber',
        'room.price as price',
      ]);

    if (query.roomCategoryId !== 'all') {
      queryBuilder.andWhere('room.roomCategoryId = :roomCategoryId', {
        roomCategoryId: query.roomCategoryId,
      });
    }

    const roomList = await queryBuilder.getRawMany();

    const roomIds = roomList.map((room) => room.id);

    const overlappingBookings = await this.bookingRepository.find({
      where: {
        roomId: In(roomIds),
        isCancelled: 0,
        checkInDate: LessThan(query.checkOutDate),
        checkOutDate: MoreThan(query.checkInDate),
      },
    });

    const toRemove = overlappingBookings.map((booking) => booking.roomId);
    const filteredRooms = roomList.filter(
      (room) => !toRemove.includes(room.id),
    );

    return filteredRooms;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomCategoryTbl } from '../../entities/room-category';
import { RoomTypeOption } from './dto/room-type-option.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomCategoryTbl)
    private readonly roomCategoryRepository: Repository<RoomCategoryTbl>,
  ) {}

  async getRoomTypeOptions(): Promise<RoomTypeOption[]> {
    const mockRooms = [
      {
        value: 'all',
        label: 'All Categories',
      },
      {
        value: 'xxhLoMHK',
        label: 'Presidential Suite',
      },
      {
        value: 'KhjnkI6U',
        label: 'Deluxe Room',
      },
      {
        value: 'G5ragaPd',
        label: 'Family Room',
      },
      {
        value: 'e8mpTThT',
        label: 'Standard Room',
      },
    ];

    return mockRooms;

    // Uncomment when database is ready:
    // return await this.roomCategoryRepository.find({
    //   order: { createdAt: 'DESC' },
    // });
  }
}

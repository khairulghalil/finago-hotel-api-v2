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
}

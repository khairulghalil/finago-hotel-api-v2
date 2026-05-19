import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from '../../entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    try {
      const hotel = this.hotelRepository.create(createHotelDto);
      return await this.hotelRepository.save(hotel);
    } catch (error) {
      throw new BadRequestException('Failed to create hotel');
    }
  }

  async findAll(): Promise<Hotel[]> {
    const mockHotels = [
      {
        name: 'The Grand Horizon Resort',
        description:
          'A luxury boutique hotel featuring stunning panoramic ocean views, an infinity pool, and world-class fine dining.',
        address: '123 Oceanfront Promenade, Suite 400',
        city: 'Miami',
        country: 'United States',
        phone: '+1-305-555-0199',
        email: 'frontdesk@grandhorizonresort.com',
        rating: 5,
        isActive: true,
      },
    ];

    return mockHotels as Hotel[];

    // Uncomment when database is ready:
    // return await this.hotelRepository.find({
    //   order: { createdAt: 'DESC' },
    // });
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }
    return hotel;
  }

  async update(id: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const hotel = await this.findOne(id);
    Object.assign(hotel, updateHotelDto);
    try {
      return await this.hotelRepository.save(hotel);
    } catch (error) {
      throw new BadRequestException('Failed to update hotel');
    }
  }

  async remove(id: string): Promise<void> {
    const hotel = await this.findOne(id);
    await this.hotelRepository.softDelete(id);
  }
}

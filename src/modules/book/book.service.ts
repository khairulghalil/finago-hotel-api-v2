import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingTbl, CustomerTbl } from '../../entities';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CryptoService } from '../../common/utils/crypto.util';
import { MESSAGES } from '../../common/constants/messages.constant';
const moment = require('moment');
import { customAlphabet } from 'nanoid';

const alphabet =
  '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 8);

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookingTbl)
    private readonly bookingRepository: Repository<BookingTbl>,

    @InjectRepository(CustomerTbl)
    private readonly customerRepository: Repository<CustomerTbl>,

    private readonly cryptoService: CryptoService,
  ) {}

  async getBookedDate(id: string): Promise<string[]> {
    const bookings = await this.bookingRepository.find({
      select: ['checkInDate', 'checkOutDate'],
      where: { roomId: id },
    });

    const bookedDates: string[] = [];
    bookings.forEach((booking) => {
      const checkInDate = new Date(booking.checkInDate);
      const checkOutDate = new Date(booking.checkOutDate);
      for (
        let date = checkInDate;
        date < checkOutDate;
        date.setDate(date.getDate() + 1)
      ) {
        bookedDates.push(date.toISOString().split('T')[0]);
      }
    });

    return bookedDates;
  }

  async createBooking(data: CreateBookingDto) {
    return await this.bookingRepository.manager.transaction(async (manager) => {
      const custId = nanoid();
      const customerList = await manager.find(CustomerTbl, {
        select: ['id', 'icNumber'],
        where: { email: data.email },
      });

      let customerId: string;

      if (customerList.length === 0) {
        const encryptedIcNumber = await this.cryptoService.encrypt(
          data.icNumber,
        );
        const newCustomer = manager.create(CustomerTbl, {
          id: custId,
          name: data.name,
          email: data.email,
          icNumber: encryptedIcNumber,
          phone: data.phone,
        });
        await manager.save(newCustomer);
        customerId = custId;
      } else {
        const decryptedIcNumber = await this.cryptoService.decrypt(
          customerList[0].icNumber,
        );
        console.log('Data exists. Decrypted IC Number >>', decryptedIcNumber);
        customerId = customerList[0].id;
      }

      const booking = manager.create(BookingTbl, {
        id: nanoid(),
        roomId: data.id,
        customerId: customerId,
        addOns: data.addOns,
        checkInDate: moment(data.checkInDate, 'DD/MM/YYYY').format(
          'YYYY-MM-DD',
        ),
        checkOutDate: moment(data.checkOutDate, 'DD/MM/YYYY').format(
          'YYYY-MM-DD',
        ),
        totalPrice: data.totalPrice,
        isCancelled: 0,
      });
      await manager.save(booking);

      return { message: MESSAGES.BOOKING_CREATED };
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingTbl, CustomerTbl } from '../../entities';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CryptoUtil } from '../../common/utils/crypto.util';
import moment from 'moment';
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
    const custId = nanoid();
    const customerList = await this.customerRepository.find({
      select: ['id', 'icNumber'],
      where: { email: data.email },
    });

    if (customerList.length === 0) {
      const encryptedIcNumber = await CryptoUtil.encrypt(data.icNumber);

      const toSaveCustomer = {
        id: custId,
        name: data.name,
        email: data.email,
        icNumber: encryptedIcNumber,
        phone: data.phone,
      };
      console.log('New customer with encrypted IC:', toSaveCustomer);
      // await this.customerRepository.save(toSaveCustomer);
    } else {
      const decryptedIcNumber = await CryptoUtil.decrypt(
        customerList[0].icNumber,
      );
      console.log('Data exists. Decrypted IC Number >>', decryptedIcNumber);
    }

    const booking = this.bookingRepository.create({
      id: nanoid(),
      roomId: data.id,
      customerId: customerList.length > 0 ? customerList[0].id : custId,
      addOns: data.addOns,
      checkInDate: moment(data.checkInDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      checkOutDate: moment(data.checkOutDate, 'DD/MM/YYYY').format(
        'YYYY-MM-DD',
      ),
      totalPrice: data.totalPrice,
      isCancelled: 0,
    });
    // await this.bookingRepository.save(booking);
    return { message: 'Booking created successfully' };
  }
}

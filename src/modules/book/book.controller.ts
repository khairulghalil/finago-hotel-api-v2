import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('getBookedDate/:id')
  async getBookedDate(@Param('id') id: string): Promise<string[]> {
    return this.bookService.getBookedDate(id);
  }

  @Post('createBooking')
  async createBooking(@Body() bookingData: CreateBookingDto) {
    return this.bookService.createBooking(bookingData);
  }
}

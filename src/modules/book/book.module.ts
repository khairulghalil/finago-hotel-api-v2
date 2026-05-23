import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookingTbl, CustomerTbl } from '../../entities';
import { CryptoService } from '../../common/utils/crypto.util';

@Module({
  imports: [TypeOrmModule.forFeature([BookingTbl, CustomerTbl])],
  controllers: [BookController],
  providers: [BookService, CryptoService],
  exports: [BookService],
})
export class BookModule {}

import { Module } from '@nestjs/common';
import { Manufacturers } from 'src/entities/manufacturers.entity';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Manufacturers])],
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
  exports:[ManufacturersService]

})
export class ManufacturersModule {}

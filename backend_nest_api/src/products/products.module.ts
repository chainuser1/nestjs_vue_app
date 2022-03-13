import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
// import manufacturers module
import { ManufacturersModule } from '../manufacturers/manufacturers.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([Products]),ManufacturersModule
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule {}

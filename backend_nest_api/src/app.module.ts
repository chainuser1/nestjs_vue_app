import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
// import typeworm
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersModule } from './manufacturers/manufacturers.module';

import config from '../ormconfig';

@Module({
  imports: [ProductsModule,ManufacturersModule,
    TypeOrmModule.forRoot(config),
    ],
  controllers: [AppController, ],
  providers: [AppService,],
})
export class AppModule {}

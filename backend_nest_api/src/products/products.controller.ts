import { Post,Get,Controller, Body, Put, Delete, Sse } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { ProductsService } from './products.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Products } from 'src/entities/products.entity';

import { ManufacturersService } from 'src/manufacturers/manufacturers.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Sse('sse')
    sse(){
        return this.productsService.sse();
    }


    @ApiCreatedResponse({type: Products})
    @Get(':id')
    getProduct(id: any) {
        return this.productsService.getProduct(id);
    }

    
    @Post('add')
    createProduct(@Body() body:CreateProductDto) {
        return this.productsService.createProduct(body);
    }

    @Put(':id/edit')
    updateProduct(@Body() body:CreateProductDto, id: number) {
        return this.productsService.updateProduct(id, body);
    }

    @Delete(':id/delete')
    // autoformat as Pipe Integer
    deleteProduct(id: number) {
        return this.productsService.deleteProduct(id);
    }

}


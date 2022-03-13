import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { MessageEvent } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { ManufacturersService } from 'src/manufacturers/manufacturers.service';
@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productsRepo: Repository<Products>,
        private manufacturersService:ManufacturersService) {}


    async getAllProducts(): Promise<Products[]> {
        //   get products from database
        return await this.productsRepo.find({
            relations: ['manufacturer']
        }); 
    }

    async sse(): Promise<Observable<MessageEvent>> {
        // get products from repository and convert to array
        const products = await this.getAllProducts()
        const manufacturers = await this.manufacturersService.getAllManufacturers();
        // send the products to the client every 4 seconds
        return interval(10000).pipe(
            map(() => {
                // data
                return {
                    data: {
                        products:[...products],
                        manufacturers:[...manufacturers]
                    },
                };
            }
          )
        );
    }
    
    
    

    async getProduct(id: number): Promise<Products> {
        try{
            return await this.productsRepo.findOneOrFail(id);
        }catch(e){
            throw new Error("Product not found");
        }
    }
  
    createProduct(body: CreateProductDto){
        let message="";
        try{
            const product = this.productsRepo.create(body);
            product.created_at = new Date();
            this.productsRepo.save(product);
            message = `Product '${product.name}' created`
        }catch(e){
            message = "Product not created";
        }
        return {message:message};
    }

   async updateProduct(id: number, body: CreateProductDto){
        let message="";
        try{
            const product = await this.getProduct(id)
            product.name = body.name;
            product.price = body.price;
            product.stock = body.stock;
            product.description = body.description;
            product.manufacturerId = body.manufacturerId;
            product.updated_at = new Date();
            this.productsRepo.save(product);
            message = `Product '${product.name}' updated`;
        }
        catch(e){
            message = "Product not updated";
        }
        return {message:message};
    }

    async deleteProduct(id: number){
        // delete a product id from database
        let message="";
        try{
            const product = await this.getProduct(id);
            this.productsRepo.remove(product);
            message = `Product '${product.name}' deleted`;
        }
        catch(e){
            message = "Product not deleted";
        }
        return {message:message};
    }
}

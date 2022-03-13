import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Manufacturers } from 'src/entities/manufacturers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturersService {
    constructor(@InjectRepository(Manufacturers) private manufacturersRepo: Repository<Manufacturers>) {}

    async getAllManufacturers(): Promise<Manufacturers[]> {
        //   get products from database
        return await this.manufacturersRepo.find({
            relations: ['products']
        }); 
    }

    async getManufacturer(id: number): Promise<Manufacturers> {
        try{
            return await this.manufacturersRepo.findOneOrFail(id);
        }catch(e){
            throw new Error("Manufacturer not found");
        }
    }

    createManufacturer(body: CreateProductDto):any {
        const manufacturer = this.manufacturersRepo.create(body);
        manufacturer.created_at = new Date();
        this.manufacturersRepo.save(manufacturer);
        return {message:`Manufacturer '${manufacturer.name}' created`};
    }

    async updateManufacturer(id: number, body: CreateProductDto){
        const manufacturer = await this.getManufacturer(id)
        manufacturer.name = body.name;
        manufacturer.updated_at = new Date();
        this.manufacturersRepo.save(manufacturer);
        return {message:`Manufacturer '${manufacturer.name}' updated`};
    }

    deleteManufacturer(id: number): any{
        this.manufacturersRepo.delete(id);
        return {message:`Manufacturer '${id}' deleted`};
    }
}
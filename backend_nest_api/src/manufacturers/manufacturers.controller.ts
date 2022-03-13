import { Post,Get,Controller, Body, Put, Delete } from '@nestjs/common';
import { CreateManufacturerDto } from 'src/dto/create-manufacturer.dto';
import { ManufacturersService } from './manufacturers.service';

@Controller('manufacturers')
export class ManufacturersController {
    constructor(private man_service: ManufacturersService){}

    // getManufacturers()
    @Get()
    getManufacturers() {
        return this.man_service.getAllManufacturers();
    }

    @Get(':id')
    getManuFacturer(id:number){
        return this.man_service.getManufacturer(id)
    }

    @Post('add')
    createManufacturer(@Body() body: CreateManufacturerDto){
        return this.man_service.createManufacturer(body)
    }

    @Put(':id/update')
    updateManufacturer(id:number,@Body() body:CreateManufacturerDto){
        return this.man_service.updateManufacturer(id, body)
    }

    @Delete(':id/delete')
    deleteManufacturer(id:number){
        return this.man_service.deleteManufacturer(id)
    }
}

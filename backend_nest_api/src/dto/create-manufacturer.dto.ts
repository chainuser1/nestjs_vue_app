import { ApiProperty } from "@nestjs/swagger";
export class CreateManufacturerDto{

    @ApiProperty({required:true})
    name: string;

    @ApiProperty({required:false})
    price : number;

    @ApiProperty({required:false})
    stock : number;
}
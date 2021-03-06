import { ApiProperty } from "@nestjs/swagger";
export class CreateProductDto{
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    description?: string;

    @ApiProperty({required:false})
    manufacturerId?: number;

}
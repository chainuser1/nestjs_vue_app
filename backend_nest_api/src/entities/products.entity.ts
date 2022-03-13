import { ApiProperty } from "@nestjs/swagger";
import { Column,JoinColumn, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Manufacturers } from "./manufacturers.entity";
@Entity()
export class Products{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({unique:true})
    name: string;

    @ApiProperty()
    @Column()
    price: number;

    @ApiProperty()
    @Column()
    stock: number;

    @ApiProperty({required:false})
    @Column({nullable:true})
    description?: string;

    @ApiProperty({required:false})
    @Column({nullable:true})
    manufacturerId?: number;

    @ApiProperty({required:false})
    @CreateDateColumn({type: 'timestamp'})
    created_at?: Date;

    @ApiProperty({required:false})
    @UpdateDateColumn({type: 'timestamp'})
    updated_at?: Date;

    @ManyToOne(() => Manufacturers, manufacturer => manufacturer.products,{onDelete:'CASCADE'})
    @JoinColumn({
        name:"manufacturerId"
    })
    manufacturer: Manufacturers;
}
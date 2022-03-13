import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Products } from "./products.entity";
@Entity()
export class Manufacturers {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty({uniqueItems: true, type: String, required: true})
    @Column({ unique: true, nullable: false })
    name: string;

    @CreateDateColumn({ type: "timestamp" })
    @ApiProperty({required: false})
    created_at: Date;

    @ApiProperty({required: false})
    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @OneToMany(() => Products, product => product.manufacturer)
    products: Products[];
}
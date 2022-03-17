import {MigrationInterface, QueryRunner} from "typeorm";

export class DropUniqueManufacturersNameNow1647500433640 implements MigrationInterface {
    name = 'DropUniqueManufacturersNameNow1647500433640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_19c34064fd37743758cff5b403e\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`manufacturerId\` \`manufacturerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_19c34064fd37743758cff5b403e\` FOREIGN KEY (\`manufacturerId\`) REFERENCES \`manufacturers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_19c34064fd37743758cff5b403e\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`manufacturerId\` \`manufacturerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_19c34064fd37743758cff5b403e\` FOREIGN KEY (\`manufacturerId\`) REFERENCES \`manufacturers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665068993711 implements MigrationInterface {
    name = 'openhmis1665068993711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_master" ADD "adminuserid" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_master" DROP COLUMN "adminuserid"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665070891343 implements MigrationInterface {
    name = 'openhmis1665070891343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_master" DROP COLUMN "service_types"`);
        await queryRunner.query(`ALTER TABLE "hsp_master" ADD "service_types" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_master" DROP COLUMN "service_types"`);
        await queryRunner.query(`ALTER TABLE "hsp_master" ADD "service_types" jsonb NOT NULL DEFAULT '[]'`);
    }

}

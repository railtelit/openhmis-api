import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665078736586 implements MigrationInterface {
    name = 'openhmis1665078736586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_master" DROP COLUMN "stateCode"`);
        await queryRunner.query(`ALTER TABLE "hsp_master" ADD "stateCode" character varying`);
        await queryRunner.query(`ALTER TABLE "hsp_master" DROP COLUMN "districtCode"`);
        await queryRunner.query(`ALTER TABLE "hsp_master" ADD "districtCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_master" DROP COLUMN "districtCode"`);
        await queryRunner.query(`ALTER TABLE "hsp_master" ADD "districtCode" integer`);
        await queryRunner.query(`ALTER TABLE "hsp_master" DROP COLUMN "stateCode"`);
        await queryRunner.query(`ALTER TABLE "hsp_master" ADD "stateCode" integer`);
    }

}

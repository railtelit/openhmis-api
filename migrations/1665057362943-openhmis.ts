import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665057362943 implements MigrationInterface {
    name = 'openhmis1665057362943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_service_provider" ADD "stateCode" character varying`);
        await queryRunner.query(`ALTER TABLE "health_service_provider" ADD "districtCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_service_provider" DROP COLUMN "districtCode"`);
        await queryRunner.query(`ALTER TABLE "health_service_provider" DROP COLUMN "stateCode"`);
    }

}

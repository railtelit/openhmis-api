import { MigrationInterface, QueryRunner } from "typeorm";

export class hip1664965969341 implements MigrationInterface {
    name = 'hip1664965969341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "health_service_provider" ("serviceid" integer NOT NULL, "servicename" character varying, CONSTRAINT "PK_5a770e11b50d4ca38b51ff21906" PRIMARY KEY ("serviceid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "health_service_provider"`);
    }

}

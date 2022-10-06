import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665038577659 implements MigrationInterface {
    name = 'openhmis1665038577659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "health_service_provider" ("serviceid" character varying NOT NULL, "servicename" character varying NOT NULL, "service_types" jsonb NOT NULL DEFAULT '[]', "email" character varying, "suffix" character varying NOT NULL, "hprid" character varying, "logoid" character varying, "isactive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_5a770e11b50d4ca38b51ff21906" PRIMARY KEY ("serviceid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "health_service_provider"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665057660092 implements MigrationInterface {
    name = 'openhmis1665057660092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hsp_master" ("serviceid" character varying NOT NULL, "servicename" character varying NOT NULL, "service_types" jsonb NOT NULL DEFAULT '[]', "email" character varying, "suffix" character varying NOT NULL, "hprid" character varying, "logoid" character varying, "isactive" boolean NOT NULL DEFAULT true, "stateCode" integer, "districtCode" integer, CONSTRAINT "PK_00d561cbdc35d9ad7edb67a1b7b" PRIMARY KEY ("serviceid"))`);
        await queryRunner.query(`CREATE TABLE "hsp_users" ("userid" character varying NOT NULL, CONSTRAINT "PK_46a3b0cfa00953df03bb170b233" PRIMARY KEY ("userid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hsp_users"`);
        await queryRunner.query(`DROP TABLE "hsp_master"`);
    }

}

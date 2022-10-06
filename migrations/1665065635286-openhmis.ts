import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665065635286 implements MigrationInterface {
    name = 'openhmis1665065635286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hsp_gencodetypes" ("codetype" character varying NOT NULL, CONSTRAINT "PK_ca59e2623355c973548be322a8a" PRIMARY KEY ("codetype"))`);
        await queryRunner.query(`CREATE TABLE "hsp_organisation" ("id" SERIAL NOT NULL, "orgname" character varying NOT NULL, "orgtype" character varying NOT NULL, "hspServiceid" character varying NOT NULL, CONSTRAINT "PK_9cc9be86c1b5ff1c3618ce0a500" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hsp_gencodes" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "codetypeCodetype" character varying, CONSTRAINT "PK_75e8207c3a8ac391ab7cab336d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hsp_users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hsp_users" ADD "orgId" integer`);
        await queryRunner.query(`ALTER TABLE "hsp_organisation" ADD CONSTRAINT "FK_3bb4afa07770a9d401c6ce596ea" FOREIGN KEY ("hspServiceid") REFERENCES "hsp_master"("serviceid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hsp_gencodes" ADD CONSTRAINT "FK_8f02be346fc906b66aac01f90a9" FOREIGN KEY ("codetypeCodetype") REFERENCES "hsp_gencodetypes"("codetype") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hsp_users" ADD CONSTRAINT "FK_91447c3532ef7243253d56e8780" FOREIGN KEY ("orgId") REFERENCES "hsp_organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_users" DROP CONSTRAINT "FK_91447c3532ef7243253d56e8780"`);
        await queryRunner.query(`ALTER TABLE "hsp_gencodes" DROP CONSTRAINT "FK_8f02be346fc906b66aac01f90a9"`);
        await queryRunner.query(`ALTER TABLE "hsp_organisation" DROP CONSTRAINT "FK_3bb4afa07770a9d401c6ce596ea"`);
        await queryRunner.query(`ALTER TABLE "hsp_users" DROP COLUMN "orgId"`);
        await queryRunner.query(`ALTER TABLE "hsp_users" DROP COLUMN "username"`);
        await queryRunner.query(`DROP TABLE "hsp_gencodes"`);
        await queryRunner.query(`DROP TABLE "hsp_organisation"`);
        await queryRunner.query(`DROP TABLE "hsp_gencodetypes"`);
    }

}

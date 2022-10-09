import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665341984704 implements MigrationInterface {
    name = 'openhmis1665341984704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_userroles" ADD "userUserid" character varying`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles" ADD "locationId" integer`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles" ADD CONSTRAINT "FK_df88d41dea622a4e3f76d4b323c" FOREIGN KEY ("userUserid") REFERENCES "hsp_users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles" ADD CONSTRAINT "FK_d24169d58541990d0dfee814213" FOREIGN KEY ("locationId") REFERENCES "hsp_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_userroles" DROP CONSTRAINT "FK_d24169d58541990d0dfee814213"`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles" DROP CONSTRAINT "FK_df88d41dea622a4e3f76d4b323c"`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles" DROP COLUMN "locationId"`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles" DROP COLUMN "userUserid"`);
    }

}

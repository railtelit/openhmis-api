import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665128959821 implements MigrationInterface {
    name = 'openhmis1665128959821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hsp_userroles" ("roleid" SERIAL NOT NULL, CONSTRAINT "PK_1bec7942a2c0448ea49e05e74c5" PRIMARY KEY ("roleid"))`);
        await queryRunner.query(`CREATE TABLE "hsp_locations" ("id" SERIAL NOT NULL, "locationname" character varying NOT NULL, "roletype" character varying, "physicaltype" character varying, "status" character varying NOT NULL DEFAULT 'active', "orgId" integer, CONSTRAINT "PK_2d7df55599436b662eae93a2056" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hsp_userroles_user_hsp_users" ("hspUserrolesRoleid" integer NOT NULL, "hspUsersUserid" character varying NOT NULL, CONSTRAINT "PK_d535c5d3317cdeb0894428d45bd" PRIMARY KEY ("hspUserrolesRoleid", "hspUsersUserid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45d7a6417935db6f9e17c2882b" ON "hsp_userroles_user_hsp_users" ("hspUserrolesRoleid") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff3a86fc3541b406ba2766cbec" ON "hsp_userroles_user_hsp_users" ("hspUsersUserid") `);
        await queryRunner.query(`CREATE TABLE "hsp_userroles_location_hsp_locations" ("hspUserrolesRoleid" integer NOT NULL, "hspLocationsId" integer NOT NULL, CONSTRAINT "PK_073ea846c34fe7953dcdf312864" PRIMARY KEY ("hspUserrolesRoleid", "hspLocationsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_60539cac0b56fe51981e4e098b" ON "hsp_userroles_location_hsp_locations" ("hspUserrolesRoleid") `);
        await queryRunner.query(`CREATE INDEX "IDX_9a28a290bf4b81471c8154b2fc" ON "hsp_userroles_location_hsp_locations" ("hspLocationsId") `);
        await queryRunner.query(`ALTER TABLE "hsp_users" ADD "keycloakid" character varying`);
        await queryRunner.query(`ALTER TABLE "hsp_users" ADD "emailid" character varying`);
        await queryRunner.query(`ALTER TABLE "hsp_users" ADD "mobileno" character varying`);
        await queryRunner.query(`ALTER TABLE "hsp_organisation" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "hsp_organisation" ADD CONSTRAINT "FK_cd4a4bd92d2bf026a6e6d6d5736" FOREIGN KEY ("parentId") REFERENCES "hsp_organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hsp_locations" ADD CONSTRAINT "FK_4dfc6e61885ed690537b2f2707f" FOREIGN KEY ("orgId") REFERENCES "hsp_organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles_user_hsp_users" ADD CONSTRAINT "FK_45d7a6417935db6f9e17c2882b8" FOREIGN KEY ("hspUserrolesRoleid") REFERENCES "hsp_userroles"("roleid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles_user_hsp_users" ADD CONSTRAINT "FK_ff3a86fc3541b406ba2766cbeca" FOREIGN KEY ("hspUsersUserid") REFERENCES "hsp_users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles_location_hsp_locations" ADD CONSTRAINT "FK_60539cac0b56fe51981e4e098b7" FOREIGN KEY ("hspUserrolesRoleid") REFERENCES "hsp_userroles"("roleid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles_location_hsp_locations" ADD CONSTRAINT "FK_9a28a290bf4b81471c8154b2fc2" FOREIGN KEY ("hspLocationsId") REFERENCES "hsp_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_userroles_location_hsp_locations" DROP CONSTRAINT "FK_9a28a290bf4b81471c8154b2fc2"`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles_location_hsp_locations" DROP CONSTRAINT "FK_60539cac0b56fe51981e4e098b7"`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles_user_hsp_users" DROP CONSTRAINT "FK_ff3a86fc3541b406ba2766cbeca"`);
        await queryRunner.query(`ALTER TABLE "hsp_userroles_user_hsp_users" DROP CONSTRAINT "FK_45d7a6417935db6f9e17c2882b8"`);
        await queryRunner.query(`ALTER TABLE "hsp_locations" DROP CONSTRAINT "FK_4dfc6e61885ed690537b2f2707f"`);
        await queryRunner.query(`ALTER TABLE "hsp_organisation" DROP CONSTRAINT "FK_cd4a4bd92d2bf026a6e6d6d5736"`);
        await queryRunner.query(`ALTER TABLE "hsp_organisation" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "hsp_users" DROP COLUMN "mobileno"`);
        await queryRunner.query(`ALTER TABLE "hsp_users" DROP COLUMN "emailid"`);
        await queryRunner.query(`ALTER TABLE "hsp_users" DROP COLUMN "keycloakid"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a28a290bf4b81471c8154b2fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_60539cac0b56fe51981e4e098b"`);
        await queryRunner.query(`DROP TABLE "hsp_userroles_location_hsp_locations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff3a86fc3541b406ba2766cbec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45d7a6417935db6f9e17c2882b"`);
        await queryRunner.query(`DROP TABLE "hsp_userroles_user_hsp_users"`);
        await queryRunner.query(`DROP TABLE "hsp_locations"`);
        await queryRunner.query(`DROP TABLE "hsp_userroles"`);
    }

}

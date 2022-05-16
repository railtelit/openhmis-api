import {MigrationInterface, QueryRunner} from "typeorm";

export class uhi1650292313752 implements MigrationInterface {
    name = 'uhi1650292313752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dhpinfo" ("id" SERIAL NOT NULL, CONSTRAINT "PK_06c326236504022672de4c18aa4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dhpinfo"`);
    }

}

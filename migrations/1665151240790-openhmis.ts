import { MigrationInterface, QueryRunner } from "typeorm";

export class openhmis1665151240790 implements MigrationInterface {
    name = 'openhmis1665151240790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_userroles" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hsp_userroles" DROP COLUMN "role"`);
    }

}

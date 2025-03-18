import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740101760735 implements MigrationInterface {
    name = 'Default1740101760735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "UQ_97c66ab0029f49fde30517f8199"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "UQ_97c66ab0029f49fde30517f8199" UNIQUE ("slug")`);
    }

}

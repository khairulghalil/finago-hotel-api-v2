import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeICNumberLength1779888466371 implements MigrationInterface {
  name = 'ChangeICNumberLength1779888466371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE customerTbl
    MODIFY COLUMN icNumber varchar(150) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE customerTbl
    MODIFY COLUMN icNumber varchar(100) NOT NULL`);
  }
}

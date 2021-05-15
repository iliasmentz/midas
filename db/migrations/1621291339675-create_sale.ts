import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateSale implements MigrationInterface {
  name = 'createSale1621291339675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sale"
       (
         "id"          uuid      NOT NULL DEFAULT uuid_generate_v4(),
         "user_id"     uuid      NOT NULL,
         "token"       text      NOT NULL,
         "amount"      integer   NOT NULL,
         "processor"   text      NOT NULL,
         "currency"    text      NOT NULL,
         "description" text      NOT NULL,
         "email"       text,
         "external_id" text      NOT NULL,
         "status"      text      NOT NULL,
         "executed_at" TIMESTAMP NOT NULL,
         CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id")
       )`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "idx_sale_card_token" ON "sale" ("token") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_sale_card_token"`);
    await queryRunner.query(`DROP TABLE "sale"`);
  }
}

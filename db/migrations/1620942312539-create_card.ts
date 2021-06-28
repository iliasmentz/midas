import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateCardTable implements MigrationInterface {
  name = 'createCard1620942312539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "card"
       (
         "id"               uuid                  NOT NULL DEFAULT uuid_generate_v4(),
         "user_id"          uuid                  NOT NULL,
         "token"            character varying(21) NOT NULL,
         "number"           text                  NOT NULL,
         "expiration_month" integer               NOT NULL,
         "expiration_year"  integer               NOT NULL,
         "cvc"              integer               NOT NULL,
         "invalid_at"       TIMESTAMP             NOT NULL,
         CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id")
       )`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "idx_card_token" ON "card" ("token") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_card_token"`);
    await queryRunner.query(`DROP TABLE "card"`);
  }
}

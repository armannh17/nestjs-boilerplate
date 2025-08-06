import { Migration } from "@mikro-orm/migrations";

export class Migration20250806063745User extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "wallet_address" varchar(255) not null, "challenge_code" varchar(255) not null, "referral_code" varchar(255) not null, "referrer_id" uuid null, constraint "user_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "user" add constraint "user_referrer_id_foreign" foreign key ("referrer_id") references "user" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_referrer_id_foreign";`);

    this.addSql(`drop table if exists "user" cascade;`);
  }
}

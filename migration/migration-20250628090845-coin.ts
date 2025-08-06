import { Migration } from "@mikro-orm/migrations";

export class Migration20250628090845Coin extends Migration {
	override async up(): Promise<void> {
		this.addSql(
			`create table "coin" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "symbol" varchar(255) not null, constraint "coin_pkey" primary key ("id"));`,
		);
	}

	override async down(): Promise<void> {
		this.addSql(`drop table if exists "coin" cascade;`);
	}
}

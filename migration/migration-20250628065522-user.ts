import { Migration } from "@mikro-orm/migrations";

export class Migration20250628065522User extends Migration {
	override async up(): Promise<void> {
		this.addSql(
			`create table "user" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null,constraint "user_pkey" primary key ("id"));`,
		);
	}

	override async down(): Promise<void> {
		this.addSql(`drop table if exists "user" cascade;`);
	}
}

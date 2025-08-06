import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/entity/base.entity";

@Entity({ tableName: "user" })
export class UserEntity extends BaseEntity {
	@Property({ type: "varchar", name: "email" })
	public readonly email!: string;

	@Property({ type: "varchar", name: "password" })
	public readonly password!: string;
}

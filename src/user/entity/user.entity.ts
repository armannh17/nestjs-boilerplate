import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/entity/base.entity";

@Entity({ tableName: "user" })
export class UserEntity extends BaseEntity {
	@Property({ type: "varchar", name: "wallet_address" })
	public walletAddress!: string;

	@Property({ type: "varchar", name: "challenge_code" })
	public challengeCode!: string;
}

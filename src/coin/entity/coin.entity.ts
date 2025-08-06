import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/entity/base.entity";

@Entity({ tableName: "coin" })
export class CoinEntity extends BaseEntity {
	@Property({ type: "varchar", name: "name" })
	public readonly name!: string;

	@Property({ type: "varchar", name: "symbol" })
	public readonly symbol!: string;
}

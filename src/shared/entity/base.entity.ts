import { PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectFactory } from "../factory/object.factory";

export abstract class BaseEntity {
	@PrimaryKey({ type: "uuid", name: "id" })
	public readonly id: string;

	@Property({ type: "datetime", name: "created_at", onCreate: () => new Date() })
	public readonly createdAt: Date;

	@Property({ type: "datetime", name: "updated_at", onCreate: () => new Date(), onUpdate: () => new Date() })
	public readonly updatedAt: Date;

	constructor() {
		this.id = ObjectFactory.makeId();
		this.createdAt = ObjectFactory.makeCreatedAt();
		this.updatedAt = ObjectFactory.makeUpdatedAt();
	}
}

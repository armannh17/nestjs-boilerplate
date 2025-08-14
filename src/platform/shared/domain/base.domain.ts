import { ObjectFactory } from "../factory/object.factory";

export abstract class BaseDomain {
  public readonly id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor() {
    this.id = ObjectFactory.makeId();
    this.createdAt = ObjectFactory.makeCreatedAt();
    this.updatedAt = ObjectFactory.makeUpdatedAt();
  }
}

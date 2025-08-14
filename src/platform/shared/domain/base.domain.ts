import { ObjectFactory } from "../factory/object.factory";

export abstract class BaseDomain {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor() {
    this.id = ObjectFactory.makeId();
    this.createdAt = ObjectFactory.makeCreatedAt();
    this.updatedAt = ObjectFactory.makeUpdatedAt();
  }
}

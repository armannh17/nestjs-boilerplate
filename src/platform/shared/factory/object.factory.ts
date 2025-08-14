import { v7 as uuidv7 } from "uuid";

export class ObjectFactory {
  public static makeId(): string {
    return uuidv7();
  }

  public static makeCreatedAt(): Date {
    return new Date();
  }

  public static makeUpdatedAt(): Date {
    return new Date();
  }
}

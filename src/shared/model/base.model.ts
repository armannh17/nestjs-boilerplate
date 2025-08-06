export abstract class BaseModel {
  constructor(
    public id: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

import { BaseModel } from "src/shared/model/base.model";

export class CoinModel extends BaseModel {
	public name: string;
	public symbol: string;

	constructor(id: string, name: string, symbol: string, createdAt: Date, updatedAt: Date) {
		super(id, createdAt, updatedAt);

		this.name = name;
		this.symbol = symbol;
	}
}

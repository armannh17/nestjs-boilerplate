import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { CoinEntity } from "../entity/coin.entity";
import { CoinModel } from "../model/coin.model";

@Injectable()
export class CoinMapper {
	constructor(private readonly entityManager: EntityManager) {}

	public mapCoinModelToEntity(model: CoinModel): CoinEntity {
		return this.entityManager.create(CoinEntity, {
			id: model.id,
			name: model.name,
			symbol: model.symbol,
			createdAt: model.createdAt,
			updatedAt: model.updatedAt,
		});
	}
}

import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { CoinMapper } from "../mapper/coin.mapper";
import { CoinModel } from "../model/coin.model";

@Injectable()
export class CoinRepository {
	constructor(
		private readonly entityManager: EntityManager,
		private readonly coinMapper: CoinMapper,
	) {}

	public insertCoin(coin: CoinModel): void {
		const entity = this.coinMapper.mapCoinModelToEntity(coin);

		this.entityManager.persist(entity);
	}
}

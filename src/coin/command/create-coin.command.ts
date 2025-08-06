import { Command } from "@nestjs/cqrs";
import { CoinModel } from "../model/coin.model";

export class CreateCoinCommand extends Command<CoinModel> {
	constructor(
		public readonly name: string,
		public readonly symbol: string,
	) {
		super();
	}
}

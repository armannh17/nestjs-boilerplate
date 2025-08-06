import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppUow } from "src/database/uow/app.uow";
import { CreateCoinCommand } from "../command/create-coin.command";
import { CoinModel } from "../model/coin.model";

@Injectable()
export class CoinService {
	constructor(
		private readonly appUow: AppUow,
		private readonly commandBus: CommandBus,
	) {}

	public async createCoin(command: CreateCoinCommand): Promise<CoinModel> {
		const coin = await this.commandBus.execute(command);

		await this.appUow.flush();

		return coin;
	}
}

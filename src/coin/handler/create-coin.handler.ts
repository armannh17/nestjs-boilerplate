import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ObjectFactory } from "src/shared/factory/object.factory";
import { CreateCoinCommand } from "../command/create-coin.command";
import { CoinModel } from "../model/coin.model";
import { CoinRepository } from "../repository/coin.repository";

@CommandHandler(CreateCoinCommand)
export class CreateCoinHandler implements ICommandHandler<CreateCoinCommand> {
	constructor(private readonly coinRepository: CoinRepository) {}

	public async execute(command: CreateCoinCommand): Promise<CoinModel> {
		const coin = new CoinModel(
			ObjectFactory.makeId(),
			command.name,
			command.symbol,
			ObjectFactory.makeCreatedAt(),
			ObjectFactory.makeUpdatedAt(),
		);

		this.coinRepository.insertCoin(coin);

		return coin;
	}
}

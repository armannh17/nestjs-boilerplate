import { Injectable } from "@nestjs/common";
import { CreateCoinCommand } from "../command/create-coin.command";
import { CreateCoinReqDto } from "../dto/create-coin-req.dto";
import { CreateCoinResDto } from "../dto/create-coin-res.dto";
import { CoinModel } from "../model/coin.model";

@Injectable()
export class CoinSerializer {
	public serializeCreateCoinDtoToCommand(dto: CreateCoinReqDto): CreateCoinCommand {
		return new CreateCoinCommand(dto.name, dto.symbol);
	}

	public serializeCreateCoinModelToDto(model: CoinModel): CreateCoinResDto {
		return new CreateCoinResDto(model.id, model.name, model.symbol, model.createdAt, model.updatedAt);
	}
}

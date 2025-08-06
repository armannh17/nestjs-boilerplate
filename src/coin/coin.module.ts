import { Module } from "@nestjs/common";
import { CoinController } from "./controller/coin.controller";
import { CoinMapper } from "./mapper/coin.mapper";
import { CoinSerializer } from "./serializer/coin.serializer";
import { CoinService } from "./service/coin.service";
import { CreateCoinHandler } from "./handler/create-coin.handler";
import { CoinRepository } from "./repository/coin.repository";

@Module({
	imports: [],
	controllers: [CoinController],
	providers: [CoinMapper, CoinSerializer, CoinService, CreateCoinHandler, CoinRepository],
	exports: [],
})
export class CoinModule {}

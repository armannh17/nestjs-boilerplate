import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ResponseDto } from "src/shared/dto/response.dto";
import { CreateCoinReqDto } from "../dto/create-coin-req.dto";
import { CreateCoinResDto } from "../dto/create-coin-res.dto";
import { CoinSerializer } from "../serializer/coin.serializer";
import { CoinService } from "../service/coin.service";

@Controller({ path: "/coins", version: "1" })
export class CoinController {
	constructor(
		private readonly coinSerializer: CoinSerializer,
		private readonly coinService: CoinService,
	) {}

	@Post("/")
	@HttpCode(HttpStatus.CREATED)
	public async createCoin(@Body() dto: CreateCoinReqDto): Promise<ResponseDto<CreateCoinResDto>> {
		const command = this.coinSerializer.serializeCreateCoinDtoToCommand(dto);

		const coin = await this.coinService.createCoin(command);

		const res = this.coinSerializer.serializeCreateCoinModelToDto(coin);

		return new ResponseDto(HttpStatus.CREATED, "successful", res);
	}
}

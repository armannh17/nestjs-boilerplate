import { IsEthereumAddress, IsNotEmpty, IsString } from "class-validator";

export class LoginUserReqDto {
	@IsString()
	@IsNotEmpty()
	@IsEthereumAddress()
	public readonly walletAddress!: string;
}

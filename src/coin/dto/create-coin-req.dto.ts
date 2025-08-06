import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCoinReqDto {
	@IsString()
	@IsNotEmpty()
	@IsAlphanumeric()
	@MaxLength(32)
	public readonly name!: string;

	@IsString()
	@IsNotEmpty()
	@IsAlphanumeric()
	@MaxLength(10)
	public readonly symbol!: string;
}

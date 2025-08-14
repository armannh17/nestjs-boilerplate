import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsHexadecimal, IsNotEmpty, IsString } from "class-validator";

export class VerifyUserReqDto {
  @ApiProperty({ default: "0x7371f9821BEf815984587a6963F9ea9a66307dA3" })
  @IsString()
  @IsNotEmpty()
  @IsEthereumAddress()
  public readonly walletAddress!: string;

  @ApiProperty({ default: "cf4936b13c647e00a2a69c7b42de6d9f97f7b416cc20757911a4de1e13d9c798" })
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  public readonly signature!: string;
}

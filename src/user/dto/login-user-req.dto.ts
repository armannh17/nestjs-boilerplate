import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsNotEmpty, IsString } from "class-validator";

export class LoginUserReqDto {
  @ApiProperty({ default: "0x7371f9821BEf815984587a6963F9ea9a66307dA3" })
  @IsString()
  @IsNotEmpty()
  @IsEthereumAddress()
  public readonly walletAddress!: string;
}

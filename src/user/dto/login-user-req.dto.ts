import { ApiProperty } from "@nestjs/swagger";
import {
  IsEthereumAddress,
  IsHexadecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class LoginUserReqDto {
  @ApiProperty({ default: "0x7371f9821BEf815984587a6963F9ea9a66307dA3" })
  @IsString()
  @IsNotEmpty()
  @IsEthereumAddress()
  public readonly walletAddress!: string;

  @ApiProperty({ default: "9f3a1c9d5e4b7f8a" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  @Length(16)
  public readonly referralCode?: string;
}

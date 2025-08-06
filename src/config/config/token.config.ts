import { IsHexadecimal, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class TokenConfig {
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  public readonly secret = String(process.env.TOKEN_SECRET);

  @IsInt()
  @IsPositive()
  public readonly expiry = Number(process.env.TOKEN_EXPIRY);
}

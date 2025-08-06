import { Injectable } from "@nestjs/common";
import { LoginUserResDto } from "../dto/login-user-res.dto";
import { VerifyUserResDto } from "../dto/verify-user-res.dto";

@Injectable()
export class UserMapper {
  public mapLoginUserResult(challengeCode: string): LoginUserResDto {
    return new LoginUserResDto(challengeCode);
  }

  public mapVerifyUserResult(token: string): VerifyUserResDto {
    return new VerifyUserResDto(token);
  }
}

import { Injectable } from "@nestjs/common";
import { LoginUserResDto } from "../dto/login-user-res.dto";

@Injectable()
export class UserMapper {
  public mapLoginUserResult(challengeCode: string): LoginUserResDto {
    return new LoginUserResDto(challengeCode);
  }
}

import { Injectable } from "@nestjs/common";
import { LoginUserReqDto } from "../dto/login-user-req.dto";
import { LoginUserResDto } from "../dto/login-user-res.dto";
import { VerifyUserReqDto } from "../dto/verify-user-req.dto";
import { VerifyUserResDto } from "../dto/verify-user-res.dto";
import { LoginResultModel } from "../model/login-result.model";
import { LoginUserModel } from "../model/login-user.model";
import { VerifyResultModel } from "../model/verify-result.model";
import { VerifyUserModel } from "../model/verify-user.model";

@Injectable()
export class UserSerializer {
  public serializeLoginUserModel(dto: LoginUserReqDto): LoginUserModel {
    return new LoginUserModel(dto.walletAddress, dto.referralCode);
  }

  public serializeLoginUserDto(result: LoginResultModel): LoginUserResDto {
    return new LoginUserResDto(result.challengeCode);
  }

  public serializeVerifyUserModel(dto: VerifyUserReqDto): VerifyUserModel {
    return new VerifyUserModel(dto.walletAddress, dto.signature);
  }

  public serializeVerifyUserDto(result: VerifyResultModel): VerifyUserResDto {
    return new VerifyUserResDto(result.token);
  }
}

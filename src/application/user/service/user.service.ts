import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppUow } from "src/platform/database/uow/app.uow";
import { LoginUserCommand } from "../command/login-user.command";
import { VerifyUserCommand } from "../command/verify-user.command";
import { LoginResultModel } from "../model/login-result.model";
import { LoginUserModel } from "../model/login-user.model";
import { VerifyResultModel } from "../model/verify-result.model";
import { VerifyUserModel } from "../model/verify-user.model";

@Injectable()
export class UserService {
  constructor(
    private readonly appUow: AppUow,
    private readonly commandBus: CommandBus,
  ) {}

  public async loginUser(data: LoginUserModel): Promise<LoginResultModel> {
    const user = await this.commandBus.execute(
      new LoginUserCommand(data.walletAddress, data.referralCode),
    );

    await this.appUow.flush();

    return new LoginResultModel(user.challengeCode);
  }

  public async verifyUser(data: VerifyUserModel): Promise<VerifyResultModel> {
    const token = await this.commandBus.execute(
      new VerifyUserCommand(data.walletAddress, data.signature),
    );

    return new VerifyResultModel(token);
  }
}

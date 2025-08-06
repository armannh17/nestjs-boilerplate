import { CommandBus, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CryptoHelper } from "src/shared/helper/crypto.helper";
import { LoginUserCommand } from "../command/login-user.command";
import { RegisterUserCommand } from "../command/register-user.command";
import { UserEntity } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly cryptoHelper: CryptoHelper,
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}

  public async execute(command: LoginUserCommand): Promise<UserEntity> {
    const user = await this.userRepository.findUserByWalletAddress(command.walletAddress);

    if (!user) {
      return await this.commandBus.execute(
        new RegisterUserCommand(command.walletAddress, command.referralCode),
      );
    }

    user.challengeCode = this.cryptoHelper.generateChallengeCode();

    return user;
  }
}

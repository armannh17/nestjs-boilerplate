import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterUserCommand } from "../command/register-user.command";
import { UserEntity } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";
import { CryptoHelper } from "src/shared/helper/crypto.helper";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly cryptoHelper: CryptoHelper,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: RegisterUserCommand): Promise<UserEntity> {
    const user = new UserEntity();

    user.walletAddress = command.walletAddress;
    user.challengeCode = this.cryptoHelper.generateChallengeCode();

    this.userRepository.saveUser(user);

    return user;
  }
}

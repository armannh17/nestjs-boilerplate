import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CryptoHelper } from "src/platform/shared/helper/crypto.helper";
import { RegisterUserCommand } from "../command/register-user.command";
import { UserEntity } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

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
    user.referralCode = this.cryptoHelper.generateReferralCode();

    user.referrer = command.referralCode ? await this.getReferrer(command.referralCode) : undefined;

    this.userRepository.saveUser(user);

    return user;
  }

  private async getReferrer(referralCode: string): Promise<UserEntity> {
    const referrer = await this.userRepository.findUserByReferralCode(referralCode);

    if (!referrer) {
      throw new NotFoundException("referral does not exist");
    }

    return referrer;
  }
}

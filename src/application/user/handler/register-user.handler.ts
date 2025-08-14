import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CryptoHelper } from "src/platform/shared/helper/crypto.helper";
import { RegisterUserCommand } from "../command/register-user.command";
import { UserDomain } from "../domain/user.domain";
import { ReferralNotFoundException } from "../exception/referral-not-found.exception";
import { UserRepository } from "../repository/user.repository";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly cryptoHelper: CryptoHelper,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: RegisterUserCommand): Promise<UserDomain> {
    const user = new UserDomain();

    user.walletAddress = command.walletAddress;
    user.challengeCode = this.cryptoHelper.generateChallengeCode();
    user.referralCode = this.cryptoHelper.generateReferralCode();

    user.referrer = command.referralCode ? await this.getReferrer(command.referralCode) : undefined;

    this.userRepository.saveUser(user);

    return user;
  }

  private async getReferrer(referralCode: string): Promise<UserDomain> {
    const referrer = await this.userRepository.findUserByReferralCode(referralCode);

    if (!referrer) {
      throw new ReferralNotFoundException();
    }

    return referrer;
  }
}

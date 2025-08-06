import { UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CryptoHelper } from "src/shared/helper/crypto.helper";
import { VerifyUserCommand } from "../command/verify-user.command";
import { UserRepository } from "../repository/user.repository";

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
  constructor(
    private readonly cryptoHelper: CryptoHelper,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: VerifyUserCommand): Promise<string> {
    const user = await this.userRepository.findUserByWalletAddress(command.walletAddress);

    if (!user) {
      throw new UnauthorizedException("invalid credentials provided");
    }

    const signer = this.cryptoHelper.verifySignature(user.challengeCode, command.signature);

    if (signer !== user.walletAddress) {
      throw new UnauthorizedException("invalid credentials provided");
    }

    return await this.cryptoHelper.generateToken(user.id);
  }
}

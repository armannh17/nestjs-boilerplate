import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CryptoHelper } from "src/platform/shared/helper/crypto.helper";
import { VerifyUserCommand } from "../command/verify-user.command";
import { InvalidCredentialException } from "../exception/invalid-credential.exception";
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
      throw new InvalidCredentialException();
    }

    const signer = this.cryptoHelper.verifySignature(user.challengeCode, command.signature);

    if (signer !== user.walletAddress) {
      throw new InvalidCredentialException();
    }

    return await this.cryptoHelper.generateToken(user.id);
  }
}

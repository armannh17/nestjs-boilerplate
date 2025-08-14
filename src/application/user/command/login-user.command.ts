import { Command } from "@nestjs/cqrs";
import { UserDomain } from "../domain/user.domain";

export class LoginUserCommand extends Command<UserDomain> {
  constructor(
    public readonly walletAddress: string,
    public readonly referralCode?: string,
  ) {
    super();
  }
}

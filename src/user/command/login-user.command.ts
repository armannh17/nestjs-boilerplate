import { Command } from "@nestjs/cqrs";
import { UserEntity } from "../entity/user.entity";

export class LoginUserCommand extends Command<UserEntity> {
  constructor(
    public readonly walletAddress: string,
    public readonly referralCode?: string,
  ) {
    super();
  }
}

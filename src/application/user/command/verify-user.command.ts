import { Command } from "@nestjs/cqrs";

export class VerifyUserCommand extends Command<string> {
  constructor(
    public readonly walletAddress: string,
    public readonly signature: string,
  ) {
    super();
  }
}

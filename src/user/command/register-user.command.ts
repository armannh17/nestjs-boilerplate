import { Command } from "@nestjs/cqrs";
import { UserEntity } from "../entity/user.entity";

export class RegisterUserCommand extends Command<UserEntity> {
	constructor(public readonly walletAddress: string) {
		super();
	}
}

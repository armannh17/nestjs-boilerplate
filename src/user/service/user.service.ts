import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppUow } from "src/database/uow/app.uow";
import { LoginUserCommand } from "../command/login-user.command";
import { LoginUserReqDto } from "../dto/login-user-req.dto";
import { LoginUserResDto } from "../dto/login-user-res.dto";
import { UserMapper } from "../mapper/user.mapper";

@Injectable()
export class UserService {
	constructor(
		private readonly appUow: AppUow,
		private readonly userMapper: UserMapper,
		private readonly commandBus: CommandBus,
	) {}

	public async loginUser(dto: LoginUserReqDto): Promise<LoginUserResDto> {
		const user = await this.commandBus.execute(new LoginUserCommand(dto.walletAddress));

		await this.appUow.flush();

		return this.userMapper.mapLoginUserResult(user.challengeCode);
	}
}

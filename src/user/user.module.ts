import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { LoginUserHandler } from "./handler/login-user.handler";
import { RegisterUserHandler } from "./handler/register-user.handler";
import { UserMapper } from "./mapper/user.mapper";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./service/user.service";

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserRepository, UserMapper, UserService, RegisterUserHandler, LoginUserHandler],
	exports: [],
})
export class UserModule {}

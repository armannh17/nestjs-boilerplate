import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ResponseDto } from "src/shared/dto/response.dto";
import { LoginUserReqDto } from "../dto/login-user-req.dto";
import { LoginUserResDto } from "../dto/login-user-res.dto";
import { UserService } from "../service/user.service";

@Controller({ path: "/users", version: "1" })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() dto: LoginUserReqDto): Promise<ResponseDto<LoginUserResDto>> {
    const res = await this.userService.loginUser(dto);

    return new ResponseDto(HttpStatus.OK, "successful", res);
  }
}

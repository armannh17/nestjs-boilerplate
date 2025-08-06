import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseWrapper } from "src/shared/decorator/api-response-wrapper.decorator";
import { ResponseDto } from "src/shared/dto/response.dto";
import { LoginUserReqDto } from "../dto/login-user-req.dto";
import { LoginUserResDto } from "../dto/login-user-res.dto";
import { VerifyUserReqDto } from "../dto/verify-user-req.dto";
import { VerifyUserResDto } from "../dto/verify-user-res.dto";
import { UserService } from "../service/user.service";

@ApiTags("User")
@Controller({ path: "/users", version: "1" })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponseWrapper(LoginUserResDto)
  @ApiBadRequestResponse({ description: "bad request" })
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() dto: LoginUserReqDto): Promise<ResponseDto<LoginUserResDto>> {
    const response = await this.userService.loginUser(dto);

    return new ResponseDto(HttpStatus.OK, "successful", response);
  }

  @ApiResponseWrapper(VerifyUserResDto)
  @ApiBadRequestResponse({ description: "bad request" })
  @Post("/verify")
  @HttpCode(HttpStatus.OK)
  public async verifyUser(@Body() dto: VerifyUserReqDto): Promise<ResponseDto<VerifyUserResDto>> {
    const response = await this.userService.verifyUser(dto);

    return new ResponseDto(HttpStatus.OK, "successful", response);
  }
}

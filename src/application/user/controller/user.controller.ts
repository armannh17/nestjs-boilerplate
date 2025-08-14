import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseWrapper } from "src/platform/shared/decorator/api-response-wrapper.decorator";
import { ResponseDto } from "src/platform/shared/dto/response.dto";
import { LoginUserReqDto } from "../dto/login-user-req.dto";
import { LoginUserResDto } from "../dto/login-user-res.dto";
import { VerifyUserReqDto } from "../dto/verify-user-req.dto";
import { VerifyUserResDto } from "../dto/verify-user-res.dto";
import { UserSerializer } from "../serializer/user.serializer";
import { UserService } from "../service/user.service";

@ApiTags("User")
@Controller({ path: "/users", version: "1" })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userSerializer: UserSerializer,
  ) {}

  @ApiResponseWrapper(LoginUserResDto)
  @ApiBadRequestResponse({ description: "bad request" })
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() dto: LoginUserReqDto): Promise<ResponseDto<LoginUserResDto>> {
    const data = this.userSerializer.serializeLoginUserModel(dto);

    const result = await this.userService.loginUser(data);

    const response = this.userSerializer.serializeLoginUserDto(result);

    return ResponseDto.success(HttpStatus.OK, response);
  }

  @ApiResponseWrapper(VerifyUserResDto)
  @ApiBadRequestResponse({ description: "bad request" })
  @Post("/verify")
  @HttpCode(HttpStatus.OK)
  public async verifyUser(@Body() dto: VerifyUserReqDto): Promise<ResponseDto<VerifyUserResDto>> {
    const data = this.userSerializer.serializeVerifyUserModel(dto);

    const result = await this.userService.verifyUser(data);

    const response = this.userSerializer.serializeVerifyUserDto(result);

    return ResponseDto.success(HttpStatus.OK, response);
  }
}

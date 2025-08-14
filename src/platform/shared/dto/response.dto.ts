import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<T = null> {
  @ApiProperty({ default: 200 })
  public readonly status: HttpStatus;

  @ApiProperty({ default: "successful" })
  public readonly message: string;

  @ApiProperty()
  public readonly data: T;

  constructor(status: HttpStatus, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public static success<T>(status: HttpStatus, data: T): ResponseDto<T> {
    return new ResponseDto<T>(status, "successful", data);
  }

  public static error(status: HttpStatus, message: string): ResponseDto {
    return new ResponseDto(status, message, null);
  }
}

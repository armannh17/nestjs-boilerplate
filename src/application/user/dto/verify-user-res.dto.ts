import { ApiProperty } from "@nestjs/swagger";

export class VerifyUserResDto {
  @ApiProperty({
    default:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MzAwMDAwMDB9.sflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  })
  public readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}

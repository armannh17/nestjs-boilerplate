import { ApiProperty } from "@nestjs/swagger";

export class LoginUserResDto {
  @ApiProperty()
  public readonly challengeCode: string;

  constructor(challengeCode: string) {
    this.challengeCode = challengeCode;
  }
}

import { HttpException, HttpStatus } from "@nestjs/common";

export class ReferralNotFoundException extends HttpException {
  constructor() {
    super("referral does not exist", HttpStatus.BAD_REQUEST);
  }
}

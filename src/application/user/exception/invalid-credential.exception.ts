import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentialException extends HttpException {
  constructor() {
    super("invalid credentials provided", HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidCredentialException extends Error {
  constructor() {
    super("invalid credentials provided");
  }
}

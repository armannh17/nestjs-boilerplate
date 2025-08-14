export class VerifyUserModel {
  constructor(
    public readonly walletAddress: string,
    public readonly signature: string,
  ) {}
}

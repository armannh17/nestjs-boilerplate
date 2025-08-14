export class LoginUserModel {
  constructor(
    public readonly walletAddress: string,
    public readonly referralCode?: string,
  ) {}
}

import { BaseDomain } from "src/platform/shared/domain/base.domain";

export class UserDomain extends BaseDomain {
  public walletAddress!: string;
  public challengeCode!: string;
  public referralCode!: string;
  public referrer?: UserDomain;
  public referrals!: UserDomain[];
}

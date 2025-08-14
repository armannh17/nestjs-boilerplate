export class ReferralNotFoundException extends Error {
  constructor() {
    super("referral does not exist");
  }
}

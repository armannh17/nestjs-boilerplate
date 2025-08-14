import { Collection } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { UserDomain } from "../domain/user.domain";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class UserMapper {
  public mapUserDomain(entity: UserEntity): UserDomain {
    const user = new UserDomain();

    user.id = entity.id;
    user.walletAddress = entity.walletAddress;
    user.challengeCode = entity.challengeCode;
    user.referralCode = entity.referralCode;
    user.referrer = entity.referrer && this.mapUserDomain(entity.referrer);
    user.referrals = entity.referrals.map((referral) => this.mapUserDomain(referral));
    user.createdAt = entity.createdAt;
    user.updatedAt = entity.updatedAt;

    return user;
  }

  public mapUserEntity(domain: UserDomain): UserEntity {
    const user = new UserEntity();

    user.id = domain.id;
    user.walletAddress = domain.walletAddress;
    user.challengeCode = domain.challengeCode;
    user.referralCode = domain.referralCode;
    user.referrer = domain.referrer && this.mapUserEntity(domain.referrer);
    user.referrals = new Collection(
      domain.referrals.map((referral) => this.mapUserEntity(referral)),
    );
    user.createdAt = domain.createdAt;
    user.updatedAt = domain.updatedAt;

    return user;
  }
}

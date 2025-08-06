import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class UserRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public saveUser(user: UserEntity): void {
    this.entityManager.persist(user);
  }

  public async findUserByWalletAddress(walletAddress: string): Promise<UserEntity | null> {
    return await this.entityManager.findOne(UserEntity, { walletAddress });
  }

  public async findUserByReferralCode(referralCode: string): Promise<UserEntity | null> {
    return await this.entityManager.findOne(UserEntity, { referralCode });
  }
}

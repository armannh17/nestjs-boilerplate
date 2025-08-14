import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { UserDomain } from "../domain/user.domain";
import { UserEntity } from "../entity/user.entity";
import { UserMapper } from "../mapper/user.mapper";

@Injectable()
export class UserRepository {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly userMapper: UserMapper,
  ) {}

  public saveUser(user: UserDomain): void {
    const entity = this.userMapper.mapUserEntity(user);

    this.entityManager.persist(entity);
  }

  public async findUserByWalletAddress(walletAddress: string): Promise<UserDomain | null> {
    const user = await this.entityManager.findOne(UserEntity, { walletAddress });

    if (!user) {
      return null;
    }

    return this.userMapper.mapUserDomain(user);
  }

  public async findUserByReferralCode(referralCode: string): Promise<UserDomain | null> {
    const user = await this.entityManager.findOne(UserEntity, { referralCode });

    if (!user) {
      return null;
    }

    return this.userMapper.mapUserDomain(user);
  }
}

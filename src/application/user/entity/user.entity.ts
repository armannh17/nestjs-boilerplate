import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../../platform/shared/entity/base.entity";

@Entity({ tableName: "user" })
export class UserEntity extends BaseEntity {
  @Property({ type: "varchar", name: "wallet_address" })
  public walletAddress!: string;

  @Property({ type: "varchar", name: "challenge_code" })
  public challengeCode!: string;

  @Property({ type: "varchar", name: "referral_code" })
  public referralCode!: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  public referrer?: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.referrer)
  public referrals = new Collection<UserEntity>(this);
}

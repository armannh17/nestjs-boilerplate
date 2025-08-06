import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";
import { verifyMessage } from "ethers";
import { AppConfig } from "src/config/config/app.config";
import { TokenPayload } from "../type/token-payload.type";

@Injectable()
export class CryptoHelper {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public generateChallengeCode(): string {
    return randomBytes(16).toString("hex");
  }

  public generateReferralCode(): string {
    return randomBytes(8).toString("hex");
  }

  public verifySignature(challengeCode: string, signature: string): string {
    return verifyMessage(challengeCode, signature);
  }

  public async generateToken(userId: string): Promise<string> {
    //get the token config
    const config = this.configService.getOrThrow<AppConfig["token"]>("token");

    //make the payload
    const payload: TokenPayload = { sub: userId };

    //return the token
    return await this.jwtService.signAsync(payload, {
      expiresIn: config.expiry,
      secret: config.secret,
    });
  }

  public async verifyToken(token: string): Promise<TokenPayload> {
    //get the token config
    const config = this.configService.getOrThrow<AppConfig["token"]>("token");

    //verify the token
    return await this.jwtService.verifyAsync(token, {
      secret: config.secret,
    });
  }
}

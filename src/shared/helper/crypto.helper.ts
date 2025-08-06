import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";

@Injectable()
export class CryptoHelper {
  public generateChallengeCode(): string {
    return randomBytes(16).toString("hex");
  }
}

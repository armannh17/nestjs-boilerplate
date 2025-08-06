import { Injectable } from "@nestjs/common";
import { randomBytes } from "ethers";

@Injectable()
export class CryptoHelper {
	public generateChallengeCode(): string {
		return randomBytes(16).toString();
	}
}

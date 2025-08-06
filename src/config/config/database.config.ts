import { IsUrl } from "class-validator";

export class DatabaseConfig {
	@IsUrl({ protocols: ["postgresql", "mysql"] })
	public readonly url = String(process.env.DATABASE_URL);
}

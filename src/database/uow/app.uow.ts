import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppUow {
	constructor(private readonly entityManager: EntityManager) {}

	public async flush(): Promise<void> {
		await this.entityManager.flush();
	}
}

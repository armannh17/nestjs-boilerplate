import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CoinModule } from "./coin/coin.module";
import { DatabaseModule } from "./database/database.module";
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [CqrsModule.forRoot({}), DatabaseModule, SharedModule, UserModule, CoinModule],
})
export class AppModule {}

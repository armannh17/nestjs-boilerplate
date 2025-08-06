import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";
import config from "./config/database.config";

@Global()
@Module({
	imports: [MikroOrmModule.forRoot(config)],
})
export class DatabaseModule {}

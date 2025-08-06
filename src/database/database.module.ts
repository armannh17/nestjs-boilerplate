import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
	imports: [MikroOrmModule.forRoot()],
})
export class DatabaseModule {}

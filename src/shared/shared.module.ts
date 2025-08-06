import { Global, Module } from "@nestjs/common";
import { AppUow } from "src/database/uow/app.uow";

@Global()
@Module({
	providers: [AppUow],
	exports: [AppUow],
})
export class SharedModule {}

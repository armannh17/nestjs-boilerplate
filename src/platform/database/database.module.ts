import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";
import { AppUow } from "./uow/app.uow";

@Global()
@Module({
  imports: [MikroOrmModule.forRoot()],
  providers: [AppUow],
  exports: [AppUow],
})
export class DatabaseModule {}

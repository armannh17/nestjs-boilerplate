import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { validate } from "./config/validator/config.validator";
import { DatabaseModule } from "./database/database.module";
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [validate],
    }),
    CqrsModule.forRoot({}),
    DatabaseModule,
    SharedModule,
    UserModule,
  ],
})
export class AppModule {}

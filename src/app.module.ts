import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { validate } from "./config/validator/config.validator";
import { CoreModule } from "./core/core.module";
import { DatabaseModule } from "./database/database.module";
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./user/user.module";
import { ContentTypeMiddleware } from "./core/middleware/content-type.middleware";

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
    CoreModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContentTypeMiddleware).forRoutes("*");
  }
}

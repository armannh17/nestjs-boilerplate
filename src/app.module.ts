import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { UserModule } from "./application/user/user.module";
import { validate } from "./platform/config/validator/config.validator";
import { CoreModule } from "./platform/core/core.module";
import { ContentTypeMiddleware } from "./platform/core/middleware/content-type.middleware";
import { DatabaseModule } from "./platform/database/database.module";
import { SharedModule } from "./platform/shared/shared.module";

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

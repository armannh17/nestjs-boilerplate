import { Global, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { AppExceptionFilter } from "./filter/app-exception.filter.js";
import { TimeoutInterceptor } from "./interceptor/timeout.interceptor.js";

@Global()
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
  exports: [],
})
export class CoreModule {}

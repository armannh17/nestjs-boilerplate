import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { timeout } from "rxjs";
import { AppConfig } from "src/config/config/app.config";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  public intercept(_: ExecutionContext, next: CallHandler) {
    //get the timeout from the config
    const config = this.configService.getOrThrow<AppConfig["server"]>("server");

    //set the timeout handler
    return next.handle().pipe(timeout(config.timeout));
  }
}

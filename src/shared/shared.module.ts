import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppUow } from "src/database/uow/app.uow";
import { CryptoHelper } from "./helper/crypto.helper";

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AppUow, CryptoHelper],
  exports: [AppUow, CryptoHelper],
})
export class SharedModule {}

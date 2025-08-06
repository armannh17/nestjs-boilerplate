import { Global, Module } from "@nestjs/common";
import { AppUow } from "src/database/uow/app.uow";
import { CryptoHelper } from "./helper/crypto.helper";

@Global()
@Module({
  providers: [AppUow, CryptoHelper],
  exports: [AppUow, CryptoHelper],
})
export class SharedModule {}

import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CryptoHelper } from "./helper/crypto.helper";

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [CryptoHelper],
  exports: [CryptoHelper],
})
export class SharedModule {}

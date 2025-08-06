import { IsPort } from "class-validator";

export class ServerConfig {
  @IsPort()
  public readonly port = String(process.env.PORT);
}

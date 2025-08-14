import { ValidateNested } from "class-validator";
import { DatabaseConfig } from "./database.config";
import { ServerConfig } from "./server.config";
import { TokenConfig } from "./token.config";

export class AppConfig {
  @ValidateNested()
  public readonly server = new ServerConfig();

  @ValidateNested()
  public readonly database = new DatabaseConfig();

  @ValidateNested()
  public readonly token = new TokenConfig();
}

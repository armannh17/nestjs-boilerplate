import { ValidateNested } from "class-validator";
import { DatabaseConfig } from "./database.config";
import { ServerConfig } from "./server.config";

export class AppConfig {
  @ValidateNested()
  public readonly server = new ServerConfig();

  @ValidateNested()
  public readonly database = new DatabaseConfig();
}

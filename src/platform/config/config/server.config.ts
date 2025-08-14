import { IsInt, IsPort, IsPositive } from "class-validator";

export class ServerConfig {
  @IsPort()
  public readonly port = String(process.env.PORT);

  @IsInt()
  @IsPositive()
  public readonly timeout = Number(process.env.TIMEOUT);
}

import { validateSync } from "class-validator";
import "dotenv/config";
import { AppConfig } from "../config/app.config.js";

export function validate(): AppConfig {
  const config = new AppConfig();

  const errors = validateSync(config, {
    whitelist: true,
  });

  if (errors.length > 0) {
    const issues = errors.map((err) => err.toString()).join(", ");
    throw new Error(`following config parameters are invalid: ${issues}`);
  }

  return config;
}

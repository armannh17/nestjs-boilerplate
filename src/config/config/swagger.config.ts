import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("DEX - API")
  .setDescription("this document is a list of api's available for dex")
  .setVersion("1.0")
  .addGlobalResponse({ status: 500, description: "internal server error" })
  .build();

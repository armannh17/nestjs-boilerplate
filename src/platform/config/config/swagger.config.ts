import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("DEMO - API")
  .setDescription("this document is a list of api's available for demo")
  .setVersion("1.0")
  .addGlobalResponse({ status: 500, description: "internal server error" })
  .build();

import { defineConfig } from "@mikro-orm/postgresql";
import "dotenv/config";

export default defineConfig({
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./src/**/*.entity.ts"],
  clientUrl: process.env.DATABASE_URL,
  migrations: {
    allOrNothing: true,
    path: "./migration",
    tableName: "migration",
  },
});

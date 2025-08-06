import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AppConfig } from "./config/config/app.config";
import { swaggerConfig } from "./config/config/swagger.config";

async function bootstrap() {
	//make the application
	const app = await NestFactory.create<INestApplication<NestExpressApplication>>(AppModule);

	//enable validation
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			always: true,
		}),
	);

	//setup swagger
	const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup("swagger", app, documentFactory);

	//enable hooks
	app.enableVersioning();
	app.enableShutdownHooks();

	//get the server config
	const configService = app.get(ConfigService);
	const serverConfig = configService.getOrThrow<AppConfig["server"]>("server");

	//start the application
	await app.listen(serverConfig.port);
}

bootstrap().catch((e) => console.error(e));

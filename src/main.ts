import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './config/logger.config';
import { setupSwagger} from "./config/swagger.config";
import {ValidationPipe} from "@nestjs/common";
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use the custom logger
  app.useLogger(app.get(LoggerService));

  const configService = app.get(ConfigService);
  // Get environment variables
  const envName = configService.get<string>('ENV_NAME');
  const mongodbUri = configService.get<string>('MONGODB_URI');
  const PORT = configService.get<number>('PORT');

  // Swagger documentation
  setupSwagger(app);

    // Enable CORS
  app.enableCors({
    // origin: set true to take the origin from all the links
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });

  // Validate the input data
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
  );

  // Log a message with the custom logger based on the environment
  if(envName === 'prod'){
    app.get(LoggerService).log('Production Server is running');
  } else{
    app.get(LoggerService).log(`MongoDB URI:${mongodbUri}`);
    app.get(LoggerService).log(`Development Server is running on http://localhost:${PORT}`);
  }
  // Log a message with the custom logger
  app.get(LoggerService).log(`Swagger Documentation is listening on port http://localhost:${PORT}/api`);
  await app.listen(PORT);
}


bootstrap();
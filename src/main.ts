import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as LoggerPino } from 'nestjs-pino';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
 
  const logger = new Logger('main');
  app.useLogger(app.get(LoggerPino));

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen( process.env.PORT );
  logger.log( `App running on port ${process.env.PORT}` );
}
main();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix — all routes become /api/v1/...
  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api/v1');

  // Auto-validate all incoming DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // CORS — allow both web & mobile origins in dev
  app.enableCors({ origin: '*' });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`🚀 Vroomy API running on http://localhost:${port}`);
}
bootstrap();

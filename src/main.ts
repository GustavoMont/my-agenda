import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildDefaultAppConfig } from './utils/app/app-config';

async function bootstrap() {
  const app = buildDefaultAppConfig(await NestFactory.create(AppModule));
  await app.listen(3000);
}
bootstrap();

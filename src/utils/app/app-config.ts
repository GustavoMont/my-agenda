import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { HttpExceptionFilter } from '@src/filters/http-exception.filter';
import { DecamelizeInterceptor } from '@src/interceptors/decamelize.interceptor';
import { CamelizePipe } from '@src/pipes/camelize.pipe';

export const buildDefaultAppConfig = (app: INestApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new DecamelizeInterceptor());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/',
    defaultVersion: 'v1',
  });
  app.useGlobalPipes(
    new CamelizePipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  return app;
};

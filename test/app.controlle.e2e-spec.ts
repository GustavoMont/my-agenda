import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';

describe('/', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });
  describe('/GET', () => {
    it('should return default message', () => {
      return request(app.getHttpServer()).get('/').expect(200).expect({
        message: 'Hello World!',
      });
    });
  });
});

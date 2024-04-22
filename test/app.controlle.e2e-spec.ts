import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { buildDefaultAppConfig } from '@src/utils/app/app-config';

describe('/', () => {
  let app: INestApplication;
  const BASE_URL = '/api/v1';
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app = buildDefaultAppConfig(app);
    await app.init();
  });
  describe('/GET', () => {
    it('should return NotFound Exception', () => {
      return request(app.getHttpServer()).get(BASE_URL).expect(404).expect({
        message: 'Cannot GET /api/v1',
        error: 'Not Found',
        status_code: 404,
      });
    });
    it('should return default message', () => {
      return request(app.getHttpServer())
        .get(`${BASE_URL}/hello-world`)
        .expect(200)
        .expect({
          hello_world: 'Hello World!',
        });
    });
  });
  describe('/POST', () => {
    it('should return a empty object when receive camelCase object', () => {
      return request(app.getHttpServer())
        .post(`${BASE_URL}/body`)
        .send({
          anyMessage: 'essa é a mensagem',
        })
        .expect(200)
        .expect({});
    });
    it('should return the same object', () => {
      const testObject = {
        any_message: 'essa é a mensagem',
      };
      return request(app.getHttpServer())
        .post(`${BASE_URL}/body`)
        .send(testObject)
        .expect(200)
        .expect(testObject);
    });
  });
});

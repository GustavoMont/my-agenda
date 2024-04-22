import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { ITasksRepository } from '@src/tasks/interfaces/tasks-repository.interface';
import { buildDefaultAppConfig } from '@src/utils/app/app-config';
import { TasksRepositoryInMemory } from '@test/utils/tasks/tasks.repository.in-memory';
import * as request from 'supertest';

describe('/tasks', () => {
  let app: INestApplication;
  const BASE_URL = '/api/v1/tasks';
  const DEFAULT_NOW = new Date().toISOString();
  beforeAll(async () => {
    const tasksRepositoryInMemory = new TasksRepositoryInMemory(
      [],
      DEFAULT_NOW,
    );
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ITasksRepository)
      .useValue(tasksRepositoryInMemory)
      .compile();

    app = moduleRef.createNestApplication();
    app = buildDefaultAppConfig(app);

    await app.init();
  });
  describe('/POST', () => {
    const datetime = new Date().toISOString();
    it('should throw bad request', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send({})
        .expect(400)
        .expect({
          error: 'Bad Request',
          status_code: 400,
          message: [
            'title must be longer than or equal to 3 characters',
            'Datetime is not optional',
          ],
        });
    });
    it('should create a new task', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send({
          title: 'Uma nova task',
          datetime,
        })
        .expect(201)
        .expect({
          id: 1,
          title: 'Uma nova task',
          description: null,
          datetime,
          has_done: false,
          created_at: DEFAULT_NOW,
          updated_at: DEFAULT_NOW,
          finished_at: null,
        });
    });
    it('should create a new task with default values', () => {
      const datetime = '2001-02-01';
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send({
          title: 'Uma nova task',
          description: 'Uma descrição muito top',
          datetime,
          has_done: true,
          created_at: DEFAULT_NOW,
          updated_at: DEFAULT_NOW,
          finished_at: new Date(datetime).toISOString(),
        })
        .expect(201)
        .expect({
          id: 2,
          title: 'Uma nova task',
          description: 'Uma descrição muito top',
          datetime,
          has_done: false,
          created_at: DEFAULT_NOW,
          updated_at: DEFAULT_NOW,
          finished_at: null,
        });
    });
  });
});

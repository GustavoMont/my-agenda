import { Provider } from '@nestjs/common';
import { ITasksRepository } from './interfaces/tasks-repository.interface';
import { TasksRepository } from './tasks.repository.service';
import { ITasksService } from './interfaces/tasks-service.interface';
import { TasksService } from './tasks.service';

const repository: Provider = {
  provide: ITasksRepository,
  useClass: TasksRepository,
};

const service: Provider = {
  provide: ITasksService,
  useClass: TasksService,
};

export const tasksProviders: Provider[] = [repository, service];

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: tasksProviders,
})
export class TasksModule {}

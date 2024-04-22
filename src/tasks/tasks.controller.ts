import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ITasksService } from './interfaces/tasks-service.interface';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(@Inject(ITasksService) private readonly service: ITasksService) {}
  @Post()
  async createTask(@Body() payload: CreateTaskDto) {
    return await this.service.createTask(payload);
  }
}

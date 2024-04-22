import { Inject, Injectable } from '@nestjs/common';
import { ITasksService } from './interfaces/tasks-service.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { ITasksRepository } from './interfaces/tasks-repository.interface';
import { plainToInstance } from 'class-transformer';
import { Task } from '@src/models/Task';

@Injectable()
export class TasksService implements ITasksService {
  constructor(
    @Inject(ITasksRepository) private readonly repository: ITasksRepository,
  ) {}
  async createTask(payload: CreateTaskDto): Promise<TaskResponseDto> {
    const newTask = plainToInstance(Task, payload);
    const createdTask = await this.repository.createTask(newTask);

    return plainToInstance(TaskResponseDto, createdTask);
  }
}

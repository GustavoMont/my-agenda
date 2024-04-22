import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskResponseDto } from '../dto/task-response.dto';

export interface ITasksService {
  createTask(payload: CreateTaskDto): Promise<TaskResponseDto>;
}

export const ITasksService = Symbol('ITasksService');

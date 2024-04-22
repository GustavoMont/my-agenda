import { Task } from '@src/models/Task';

export interface ITasksRepository {
  createTask(task: Task): Promise<Task>;
}

export const ITasksRepository = Symbol('ITasksRepository');

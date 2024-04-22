import { Inject, Injectable } from '@nestjs/common';
import { ITasksRepository } from './interfaces/tasks-repository.interface';
import { Task } from '@src/models/Task';
import database from '@src/infra/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { tasks } from '@src/infra/database/schema';

@Injectable()
export class TasksRepository implements ITasksRepository {
  constructor(
    @Inject(database.DB_CONTEXT_TOKEN) private readonly db: NodePgDatabase,
  ) {}
  async createTask(task: Task): Promise<Task> {
    const [newTask] = await this.db.insert(tasks).values(task).returning();
    return newTask;
  }
}

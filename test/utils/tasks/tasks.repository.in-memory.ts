import { Task } from '@src/models/Task';
import { ITasksRepository } from '@src/tasks/interfaces/tasks-repository.interface';

export class TasksRepositoryInMemory implements ITasksRepository {
  private lastSavedId: number;
  constructor(
    private tasks: Task[],
    private readonly defaultNow: string,
  ) {
    const lastId = tasks.reduce(
      (lastId, { id }) => (id > lastId ? id : lastId),
      0,
    );
    this.lastSavedId = lastId;
  }

  private handleSaveTask(task: Task) {
    return {
      createdAt: this.defaultNow,
      updatedAt: this.defaultNow,
      hasDone: false,
      description: task.description ?? null,
      id: this.lastSavedId + 1,
      finishedAt: null,
      ...task,
    };
  }

  private setLastId(id: number) {
    this.lastSavedId = id;
  }

  private addNewTask(task: Task) {
    this.tasks.push(task);
  }

  async createTask(task: Task): Promise<Task> {
    const newTask = this.handleSaveTask(task);
    this.addNewTask(newTask);
    this.setLastId(newTask.id);
    return newTask;
  }
}

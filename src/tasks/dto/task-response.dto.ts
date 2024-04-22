import { Task } from '@src/models/Task';

export class TaskResponseDto implements Task {
  id: number;
  title: string;
  description: string;
  datetime: string;
  createdAt: string;
  updatedAt: string;
  finishedAt: string | null;
  hasDone: boolean;
}

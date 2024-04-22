export class Task {
  id: number;
  title: string;
  description: string | null;
  datetime: string;
  createdAt: string;
  updatedAt: string;
  finishedAt: string | null;
  hasDone: boolean;
}

import { Task } from '@src/models/Task';
import { Exclude } from 'class-transformer';
import { IsDateString, IsOptional, MinLength } from 'class-validator';

export class CreateTaskDto implements Task {
  id: number;
  @MinLength(3)
  title: string;
  @IsOptional()
  description: string;
  @IsDateString(undefined, { message: 'Datetime is not optional' })
  datetime: string;
  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;
  @Exclude()
  finishedAt: string;
  @Exclude()
  hasDone: boolean;
}

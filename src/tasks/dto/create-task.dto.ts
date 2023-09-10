import { IsDate, IsNumber, IsString } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto extends Task {
  @IsString()
  name: string;

  @IsNumber()
  projectId: number;

  @IsDate()
  finishDate: Date;

  @IsString()
  description: string;
}

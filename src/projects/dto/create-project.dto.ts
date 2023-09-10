import { IsString } from 'class-validator';
import { Project } from '../entities/project.entity';

export class CreateProjectDto extends Project {
  @IsString()
  name: string;
}

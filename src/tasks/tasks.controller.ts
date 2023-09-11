import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthUserService } from 'src/auth/auth-user.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private authUserService: AuthUserService,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const authUser = this.authUserService.getAuthUser();
    return this.tasksService.update(+id, updateTaskDto, authUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const authUser = this.authUserService.getAuthUser();
    return this.tasksService.remove(+id, authUser);
  }
}

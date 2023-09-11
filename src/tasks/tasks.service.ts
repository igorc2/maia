import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import e from 'express';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = await this.prisma.task.create({ data: createTaskDto });
    return createdTask;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const isTaskOwner = await this.isTaskOwner(id, userId);
    if (isTaskOwner) {
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
      });
      return updatedTask;
    }
    return `This action updates a #${id} task`;
  }

  async remove(id: number, userId: number) {
    const taskUserId = (
      await this.prisma.task.findUnique({ where: { id } }).projects().user()
    ).id;

    if (taskUserId !== userId) {
      throw new HttpException(
        'User is not the owner of the task',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const deletedTask = await this.prisma.task.delete({ where: { id } });
    return `This action removed the #${deletedTask.id} task`;
  }

  async isTaskOwner(taskId: number, userId: number) {
    const taskUserId = (
      await this.prisma.task
        .findUnique({ where: { id: taskId } })
        .projects()
        .user()
    ).id;

    if (taskUserId !== userId) {
      throw new HttpException(
        'User is not the owner of the task',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      return true;
    }
  }
}

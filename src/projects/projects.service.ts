import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    const createdProject = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        user: { connect: { id: userId } },
      },
    });
    return createdProject;
  }

  findAll(userId: number) {
    const projects = this.prisma.project.findMany({
      where: {
        userId: userId,
      },
      include: {
        tasks: true,
      },
    });

    return projects;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, userId: number) {
    const isProjectOwner = await this.isProjectOwner(id, userId);
    if (isProjectOwner) {
      const updatedProject = await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
      });
      return updatedProject;
    }
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    const deletedProject = await this.prisma.project.delete({ where: { id } });
    return `This action removed the #${deletedProject.id} project`;
  }

  async isProjectOwner(projectId: number, userId: number) {
    const projectUserId = (
      await this.prisma.project.findUnique({ where: { id: projectId } }).user()
    ).id;

    if (projectUserId !== userId) {
      throw new HttpException(
        'User is not the owner of the task',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      return true;
    }
  }
}

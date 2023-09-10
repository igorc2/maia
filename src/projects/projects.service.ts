import { Injectable } from '@nestjs/common';
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

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: number) {
    console.log('id: ', id);
    const deletedProject = await this.prisma.project.delete({ where: { id } });
    return `This action removed the #${deletedProject.id} project`;
  }
}

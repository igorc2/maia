import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from '@prisma/client';
import { AuthUserService } from 'src/auth/auth-user.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private authUserService: AuthUserService,
  ) {}

  @Post()
  create(@Body() project: Project) {
    const authUser = this.authUserService.getAuthUser();
    return this.projectsService.create(project, authUser);
  }

  @Get()
  findAll() {
    const authUser = this.authUserService.getAuthUser();
    return this.projectsService.findAll(authUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}

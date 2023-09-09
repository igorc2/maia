import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, ProjectsModule, TasksModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

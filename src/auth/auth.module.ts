import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUserService } from './auth-user.service';

@Module({
  imports: [UserModule, PrismaModule],
  exports: [AuthService, AuthUserService],
  controllers: [AuthController],
  providers: [AuthService, AuthUserService],
})
export class AuthModule {}

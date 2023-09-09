import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './user.interface';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly users: User[] = [];
  createUser(user: User): void {
    this.users.push(user);
  }
  findByUsername(username: string): User {
    return this.users.find((user) => user.username === username);
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}

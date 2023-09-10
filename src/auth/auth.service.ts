import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.create(createUserDto);

    const accessToken = await this.createAccessToken(user.id);

    return accessToken.token;
  }

  generateRandomHash() {
    const randomString = Math.random().toString(36).substring(2);
    const hash = bcrypt.hashSync(randomString, 8);
    return hash;
  }

  async createAccessToken(userId?: number) {
    const randomToken = this.generateRandomHash();

    return await this.prisma.accessToken.create({
      data: {
        token: randomToken,
        user: { connect: { id: userId } },
        ttl: 3600,
        updatedAt: new Date(),
      },
    });
  }

  async verifyToken(token: string) {
    const accessToken = await this.prisma.accessToken.findUnique({
      where: { token },
    });

    if (accessToken) {
      const now = new Date();
      const updatedAt = accessToken.updatedAt;
      const diff = now.getTime() - updatedAt.getTime();
      const diffSeconds = Math.ceil(diff / 1000);

      if (diffSeconds > accessToken.ttl) {
        return 0;
      }
      await this.refreshAccessToken(token);

      return accessToken.userId;
    }

    return 0;
  }

  async updateAccessToken(userId: number) {
    const accessToken = await this.prisma.accessToken.findUnique({
      where: { userId },
    });

    if (accessToken) {
      const newToken = this.generateRandomHash();

      return await this.prisma.accessToken.update({
        where: { userId },
        data: {
          token: newToken,
          updatedAt: new Date(),
        },
      });
    }
  }

  async refreshAccessToken(token: string) {
    const accessToken = await this.prisma.accessToken.findUnique({
      where: { token },
    });

    if (accessToken) {
      return await this.prisma.accessToken.update({
        where: { token },
        data: {
          updatedAt: new Date(),
        },
      });
    }
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const accessToken = await this.updateAccessToken(user.id);
        return accessToken.token;
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('User registration failed', HttpStatus.NOT_FOUND);
    }
  }
}

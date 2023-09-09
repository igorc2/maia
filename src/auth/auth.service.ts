import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // async login(user: User): Promise<UserToken> {
  //   const payload: UserPayload = {
  //     sub: user.id,
  //     email: user.email,
  //     name: user.name,
  //   };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken?: string }> {
    console.log('>>>> email: ', email);
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          accessToken: 'to ke n',
        };
      }
    }

    // throw new UnauthorizedError(
    //   'Email address or password provided is incorrect.',
    // );
  }
}

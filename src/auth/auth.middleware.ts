import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserService } from './auth-user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private authUserService: AuthUserService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    console.log('req.headers.authorization :>> ', req.headers.authorization);
    const auth = req.headers.authorization;
    if (auth && auth.split(' ')[0] === 'Bearer') {
      const authToken = auth.split(' ')[1];
      const userId = await this.authService.verifyToken(authToken);
      this.authUserService.setAuthUser(userId);
      next();
    } else {
      res.status(401).send('Not authorized');
    }
  }
}

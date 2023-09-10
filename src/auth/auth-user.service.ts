import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUserService {
  private userId: number;

  setAuthUser(userId: number) {
    this.userId = userId;
  }

  getAuthUser() {
    return this.userId;
  }
}

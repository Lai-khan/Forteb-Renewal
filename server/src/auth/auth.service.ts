import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.getUserById(id);
    if (user && user.password === (await bcrypt.hash(password, user.salt))) {
      const { password, salt, ...result } = user;
      return result;
    }
    return null;
  }
}

import { CreateUserDTO } from './../model/dto/create-user.dto';
import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.getUserById(id);
    if (user && (await user.password) === (await bcrypt.hash(password, user.salt))) {
      const { password, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(userDTO: CreateUserDTO) {
    if (await this.checkDuplicateUser(userDTO.id)) {
      throw new ForbiddenException(`${userDTO.id} already exists.`);
    }
    if (!this.checkUserDataFormat(userDTO)) {
      throw new ForbiddenException('Invalid user format.');
    }

    const user = await this.userService.createNewUser(userDTO);
    return await this.userService.saveUser(user);
  }

  private async checkDuplicateUser(id: string): Promise<boolean> {
    const user = await this.userService.getUserById(id);
    if (user) return true;
    return false;
  }

  private checkUserDataFormat(user: CreateUserDTO): boolean {
    // id/pw 규칙에 따라 검증 절차 필요
    return true;
  }
}

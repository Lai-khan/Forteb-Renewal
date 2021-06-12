import { AuthService } from './auth.service';
import { Controller, Get } from '@nestjs/common';
import { User } from 'src/model/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.authService.getAllUsers();
  }
}

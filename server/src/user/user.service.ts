import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../model/entity/user.entity';
import { CreateUserDTO } from './../model/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async updatePassword(user: User, newPassword: string): Promise<void> {
    user.password = newPassword;
    this.saveUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ id: id });
  }

  async createNewUser(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userDTO.password, salt);

    const newUser = new User();
    newUser.id = userDTO.id;
    newUser.email = userDTO.email;
    newUser.password = hash;
    newUser.salt = salt;
    newUser.created_at = new Date();

    return newUser;
  }
}

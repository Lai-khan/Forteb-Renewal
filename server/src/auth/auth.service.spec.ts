import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './../model/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

class MockRepository {
  async find() {
    const user: User = new User();
    user.id = 1;
    return user;
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all users', () => {
      const result = service.getAllUsers();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });
  });
});

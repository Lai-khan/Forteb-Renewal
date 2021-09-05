import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './../model/entity/user.entity';
import { UserService } from './user.service';

class MockRepository {
  async find() {
    const user: User = new User();
    user.id = 'naver';
    return user;
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all users', () => {
      const result = service.getUserById('naver');
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
      result.then(user => {
        expect(user.id).toEqual('naver');
      });
    });
  });
});

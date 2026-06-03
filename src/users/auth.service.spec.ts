import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  const users: User[] = [];
  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as unknown as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    //console.log(salt, hash);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('abcd@abcd.com', 'mypassword');
    await expect(service.signup('abcd@abcd.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });
  it('throws an error if signin is called with an unused email', async () => {
    await expect(service.signin('abcd@asdf.com', 'asdf')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws an error if an invalid password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     {
    //       id: 1,
    //       email: 'abcd@abcd.com',
    //       password: '12121.486545',
    //     } as unknown as User,
    //   ]);

    await expect(service.signin('abcd@abcd.com', 'lksjk')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     {
    //       id: 1,
    //       email: 'abcd@abcd.com',
    //       password:
    //         '29f1e69fdcbc06a4.15a09b76d4013f48dc9da5fa25f7b86cbdbfb047e445bf563e56900f0c39639f',
    //     } as unknown as User,
    //   ]);
    // await service.signup('abcd@abcd.com', 'mypassword');
    const user = await service.signin('abcd@abcd.com', 'mypassword');
    expect(user).toBeDefined();
  });
});

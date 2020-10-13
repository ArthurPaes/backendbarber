import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jooj',
      email: 'jooj@example.com',
    });

    expect(updatedUser.name).toBe('jooj');
    expect(updatedUser.email).toBe('jooj@example.com');
  });

  it('should be not be able to update the profile from a non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing user_id',
        name: 'test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to email to an existing one', async () => {
    await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'john2',
      email: 'john2@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'john',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jooj',
      email: 'jooj@example.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jooj',
        email: 'jooj@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jooj',
        email: 'jooj@example.com',
        password: '123123',
        old_password: 'wrong oldpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

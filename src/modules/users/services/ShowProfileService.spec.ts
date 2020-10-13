import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('john');
    expect(profile.email).toBe('john@example.com');
  });

  it('should be not be able to show the profile from a non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

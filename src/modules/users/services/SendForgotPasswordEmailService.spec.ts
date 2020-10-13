import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeTokensRepository from '../repositories/fakes/FakeTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTokensRepository: FakeTokensRepository;
let fakeMailProvider: FakeMailProvider;
let SendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeTokensRepository = new FakeTokensRepository();

    SendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeTokensRepository,
    );
  });
  it('should be able to create a new user', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'jooj',
      email: 'john@example.com',
      password: '123456',
    });

    await SendForgotPasswordEmail.execute({
      email: 'john@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(
      SendForgotPasswordEmail.execute({
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'jooj',
      email: 'john@example.com',
      password: '123456',
    });

    await SendForgotPasswordEmail.execute({
      email: 'john@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

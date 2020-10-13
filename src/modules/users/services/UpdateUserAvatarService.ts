import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/models/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {} // dependency inversion(tanto faz se os users estaão sendo salvos no SQL, Typeorm,etc. Tanto faz para o service)

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id); // encontrar um user com o id que foi passado como parâmetro

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401);
    }

    // verificando se o user já tinha um avatar
    if (user.avatar) {
      // Deletar avatar anterior
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName; // setando o avatar do user com o novo avatar passado como parâmetro

    await this.usersRepository.save(user); // salvando o objeto desse user, salvando assim o avatar(save funciona tanto para criar um user quanto para atualizar) - Se o user não tiver id, esta linha irá criar o user

    return user; // retornando o user atualizado
  }
}

export default UpdateUserAvatarService;

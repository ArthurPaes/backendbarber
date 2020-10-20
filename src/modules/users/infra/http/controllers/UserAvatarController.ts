// Controller deve ter no máximo cinco métodos: index, show, create, update,delete
// método update do controller deve ser utilizado caso eu queira atualizar todas as informações da entidade
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    // const usersRepository = new UsersRepository();
    // const updateUserAvatar = new UpdateUserAvatarService(usersRepository); //removido após a injeção de dependência

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(classToClass(user));
  } // Promise pq é async
}

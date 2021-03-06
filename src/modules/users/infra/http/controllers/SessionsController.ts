// Controller deve ter no máximo cinco métodos: index, show, create, update,delete

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    // const usersRepository = new UsersRepository();
    // const authenticateUser = new AuthenticateUserService(usersRepository); //removido após a injeção de dependência

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  } // Promise pq é async
}

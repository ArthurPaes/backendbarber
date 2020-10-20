// Controller deve ter no máximo cinco métodos: index, show, create, update,delete
// método update do controller deve ser utilizado caso eu queira atualizar todas as informações da entidade
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    // const usersRepository = new UsersRepository();         //removido após a injeção de dependência
    // const createUser = new CreateUserService(usersRepository); // passando o repositório como parâmetro para o serviço que utilizado o constructor com o formato da interface IUsersRepository

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(classToClass(user));
  } // Promise pq é async
}

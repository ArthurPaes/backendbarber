import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/models/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {} // dependency inversion(tanto faz se os users estaão sendo salvos no SQL, Typeorm,etc. Tanto faz para o service)

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    }); // parametro é o usuário que será removido da listagem

    return users;
  }
}

export default ListProvidersService;

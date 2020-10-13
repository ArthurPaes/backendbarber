import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/models/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider'; // usando inversao de dependẽncia,nunca importamos diretamente o provedor e sim a interface(formato que o hashProvider vai ter) e quem vai injetar o BCrytHashrovider é a injeção de dependência

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {} // dependency inversion(tanto faz se os users estaão sendo salvos no SQL, Typeorm,etc. Tanto faz para o service)

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;

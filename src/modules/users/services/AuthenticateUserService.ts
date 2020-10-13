import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/models/User';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider'; // usando inversao de dependẽncia,nunca importamos diretamente o provedor e sim a interface(formato que o hashProvider vai ter) e quem vai injetar o BCrytHashrovider é a injeção de dependência

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {} // dependency inversion(tanto faz se os users estaão sendo salvos no SQL, Typeorm,etc. Tanto faz para o service)

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // user.password - senha criptografada
    // password - senha não criptografada

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // autenticado

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id, // sempre id do user aqual user pertence o token gerado
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

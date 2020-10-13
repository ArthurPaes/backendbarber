import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/models/UserToken';
import User from '../../infra/typeorm/models/User';

class FakeUserTokensRepository implements IUserTokensRepository {
  // Responsável por criar armazenar ler deletar editar os dados de appointment
  private usertokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.usertokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usertokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;

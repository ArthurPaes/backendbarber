import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService); // vai carregar o service, vai ver no construtor  se precisa de dependência (no caso precisa do AppointmentsRepository e vai lá no nosso container e vai ver se tem alguma dependência cadastrada com isso e retorna uma instância da classse AppointmentsRepository

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
  } // Promise pq é async
}

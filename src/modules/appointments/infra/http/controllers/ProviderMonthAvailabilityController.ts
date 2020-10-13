import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    ); // vai carregar o service, vai ver no construtor  se precisa de dependência (no caso precisa do AppointmentsRepository e vai lá no nosso container e vai ver se tem alguma dependência cadastrada com isso e retorna uma instância da classse AppointmentsRepository

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  } // Promise pq é async
}

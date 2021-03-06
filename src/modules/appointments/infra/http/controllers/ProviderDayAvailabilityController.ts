import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { classToClass } from 'class-transformer';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    ); // vai carregar o service, vai ver no construtor  se precisa de dependência (no caso precisa do AppointmentsRepository e vai lá no nosso container e vai ver se tem alguma dependência cadastrada com isso e retorna uma instância da classse AppointmentsRepository

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(availability));
  } // Promise pq é async
}

import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/models/User';

import AppointmentFormat from '../infra/typeorm/models/appointments';
import IAppointmentsRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  month: number;
  day: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {} // dependency inversion(tanto faz se os users estaão sendo salvos no SQL, Typeorm,etc. Tanto faz para o service)

  public async execute({
    provider_id,
    month,
    day,
    year,
  }: IRequest): Promise<AppointmentFormat[]> {
    const appointments = await this.appointmentsRepository.findAllInDayOfProvider(
      {
        provider_id,
        day: Number(day),
        month: Number(month),
        year: Number(year),
      },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;

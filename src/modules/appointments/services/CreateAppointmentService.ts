import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import AppointmentFormat from '../infra/typeorm/models/appointments';
import IAppointmentsRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable() // Precisa ir em toda classe que irá fazer injeção de dependências Class decorator factory that allows the class' dependencies to be injected at runtime.
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository') // injetar o repositório --Parameter decorator factory that allows for interface information to be stored in the constructor's metadata
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<AppointmentFormat> {
    const appointmentDate = startOfHour(date);

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }

    const foundAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (foundAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment in the past date');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

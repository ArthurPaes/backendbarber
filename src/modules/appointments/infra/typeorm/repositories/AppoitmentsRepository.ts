import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDto';
import IFindAllInMonthOfProviderDTO from '@modules/appointments/dtos/IFindAllInMonthOfProviderDTO';
import IFindAllInDayOfProviderDTO from '@modules/appointments/dtos/IFindAllInDayOfProviderDTO';

import AppointmentFormat from '@modules/appointments/infra/typeorm/models/appointments';

class AppointmentsRepository implements IAppointmentsRepository {
  // Responsável por criar armazenar ler deletar editar os dados de appointment
  private ormRepository: Repository<AppointmentFormat>;

  constructor() {
    this.ormRepository = getRepository(AppointmentFormat);
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<AppointmentFormat | undefined> {
    // const findAppointent = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    const findAppointent = await this.ormRepository.findOne({
      where: {
        date,
        provider_id,
      },
    });

    return findAppointent || undefined;
  }

  public async findAllInMonthOfProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthOfProviderDTO): Promise<AppointmentFormat[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}), 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayOfProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayOfProviderDTO): Promise<AppointmentFormat[]> {
    const parsedDay = String(day).padStart(2, '0');

    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}), 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<AppointmentFormat> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

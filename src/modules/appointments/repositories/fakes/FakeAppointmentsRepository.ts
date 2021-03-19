import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDto';
import IFindAllInMonthOfProviderDTO from '@modules/appointments/dtos/IFindAllInMonthOfProviderDTO';
import IFindAllInDayOfProviderDTO from '@modules/appointments/dtos/IFindAllInDayOfProviderDTO';

import AppointmentFormat from '@modules/appointments/infra/typeorm/models/appointments';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: AppointmentFormat[] = [];

  // Responsável por criar armazenar ler deletar editar os dados de appointment

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<AppointmentFormat | undefined> {
    const findAppointent = this.appointments.find(
      appointment =>
        isEqual(date, appointment.date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointent;
  }

  public async findAllInMonthOfProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthOfProviderDTO): Promise<AppointmentFormat[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async findAllInDayOfProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayOfProviderDTO): Promise<AppointmentFormat[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<AppointmentFormat> {
    const appointment = new AppointmentFormat();

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;
    appointment.user_id = user_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

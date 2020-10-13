// liskov substitution principle - essas camadas que sao integrações com outra libs(ex: banco de dados) devem ter possiveis substituições dos dados definindo um conjunto de regras para elas(camadas)
// No caso foi definido que todo repositório de appointments deve ter o método fingByDate
// service irá depender apenas de uma "regra/formato" de repositório. Não deve conhecer a estrutra que armazena os dados, separar o máximo possível do typeorm(frameworks/ferramentas) para que seja mais fácil o entedimento e uma possível mudança de framework

import AppointmentFormat from '@modules/appointments/infra/typeorm/models/appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDto';
import IFindAllInMonthOfProviderDTO from '../dtos/IFindAllInMonthOfProviderDTO';
import IFindAllInDayOfProviderDTO from '../dtos/IFindAllInDayOfProviderDTO';

export default interface IAppointmentsRepository {
  create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<AppointmentFormat>;
  findByDate(
    date: Date,
    provider_id: string,
  ): Promise<AppointmentFormat | undefined>;
  findAllInMonthOfProvider(
    data: IFindAllInMonthOfProviderDTO,
  ): Promise<AppointmentFormat[]>;
  findAllInDayOfProvider(
    data: IFindAllInDayOfProviderDTO,
  ): Promise<AppointmentFormat[]>;
}

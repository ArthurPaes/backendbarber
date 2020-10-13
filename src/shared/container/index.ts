// Dependecy Injection

import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppoitmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

// register - toda vez que um arquivo diferente precisar do AppointmentsRepository, ele vai criar uma nova instância da classe do total zero
// registerSingleton - instância essa classe apenas uma vez durante todo o ciclo de vida da app -  todos os services irão utilizar a mesma instância da classe
container.registerSingleton<IAppointmentsRepository>( // vai garantir que a variável que estamos passando como segundo parâmetro tenha exatamente o formato da interface IAppointmentsRepository
  'AppointmentsRepository',
  AppointmentsRepository,
); // recebe o id/nome que eu quero utilizar para o repositório e o repositório a ser utilizado

container.registerSingleton<IUsersRepository>( // vai garantir que a variável que estamos passando como segundo parâmetro tenha exatamente o formato da interface IUsersRepository
  'UsersRepository',
  UsersRepository,
); // recebe o id/nome que eu quero utilizar para o repositório e o repositório a ser utilizado

container.registerSingleton<IUserTokensRepository>( // vai garantir que a variável que estamos passando como segundo parâmetro tenha exatamente o formato da interface IUsersRepository
  'UserTokensRepository',
  UserTokensRepository,
); // recebe o id/nome que eu quero utilizar para o repositório e o repositório a ser utilizado

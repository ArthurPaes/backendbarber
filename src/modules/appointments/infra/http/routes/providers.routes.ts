import { Router } from 'express';
// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppoitmentsRepository';  //removido após a injeção de dependência

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providersMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providersDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated); // aplica o middleware em todas as rotas

providersRouter.get('/', providersController.index); // abstrair a lógica que tinha dentro da rota
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providersMonthAvailabilityController.index,
); // abstrair a lógica que tinha dentro da rota
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providersDayAvailabilityController.index,
); // abstrair a lógica que tinha dentro da rota

export default providersRouter;

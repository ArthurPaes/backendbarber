import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated); // aplica o middleware em todas as rotas

// appointmentsRouter.get('/', async (request, response) => {

//   const appointmentList = await appointmentsRepository.find();

//   return response.json(appointmentList);
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
); // abstrair a lógica que tinha dentro da rota
appointmentsRouter.get('/me', providerAppointmentsController.index); // abstrair a lógica que tinha dentro da rota

export default appointmentsRouter;

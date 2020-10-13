import { Router } from 'express';
// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppoitmentsRepository';  //removido após a injeção de dependência

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

appointmentsRouter.post('/', appointmentsController.create); // abstrair a lógica que tinha dentro da rota
appointmentsRouter.get('/me', providerAppointmentsController.index); // abstrair a lógica que tinha dentro da rota
appointmentsRouter.get('/jooj', (reqeust, response) => {
  return response.json({ message: 'teste' });
});

appointmentsRouter.get('/me', (request, response) => {
  return response.json({ message: 'testando' });
});

export default appointmentsRouter;

import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'; /removido após a injeção de dependência

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;

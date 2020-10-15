import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'; /removido após a injeção de dependência

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;

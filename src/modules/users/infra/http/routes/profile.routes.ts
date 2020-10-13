import { Router } from 'express';

// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'; //removido após a injeção de dependência
import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;

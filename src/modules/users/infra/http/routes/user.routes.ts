import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'; //removido após a injeção de dependência
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig); // instância do multer passando como parâmetro as configs do arquivo upload.ts

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // nome do campo que vai conter a imagem quando eu chamar essa rota
  userAvatarController.update,
); // patch- atualizar uma única informação do usuário// put - atualizar mais de uma informação

export default usersRouter;

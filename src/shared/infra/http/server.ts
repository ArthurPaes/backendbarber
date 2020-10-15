import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm'; // conexão base de dados
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    // error originado pela aplicação

    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    // error que aconteceu internamente na api que não era esperado
    status: 'Error',
    message: 'Internal server error',
  });
}); // middlewares específicos para tratativas de erros,são obrigados a ter quatro parâmetros

app.get('/', (request, response) => {
  return response.json({ message: 'testando' });
});

app.listen('3334', () => {
  console.log('listening on http://localhost:3334');
});

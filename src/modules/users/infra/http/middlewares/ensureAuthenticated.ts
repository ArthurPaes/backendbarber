import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token jwt
  // pegar o token do cabeçalho da aplicação
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // bearer --- token

  const [, token] = authHeader.split(' '); // dividir bearer do token no espaço

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next(); // validado - permitir que o user continue usando a aplicação
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}

declare namespace Express {
  export interface Request {
    // anexar à importação do request que já existe dentro do express
    user: {
      id: string;
    };
  }
}

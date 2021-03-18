declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface Request {
    // anexar à importação do request que já existe dentro do express
    user: {
      id: string;
    };
  }
}

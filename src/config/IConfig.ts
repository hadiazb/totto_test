export interface IConfig  {
  env: string;
  app: {
    server: Server;
    dataBase: DataBase
  };
}

export interface Server {
  host: string | undefined;
  path: string;
  port: string | number;
}
export interface DataBase {
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbPort: string;
  dbHost: string;
};
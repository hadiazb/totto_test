import dotenv from 'dotenv';
import { IConfig } from './IConfig';

dotenv.config();

export const config: IConfig = {
  env: process.env.NODE_ENV!,
  app: {
    server: {
      host: process.env.HOST,
      path: process.env.PATH_VERSION!,
      port: process.env.PORT!
    },
    dataBase: {
      dbName: process.env.DB_NAME!,
      dbUser: process.env.DB_USER!,
      dbPassword: process.env.DB_PASSWORD!,
      dbPort: process.env.DB_PORT!,
      dbHost: process.env.DB_HOST!
    }
  }
};

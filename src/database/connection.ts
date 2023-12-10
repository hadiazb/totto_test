import { Sequelize } from 'sequelize';
import { config } from '../config';

export const sequelize: Sequelize = new Sequelize(
  config.app.dataBase.dbName,
  config.app.dataBase.dbUser,
  config.app.dataBase.dbPassword,
  {
    host: config.app.dataBase.dbHost,
    dialect: 'mysql',
    minifyAliases: true
  }
);

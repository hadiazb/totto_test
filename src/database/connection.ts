import { Sequelize } from 'sequelize';
import { config } from '../config';

export const sequelize: Sequelize = new Sequelize(
  config.environment.database.dbName,
  config.environment.database.dbUser,
  config.environment.database.dbPassword,
  {
    host: config.environment.database.dbHost,
    dialect: 'mysql',
    minifyAliases: true
  }
);

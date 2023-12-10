import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import socketIO from 'socket.io';

import { config } from '../config';

import { IServer } from './IServer';

import { sequelize } from '../database/connection';
import { initModels } from '../database/init-model';

import routes from '../routes';
import userRoutes from '../services/user/infrastructure/UserRoutes';
import statesRoutes from '../services/state/infrastructure/StateRoutes';

import { ErrorsHandler } from '../utils/error.handler';

export class Server implements IServer {
  public application!: express.Application;
  public configuration = config;
  public database = sequelize;
  public path = this.configuration.app.server.path;
  public errorHandler: ErrorsHandler = new ErrorsHandler();
  public io: socketIO.Server;
  public server;
  public whitelist: string[] = ['http://localhost:3000', 'https://myapp.co', '*'];

  constructor() {
    this.application = express();
    this.server = new http.Server(this.application);
    this.io = new socketIO.Server(this.server, {
      cors: {
        origin: true,
        credentials: true
      }
    });
    this.middlewaresBefore();
    this.routes();
    this.middlewaresAfter();
  }

  public middlewaresAfter() {
    this.application.set('port', this.configuration.app.server.port);
    this.application.use(helmet());
    this.application.use(
      express.urlencoded({
        extended: false
      })
    );
    this.application.use(this.errorHandler.logErrors);
    this.application.use(this.errorHandler.boomErrorHandler);
    this.application.use(this.errorHandler.errorHandler);
  }

  public middlewaresBefore() {
    this.application.use(morgan('dev'));
    this.application.use(express.json());
    this.application.use(this.corsValidator());
  }

  public routes() {
    this.application.use(routes);
    this.application.use(`${this.path}/user`, userRoutes);
    this.application.use(`${this.path}/states`, statesRoutes);
  }

  public start() {
    this.server.listen(this.application.get('port'), () => {
      console.log(
        `This is a ${this.configuration.env} environment, Running on ${
          this.configuration.app.server.host
        }${this.configuration.env === 'development' ? ':' + this.application.get('port') : ''}`
      );
      this.connectionDB();
      this.initModels();
    });
  }

  public async connectionDB() {
    try {
      this.database.sync({ force: true });
      console.log(
        `Database connected on ${this.configuration.env} environment Database Name: ${this.configuration.app.dataBase.dbName}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  public initModels() {
    initModels(this.database);
  }

  public corsValidator() {
    if (this.configuration.env === 'staging') {
      return cors({
        origin: '*'
      });
    }

    if (this.configuration.env === 'production') {
      return cors({
        origin: (origin, callback) => {
          if (this.whitelist.includes(origin!)) {
            callback(null, true);
          } else {
            callback(new Error('no permitido'));
          }
        }
      });
    }

    return cors({
      origin: '*'
    });
  }
}

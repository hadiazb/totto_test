import { Router, Request, NextFunction, Response } from 'express';
import Container from 'typedi';

import StateApi from './StateApi';
import { config } from '../../../config';

class StateRoutes {
  public router: Router;
  public configuration = config;
  public path = this.configuration.app.server.path;
  public baseUrl = `${this.configuration.app.server.host}${
    this.configuration.env === 'development' ? ':' + this.configuration.app.server.port : ''
  }${this.path}`;

  constructor() {
    this.router = Router();
    this.Routes();
  }

  public Routes() {
    const stateApi = Container.get(StateApi);

    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send({
        url: {
          baseUrl: this.baseUrl,
          options: [
            { authorization: false, path: '/findAll', method: ['GET'] },
            { authorization: false, path: '/findOne/:id', method: ['GET'] },
            { authorization: false, path: '/deleteOne/:id', method: ['DELETE'] },
            { authorization: false, path: '/createOne', method: ['POST'] },
            { authorization: false, path: '/updateOne/:id', method: ['PUT'] }
          ]
        }
      });
    });

    this.router.get('/findAll', (req: Request, res: Response, next: NextFunction) =>
      stateApi.findAll(req, res, next)
    );
    this.router.get('/findOne/:id', (req: Request, res: Response, next: NextFunction) =>
      stateApi.findOne(req, res, next)
    );
    this.router.delete('/deleteOne/:id', (req: Request, res: Response, next: NextFunction) =>
      stateApi.deleteOne(req, res, next)
    );
    this.router.post('/createOne', (req: Request, res: Response, next: NextFunction) =>
      stateApi.createOne(req, res, next)
    );
    this.router.put('/updateOne/:id', (req: Request, res: Response, next: NextFunction) =>
      stateApi.updateOne(req, res, next)
    );
  }
}

const stateRoutes = new StateRoutes();
stateRoutes.Routes();

export default stateRoutes.router;

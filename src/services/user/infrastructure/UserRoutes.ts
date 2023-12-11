import { Router, Request, NextFunction, Response } from 'express';
import Container from 'typedi';

import UserApi from './UserApi';
import { config } from '../../../config';

class UserRoutes {
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
    const userApi = Container.get(UserApi);

    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send({
        url: {
          baseUrl: this.baseUrl,
          options: [
            { authorization: false, path: '/findAll', method: ['GET'] },
            { authorization: false, path: '/findOne/:id', method: ['GET'] },
            { authorization: false, path: '/findByEmail/:email', method: ['GET'] },
            { authorization: false, path: '/deleteOne/:id', method: ['DELETE'] },
            { authorization: false, path: '/createOne', method: ['POST'] },
            { authorization: false, path: '/updateOne/:id', method: ['PUT'] }
          ]
        }
      });
    });

    this.router.get('/findAll', (req: Request, res: Response, next: NextFunction) =>
      userApi.findAll(req, res, next)
    );
    this.router.get('/findOne/:id', (req: Request, res: Response, next: NextFunction) =>
      userApi.findOne(req, res, next)
    );
    this.router.get('/findByEmail/:email', (req: Request, res: Response, next: NextFunction) =>
      userApi.findByEmail(req, res, next)
    );
    this.router.delete('/deleteOne/:id', (req: Request, res: Response, next: NextFunction) =>
      userApi.deleteOne(req, res, next)
    );
    this.router.post('/createOne', (req: Request, res: Response, next: NextFunction) =>
      userApi.createOne(req, res, next)
    );
    this.router.put('/updateOne/:id', (req: Request, res: Response, next: NextFunction) =>
      userApi.updateOne(req, res, next)
    );
  }
}

const userRoutes = new UserRoutes();
userRoutes.Routes();

export default userRoutes.router;

import { Router } from 'express';
import { config } from '../config';

class Routes {
  public configuration = config;

  public path = this.configuration.app.server.path;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public router: Router;
  public baseUrl = `${this.configuration.app.server.host}${
    this.configuration.env === 'development' ? ':' + this.configuration.app.server.port : ''
  }${this.path}`;

  public routes() {
    this.router.get(this.path, (_, res) => {
      res.send({
        baseUrl: this.baseUrl,
        userEndPoint: `${this.baseUrl}/user`
      });
    });
  }
}

const routes = new Routes();
routes.routes();

export default routes.router;

import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { ApiResponse } from '../../../utils/response.handler';
import { UserController } from '../interfaceAdapter/UserController';

@Service()
export default class UserApi {
  constructor(
    private readonly userController: UserController,
    private readonly apiResponse: ApiResponse
  ) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.findAll();
      this.apiResponse.success(req, res, { status: 200, users: response });
    } catch (error) {
      next(error);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.findOne(req.params.id);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.deleteOne(req.params.id);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.createOne(req.body);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.updateOne(req.params.id, req.body);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

}

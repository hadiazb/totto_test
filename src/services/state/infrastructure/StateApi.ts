import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { ApiResponse } from '../../../utils/response.handler';
import { StateController } from '../interfaceAdapter/StateController';

@Service()
export default class UserApi {
  constructor(
    private readonly stateController: StateController,
    private readonly apiResponse: ApiResponse
  ) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const statesListResponse = await this.stateController.findAll();
      this.apiResponse.success(req, res, { status: 200, users: statesListResponse });
    } catch (error) {
      next(error);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.stateController.findOne(req.params.id);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.stateController.deleteOne(req.params.id);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.stateController.createOne(req.body);
      this.apiResponse.success(req, res, { status: 200, state: response });
    } catch (error) {
      next(error);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.stateController.updateOne(req.params.id, req.body);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }
}

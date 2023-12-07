import { Service } from 'typedi';
import boom from '@hapi/boom';

import { IUserRepository } from './IUserRepository';
import { Users } from '../../../../database/init-model';
import { IUserCreator } from '../../application/interface/IUserCreator';

@Service()
export class UserRepository implements IUserRepository {
  public async findAll(): Promise<Users[] | string> {
    try {
      let response: Users[];
      response = await Users.findAll();
      if (!response.length) {
        return 'The Users table is empty';
      }
      return response;
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  public async findOne(id: string): Promise<Users | string> {
    try {
      const response = await Users.findByPk(id);

      if (!response) {
        throw boom.notFound(`The user with ${id} not found`);
      }

      return response;
    } catch (error: any) {
      throw boom.notFound(`The user with ${id} not found`);
    }
  }

  public async deleteOne(id: string): Promise<number | string> {
    try {
      const response = await Users.destroy({
        where: {
          id
        }
      });

      if (typeof response === 'string') {
        return await response;
      }

      if (response === 1) {
        return await `User with id=${id} was deleted`;
      }

      if (response === 0) {
        throw boom.notFound(`User with id=${id} not found`);
      }

      return await response;
    } catch (error: any) {
      throw boom.notFound(`User with id=${id} not found`);
    }
  }

  public async createOne(body: IUserCreator): Promise<Users | string> {
    let response;
    try {


      if (!body.email) {
        return boom.notFound(`Email is need`).message;
      }

      const user =  await Users.findOne({
        where: {
          email: body.email
        }
      })

      if (user) {
        return boom.conflict(`User already exist`).message;
      }

      response = await Users.create({ ...body });
      return response;
    } catch (error: any) {
      return error.parent.detail;
    }
  }

  public async updateOne(id: string, body: IUserCreator): Promise<string> {
    let response;
    try {

      const user = await Users.findByPk(id);

      if (user === null) {
        return boom.notFound(`User with id=${id} not found`).message;
      }

      if (user.isUpdate === true) {
        return boom.unauthorized(`User with id=${id} was updated`).message;
      }

      response = await Users.update(body, {
        where: {
          id
        }
      });

      if (response[0] === 1) {
        await Users.findByPk(id);
        return await `User with id=${id} was updated`;
      }

      throw boom.notFound(`User with id=${id} not found`);
    } catch (error: any) {
      throw boom.notFound(`User with id=${id} not found`);
    }
  }


}

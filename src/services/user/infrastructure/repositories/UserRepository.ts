import { Service } from 'typedi';
import boom from '@hapi/boom';

import { IUserRepository } from './IUserRepository';
import { Users, UsersAttributes } from '../../../../database/init-model';

@Service()
export class UserRepository implements IUserRepository {
  public async findAll(): Promise<{ users: Users[]; message: string }> {
    try {
      const users: Users[] = await Users.findAll();
      if (!users.length) {
        return { message: 'The Users table is empty', users: [] };
      }
      return {
        users,
        message: 'User list'
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  public async findOne(id: string): Promise<Users | string> {
    try {
      const user = await Users.findByPk(id);

      if (!user) {
        throw boom.notFound(`The user with ${id} not found`);
      }

      return user;
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

  public async createOne(body: UsersAttributes): Promise<Users | string> {
    try {
      if (!body.email) {
        return boom.notFound(`Email is need`).message;
      }

      const user = await Users.findOne({
        where: {
          email: body.email
        }
      });

      if (user) {
        return boom.conflict(`User already exist`).message;
      }

      return await Users.create({ ...body });
    } catch (err: any) {
      return err.message;
    }
  }

  public async updateOne(id: string, body: UsersAttributes): Promise<string> {
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

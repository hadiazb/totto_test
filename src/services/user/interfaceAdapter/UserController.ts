import { Service } from 'typedi';

import { IUserController } from './IUserController';
import { UserRetriever } from '../application/implementation/UserRetriever';
import { Users, UsersAttributes } from '../../../database/init-model';
import { UserCreator } from '../application/implementation/UserCreator';
import { UserDelete } from '../application/implementation/UserDelete';
import { UserUpdate } from '../application/implementation/UserUpdate';

@Service()
export class UserController implements IUserController {
  constructor(
    private readonly userRetriever: UserRetriever,
    private readonly userCreator: UserCreator,
    private readonly userDelete: UserDelete,
    private readonly userUpdate: UserUpdate
  ) {}

  public async findAll(): Promise<{ users: Users[]; message: string }> {
    return await this.userRetriever.findAll();
  }

  public async findOne(id: string): Promise<Users | string> {
    return await this.userRetriever.findOne(id);
  }

  public async deleteOne(id: string): Promise<number | string> {
    return await this.userDelete.deleteOne(id);
  }

  public async createOne(user: UsersAttributes): Promise<Users | string> {
    return await this.userCreator.createOne(user);
  }

  public async updateOne(id: string, user: UsersAttributes): Promise<string> {
    return await this.userUpdate.updateOne(id, user);
  }
}

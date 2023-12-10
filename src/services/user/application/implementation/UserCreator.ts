import { Service } from 'typedi';

import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { IUserCreator } from '../interface/IUserCreator';
import { UsersAttributes, Users } from 'database/init-model';

@Service()
export class UserCreator implements IUserCreator {
  constructor(private readonly userRepository: UserRepository) {}

  public async createOne(user: UsersAttributes): Promise<Users | string> {
    return await this.userRepository.createOne(user);
  }
}

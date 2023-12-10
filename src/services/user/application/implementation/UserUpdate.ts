import { Service } from 'typedi';

import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { UsersAttributes } from '../../../../database/init-model';
import { IUserUpdate } from '../interface/IUserUpdate';

@Service()
export class UserUpdate implements IUserUpdate {
  constructor(private readonly userRepository: UserRepository) {}

  public async updateOne(id: string, user: UsersAttributes): Promise<string> {
    return await this.userRepository.updateOne(id, user);
  }
}

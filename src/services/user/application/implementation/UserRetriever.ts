import { Service } from 'typedi';

import { IUserRetriever } from '../interface/IUserRetriever';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Users } from '../../../../database/init-model';

@Service()
export class UserRetriever implements IUserRetriever {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll(): Promise<{ users: Users[]; message: string }> {
    return await await this.userRepository.findAll();
  }

  public async findOne(id: string): Promise<Users | string> {
    return await this.userRepository.findOne(id);
  }
}

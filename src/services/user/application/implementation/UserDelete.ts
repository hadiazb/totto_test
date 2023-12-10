import { Service } from 'typedi';

import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { IUserDelete } from '../interface/IUserDelete';

@Service()
export class UserDelete implements IUserDelete {
  constructor(private readonly userRepository: UserRepository) {}

  public async deleteOne(id: string): Promise<string | number> {
    return await await this.userRepository.deleteOne(id);
  }
}

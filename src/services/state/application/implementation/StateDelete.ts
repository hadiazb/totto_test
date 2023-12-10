import { Service } from 'typedi';

import { StateRepository } from '../../infrastructure/repositories/StateRepository';
import { IStateDelete } from '../interface/IStateDelete';

@Service()
export class StateDelete implements IStateDelete {
  constructor(private readonly stateRepository: StateRepository) {}

  public async deleteOne(id: string): Promise<string | number> {
    return await await this.stateRepository.deleteOne(id);
  }
}

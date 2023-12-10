import { Service } from 'typedi';

import { StateRepository } from '../../infrastructure/repositories/StateRepository';
import { StateAttributes } from '../../../../database/init-model';
import { IStateUpdate } from '../interface/IStateUpdate';

@Service()
export class StateUpdate implements IStateUpdate {
  constructor(private readonly stateRepository: StateRepository) {}

  public async updateOne(id: string, state: StateAttributes): Promise<string> {
    return await this.stateRepository.updateOne(id, state);
  }
}

import { Service } from 'typedi';

import { StateRepository } from '../../infrastructure/repositories/StateRepository';
import { IStateCreator } from '../interface/ISateCreator';
import { StateAttributes, State } from 'database/init-model';

@Service()
export class StateCreator implements IStateCreator {
  constructor(private readonly stateRepository: StateRepository) {}

  public async createOne(state: StateAttributes): Promise<State | string> {
    return await this.stateRepository.createOne(state);
  }
}

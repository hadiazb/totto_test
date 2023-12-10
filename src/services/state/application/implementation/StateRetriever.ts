import { Service } from 'typedi';

import { IStateRetriever } from '../interface/IStateRetriever';
import { StateRepository } from '../../infrastructure/repositories/StateRepository';
import { State } from '../../../../database/init-model';

@Service()
export class StateRetriever implements IStateRetriever {
  constructor(private readonly stateRepository: StateRepository) {}

  public async findAll(): Promise<{ states: State[]; message: string }> {
    return await await this.stateRepository.findAll();
  }

  public async findOne(id: string): Promise<State | string> {
    return await this.stateRepository.findOne(id);
  }
}

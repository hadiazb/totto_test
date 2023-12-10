import { Service } from 'typedi';

import { IStateController } from './IStateController';
import { StateRetriever } from '../application/implementation/StateRetriever';
import { State, StateAttributes } from '../../../database/init-model';
import { StateDelete } from '../application/implementation/StateDelete';
import { StateUpdate } from '../application/implementation/StateUpdate';
import { StateCreator } from '../application/implementation/StateCreator';

@Service()
export class StateController implements IStateController {
  constructor(
    private readonly stateRetriever: StateRetriever,
    private readonly stateCreator: StateCreator,
    private readonly stateDelete: StateDelete,
    private readonly stateUpdate: StateUpdate
  ) {}

  public async findAll(): Promise<{ states: State[]; message: string }> {
    return await this.stateRetriever.findAll();
  }

  public async findOne(id: string): Promise<State | string> {
    return await this.stateRetriever.findOne(id);
  }

  public async deleteOne(id: string): Promise<number | string> {
    return await this.stateDelete.deleteOne(id);
  }

  public async createOne(state: StateAttributes): Promise<State | string> {
    return await this.stateCreator.createOne(state);
  }

  public async updateOne(id: string, state: StateAttributes): Promise<string> {
    return await this.stateUpdate.updateOne(id, state);
  }
}

import { State, StateAttributes } from '../../../database/init-model';

export interface IStateController {
  findAll(): Promise<{ states: State[]; message: string }>;
  findOne(id: string): Promise<State | string>;
  deleteOne(id: string): Promise<number | string>;
  createOne(state: StateAttributes): Promise<State | string>;
  updateOne(id: string, state: StateAttributes): Promise<string>;
}

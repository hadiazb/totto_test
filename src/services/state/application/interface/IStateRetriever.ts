import { State } from '../../../../database/init-model';

export interface IStateRetriever {
  findAll(): Promise<{ states: State[]; message: string }>;
  findOne(id: string): Promise<State | string>;
}

import { State, StateAttributes } from '../../../../database/init-model';

export interface IStateCreator {
  createOne(state: StateAttributes): Promise<State | string>;
}

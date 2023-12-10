import { StateAttributes } from '../../../../database/init-model';

export interface IStateUpdate {
  updateOne(id: string, state: StateAttributes): Promise<string>;
}

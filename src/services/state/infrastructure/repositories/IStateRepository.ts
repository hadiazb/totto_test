import { CityAttributes, State, StateAttributes } from '../../../../database/init-model';

export interface IStateRepository {
  findAll(): Promise<{ states: State[]; message: string }>;
  findOne(id: string): Promise<State | string>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: StateAttributes & CityAttributes): Promise<State | string>;
  updateOne(id: string, body: StateAttributes): Promise<string>;
}

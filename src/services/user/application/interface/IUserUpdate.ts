import { UsersAttributes } from '../../../../database/init-model';

export interface IUserUpdate {
  updateOne(id: string, user: UsersAttributes): Promise<string>;
}

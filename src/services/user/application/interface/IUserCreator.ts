import { Users, UsersAttributes } from '../../../../database/init-model';

export interface IUserCreator {
  createOne(user: UsersAttributes): Promise<Users | string>;
}

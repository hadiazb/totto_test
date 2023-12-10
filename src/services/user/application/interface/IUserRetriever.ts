import { Users } from '../../../../database/init-model';

export interface IUserRetriever {
  findAll(): Promise<{ users: Users[]; message: string }>;
  findOne(id: string): Promise<Users | string>;
}

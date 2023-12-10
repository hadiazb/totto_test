import { Users, UsersAttributes } from '../../../../database/init-model';

export interface IUserRepository {
  findAll(): Promise<{ users: Users[]; message: string }>;
  findOne(id: string): Promise<Users | string>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: UsersAttributes, role: string): Promise<Users | string>;
  updateOne(id: string, body: UsersAttributes): Promise<string>;
}

import { Users, UsersAttributes } from '../../../../database/init-model';

export interface IUserRepository {
  findAll(): Promise<{ users: Users[]; message: string }>;
  findOne(id: string): Promise<{ user: Users; message: string }>;
  findByEmail(email: string): Promise<{ user: Users; message: string }>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: UsersAttributes, role: string): Promise<Users | string>;
  updateOne(id: string, body: UsersAttributes): Promise<string>;
}

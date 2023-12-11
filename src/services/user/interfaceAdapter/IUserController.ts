import { Users, UsersAttributes } from '../../../database/init-model';

export interface IUserController {
  findAll(): Promise<{ users: Users[]; message: string }>;
  findOne(id: string): Promise<{ user: Users; message: string }>;
  findByEmail(email: string): Promise<{ user: Users; message: string }>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: UsersAttributes): Promise<Users | string>;
  updateOne(id: string, user: UsersAttributes): Promise<string>;
}

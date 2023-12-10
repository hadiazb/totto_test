export interface IUserDelete {
  deleteOne(id: string): Promise<number | string>;
}

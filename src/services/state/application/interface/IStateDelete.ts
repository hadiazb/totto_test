export interface IStateDelete {
  deleteOne(id: string): Promise<number | string>;
}

export interface IRepository<TQuery, TNew, TInsert, T> {
  create(newRate: TNew): Promise<T | null>;

  getAll(): Promise<T[]>;

  getById(keys: TQuery): Promise<T | null>;

  update(keys: TQuery, rateData: Partial<TInsert>): Promise<T | null>;

  delete(keys: TQuery): Promise<void>;
}

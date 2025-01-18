export interface IRepository<TQuery, TNew, T> {
  create(newRate: TNew): Promise<T>;

  getAll(): Promise<T[]>;

  getById(keys: TQuery): Promise<T | null>;

  update(keys: TQuery, rateData: Partial<T>): Promise<T | null>;

  delete(keys: TQuery): Promise<void>;
}

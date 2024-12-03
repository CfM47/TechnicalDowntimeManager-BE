import { Transfer, NewTransfer } from '../../db/schemas/transfer';
import { SQL } from 'drizzle-orm';

export interface ITransferModel {
  create(newTransfer: NewTransfer): Promise<Transfer>;

  getAll(): Promise<Transfer[]>;

  getById(keys: SQL[]): Promise<Transfer | null>;

  update(keys: SQL[], userData: Partial<Transfer>): Promise<Transfer | null>;

  delete(keys: SQL[]): Promise<void>;
}

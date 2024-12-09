import { Transfer, NewTransfer } from '../features/Transfer/schema';
import { TransferQuery } from '../features/Transfer/utils';

export interface ITransferModel {
  create(newTransfer: NewTransfer): Promise<Transfer>;

  getAll(): Promise<Transfer[]>;

  getById(keys: TransferQuery): Promise<Transfer | null>;

  update(keys: TransferQuery, transferData: Partial<Transfer>): Promise<Transfer | null>;

  delete(keys: TransferQuery): Promise<void>;
}

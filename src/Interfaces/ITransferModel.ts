import { Transfer, NewTransfer } from '../features/Transfer/schema';
import { TransferQuery } from '../features/Transfer/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line
export interface ITransferModel extends IRepository<TransferQuery, NewTransfer, Transfer> {}

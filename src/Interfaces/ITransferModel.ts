import { Transfer, NewTransfer } from '../features/Transfer/schema';
import { TransferQuery } from '../features/Transfer/utils';
import { IRepository } from './IRepository';
import { TransferType } from '../features/Transfer/types';

/**
 * Interface representing a transfer model.
 *
 * This interface extends the IRepository interface with specific type parameters
 * for handling transfer-related operations. It is designed to provide the abstraction
 * necessary for managing transfer data and its interaction with the underlying system or database.
 *
 * @extends IRepository
 * @template TransferQuery Represents the type for querying transfers.
 * @template NewTransfer Represents the type for creating a new transfer.
 * @template Transfer Represents the transfer entity.
 * @template TransferType Represents any specific type or category related to transfers.
 */
// eslint-disable-next-line
export interface ITransferModel
  extends IRepository<TransferQuery, NewTransfer, Transfer, TransferType> {}

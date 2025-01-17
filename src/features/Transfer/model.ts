import { transfer } from './schema';
import { ITransferModel } from '../../Interfaces/ITransferModel';
import { TransferQuery, TransferQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class TransferModel extends IRepository<TransferQuery> implements ITransferModel {
  constructor() {
    super(transfer, TransferQueryBuilder);
  }
}

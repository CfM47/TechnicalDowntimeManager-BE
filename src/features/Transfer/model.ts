import { NewTransfer, transfer, Transfer } from './schema';
import { db } from '../../db/config/db_connect';
import { ITransferModel } from '../../Interfaces/ITransferModel';
import { and } from 'drizzle-orm';
import { TransferQuery, TransferQueryBuilder } from './utils';

export class TransferModel implements ITransferModel {
  async create(newTransfer: NewTransfer): Promise<Transfer> {
    const createdTransfer = await db.insert(transfer).values(newTransfer).returning();
    return createdTransfer[0];
  }

  async delete(keys: TransferQuery): Promise<void> {
    const filter = TransferQueryBuilder(keys);
    await db.delete(transfer).where(and(...filter));
  }

  async getAll(): Promise<Transfer[]> {
    return db.select().from(transfer);
  }

  async getById(keys: TransferQuery): Promise<Transfer | null> {
    const filter = TransferQueryBuilder(keys);
    const resultTransfer = await db
      .select()
      .from(transfer)
      .where(and(...filter))
      .limit(1);
    return resultTransfer[0];
  }

  async update(keys: TransferQuery, transferData: Partial<Transfer>): Promise<Transfer | null> {
    const filter = TransferQueryBuilder(keys);
    const updatedTransfer = await db
      .update(transfer)
      .set(transferData)
      .where(and(...filter))
      .returning();
    return updatedTransfer[0];
  }
}

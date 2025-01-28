import { NewTransfer, transfer, Transfer } from './schema';
import { db } from '../../db/config/db_connect';
import { ITransferModel } from '../../Interfaces/ITransferModel';
import { and, desc, eq } from 'drizzle-orm';
import { TransferQuery, TransferQueryBuilder } from './utils';
import { transferSelection, TransferType } from './types';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';
import { alias } from 'drizzle-orm/pg-core';
import { Pagination } from '../../utils';

/**
 * Class representing the Transfer model.
 * This class implements the ITransferModel interface and provides methods
 * for creating, retrieving, updating, and deleting transfer records in the database.
 *
 * Methods:
 * - create(newTransfer: NewTransfer): Creates a new transfer record.
 * - delete(keys: TransferQuery): Deletes a transfer record by its keys.
 * - getAll(filter: TransferQuery): Retrieves all transfer records matching the filter.
 * - getById(keys: TransferQuery): Retrieves a transfer record by its keys.
 * - update(keys: TransferQuery, transferData: Partial<Transfer>): Updates a transfer record by its keys.
 */
export class TransferModel implements ITransferModel {
  async create(newTransfer: NewTransfer): Promise<TransferType | null> {
    const [createdTransfer] = await db.insert(transfer).values(newTransfer).returning();
    const query: TransferQuery = {
      id_sender: createdTransfer.id_sender,
      id_receiver: createdTransfer.id_receiver,
      id_equipment: createdTransfer.id_equipment,
      date: createdTransfer.date,
      id_origin_dep: createdTransfer.id_origin_dep,
      id_receiver_dep: createdTransfer.id_receiver_dep
    };
    return await this.getById(query);
  }

  async delete(keys: TransferQuery): Promise<void> {
    const filter = TransferQueryBuilder(keys);
    await db.delete(transfer).where(and(...filter));
  }

  async getAll(filter: TransferQuery, pagination: Pagination): Promise<TransferType[]> {
    return db
      .select(transferSelection)
      .from(transfer)
      .innerJoin(alias(user, 'sender'), eq(transfer.id_sender, alias(user, 'sender').id))
      .innerJoin(alias(user, 'receiver'), eq(transfer.id_receiver, alias(user, 'receiver').id))
      .innerJoin(equipment, eq(transfer.id_equipment, equipment.id))
      .innerJoin(
        alias(department, 'origin_dep'),
        eq(transfer.id_origin_dep, alias(department, 'origin_dep').id)
      )
      .innerJoin(
        alias(department, 'receiver_dep'),
        eq(transfer.id_receiver_dep, alias(department, 'receiver_dep').id)
      )
      .where(and(...TransferQueryBuilder(filter)))
      .orderBy(desc(transfer.date))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
  }

  async getById(keys: TransferQuery): Promise<TransferType | null> {
    const filter = TransferQueryBuilder(keys);
    const [resultTransfer] = await db
      .select(transferSelection)
      .from(transfer)
      .innerJoin(alias(user, 'sender'), eq(transfer.id_sender, alias(user, 'sender').id))
      .innerJoin(alias(user, 'receiver'), eq(transfer.id_receiver, alias(user, 'receiver').id))
      .innerJoin(equipment, eq(transfer.id_equipment, equipment.id))
      .innerJoin(
        alias(department, 'origin_dep'),
        eq(transfer.id_origin_dep, alias(department, 'origin_dep').id)
      )
      .innerJoin(
        alias(department, 'receiver_dep'),
        eq(transfer.id_receiver_dep, alias(department, 'receiver_dep').id)
      )
      .where(and(...filter))
      .limit(1);
    return resultTransfer;
  }

  async update(keys: TransferQuery, transferData: Partial<Transfer>): Promise<TransferType | null> {
    const filter = TransferQueryBuilder(keys);
    const [updatedTransfer] = await db
      .update(transfer)
      .set(transferData)
      .where(and(...filter))
      .returning();
    const query: TransferQuery = {
      id_sender: updatedTransfer.id_sender,
      id_receiver: updatedTransfer.id_receiver,
      id_equipment: updatedTransfer.id_equipment,
      date: updatedTransfer.date,
      id_origin_dep: updatedTransfer.id_origin_dep,
      id_receiver_dep: updatedTransfer.id_receiver_dep
    };
    return await this.getById(query);
  }
}

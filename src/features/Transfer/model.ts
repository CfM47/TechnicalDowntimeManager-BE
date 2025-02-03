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
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';

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
  /**
   * Creates a new transfer record in the database and retrieves the created transfer.
   *
   * @param {NewTransfer} newTransfer - The details of the new transfer to be created.
   * @return {Promise<TransferType | null>} A promise that resolves to the created transfer object, or null if not found.
   */
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

  /**
   * Deletes records from the 'transfer' table that match the provided query filters.
   *
   * @param {TransferQuery} keys - An object containing query filters to identify the records to delete.
   * @return {Promise<void>} A promise that resolves when the deletion is complete.
   */
  async delete(keys: TransferQuery): Promise<void> {
    const filter = TransferQueryBuilder(keys);
    await db.delete(transfer).where(and(...filter));
  }

  /**
   * Retrieves a list of transfers based on the specified filter and pagination criteria.
   *
   * @param {TransferQuery} filter - The query object containing filtering conditions for transfers.
   * @param {Pagination} pagination - The pagination object specifying the page number and size.
   * @return {Promise<PaginatedResponse<TransferType>>} A promise that resolves to a paginated response containing transfer items, pagination details, and the total count.
   */
  async getAll(
    filter: TransferQuery,
    pagination: Pagination
  ): Promise<PaginatedResponse<TransferType>> {
    const filterQuery = TransferQueryBuilder(filter);
    const items = await db
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
      .where(and(...filterQuery))
      .orderBy(desc(transfer.date))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(transfer, filterQuery)
    };
  }

  /**
   * Retrieves a transfer record by the specified query keys.
   *
   * @param {TransferQuery} keys - The query parameters used to filter the transfer records.
   * @return {Promise<TransferType | null>} Returns a promise that resolves to the transfer record if found, or null if no record matches the criteria.
   */
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

  /**
   * Updates the transfer record in the database based on the provided query parameters and data.
   *
   * @param {TransferQuery} keys - Query parameters to identify the transfer record to update.
   * @param {Partial<Transfer>} transferData - Partial transfer data to update the identified record.
   * @return {Promise<TransferType | null>} A promise that resolves to the updated transfer object or null if not found.
   */
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

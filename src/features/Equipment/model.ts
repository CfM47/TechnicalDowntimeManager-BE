import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { equipment, Equipment, NewEquipment } from './schema';
import { db } from '../../db/config/db_connect';
import { and, eq } from 'drizzle-orm';
import { EquipmentQuery, EquipmentQueryBuilder } from './utils';
import { equipmentSelection, EquipmentType } from './types';
import { department } from '../Department/schema';

/**
 * Model for handling CRUD operations on equipment.
 *
 * This model provides methods to create, retrieve, update, and delete
 * equipment records. It uses the database connection to interact with
 * the equipment table and performs necessary operations based on the
 * provided queries.
 */
export class EquipmentModel implements IEquipmentModel {

  /**
   * Creates a new equipment record.
   *
   * Inserts a new equipment record into the database and returns the created record.
   *
   * @param newEquipment - The new equipment data to be inserted.
   * @returns The created equipment record.
   */
  async create(newEquipment: NewEquipment): Promise<EquipmentType | null> {
    const [createdEquipment] = await db.insert(equipment).values(newEquipment).returning();
    const query: EquipmentQuery = { id: createdEquipment.id };
    return await this.getById(query);
  }

  /**
   * Deletes an equipment record.
   *
   * Removes the specified equipment record from the database.
   *
   * @param keys - The query keys to identify the equipment record to be deleted.
   */
  async delete(keys: EquipmentQuery): Promise<void> {
    const filter = EquipmentQueryBuilder(keys);
    await db.delete(equipment).where(and(...filter));
  }

  /**
   * Retrieves all equipment records.
   *
   * Fetches all equipment records from the database based on the provided filter.
   *
   * @param filter - The query filter to apply.
   * @returns An array of equipment records.
   */
  async getAll(filter: EquipmentQuery): Promise<EquipmentType[]> {
    return db
      .select(equipmentSelection)
      .from(equipment)
      .innerJoin(department, eq(equipment.id_department, department.id))
      .where(and(...EquipmentQueryBuilder(filter)));
  }

  /**
   * Retrieves an equipment record by ID.
   *
   * Fetches a single equipment record from the database based on the provided query keys.
   *
   * @param keys - The query keys to identify the equipment record.
   * @returns The equipment record, or null if not found.
   */
  async getById(keys: EquipmentQuery): Promise<EquipmentType | null> {
    const filter = EquipmentQueryBuilder(keys);
    const [resultEquipment] = await db
      .select(equipmentSelection)
      .from(equipment)
      .innerJoin(department, eq(equipment.id_department, department.id))
      .where(and(...filter))
      .limit(1);
    return resultEquipment;
  }

  /**
   * Updates an equipment record.
   *
   * Updates the specified equipment record in the database and returns the updated record.
   *
   * @param keys - The query keys to identify the equipment record to be updated.
   * @param equipmentData - The new data to update the equipment record with.
   * @returns The updated equipment record, or null if not found.
   */
  async update(
    keys: EquipmentQuery,
    equipmentData: Partial<Equipment>
  ): Promise<EquipmentType | null> {
    const filter = EquipmentQueryBuilder(keys);
    const [updatedEquipment] = await db
      .update(equipment)
      .set(equipmentData)
      .where(and(...filter))
      .returning();
    const query: EquipmentQuery = { id: updatedEquipment.id };
    return await this.getById(query);
  }
}

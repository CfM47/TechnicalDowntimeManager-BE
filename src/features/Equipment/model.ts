import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { equipment, Equipment, NewEquipment } from './schema';
import { db } from '../../db/config/db_connect';
import { and, eq } from 'drizzle-orm';
import { EquipmentQuery, EquipmentQueryBuilder } from './utils';
import { equipmentSelection, EquipmentType } from './types';
import { department } from '../Department/schema';

export class EquipmentModel implements IEquipmentModel {
  async create(newEquipment: NewEquipment): Promise<EquipmentType | null> {
    const [createdEquipment] = await db.insert(equipment).values(newEquipment).returning();
    const query: EquipmentQuery = { id: createdEquipment.id };
    return await this.getById(query);
  }

  async delete(keys: EquipmentQuery): Promise<void> {
    const filter = EquipmentQueryBuilder(keys);
    await db.delete(equipment).where(and(...filter));
  }

  async getAll(filter: EquipmentQuery): Promise<EquipmentType[]> {
    return db
      .select(equipmentSelection)
      .from(equipment)
      .innerJoin(department, eq(equipment.id_department, department.id))
      .where(and(...EquipmentQueryBuilder(filter)));
  }

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

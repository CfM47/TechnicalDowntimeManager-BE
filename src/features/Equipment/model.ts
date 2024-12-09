import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { equipment, Equipment, NewEquipment } from './schema';
import { db } from '../../db/config/db_connect';
import { and } from 'drizzle-orm';
import { EquipmentQuery, EquipmentQueryBuilder } from './utils';

export class EquipmentModel implements IEquipmentModel {
  async create(newEquipment: NewEquipment): Promise<Equipment> {
    const createdEquipment = await db.insert(equipment).values(newEquipment).returning();
    return createdEquipment[0];
  }

  async delete(keys: EquipmentQuery): Promise<void> {
    const filter = EquipmentQueryBuilder(keys);
    await db.delete(equipment).where(and(...filter));
  }

  async getAll(): Promise<Equipment[]> {
    return db.select().from(equipment);
  }

  async getById(keys: EquipmentQuery): Promise<Equipment | null> {
    const filter = EquipmentQueryBuilder(keys);
    const resultEquipment = await db
      .select()
      .from(equipment)
      .where(and(...filter))
      .limit(1);
    return resultEquipment[0];
  }

  async update(keys: EquipmentQuery, equipmentData: Partial<Equipment>): Promise<Equipment | null> {
    const filter = EquipmentQueryBuilder(keys);
    const updatedEquipment = await db
      .update(equipment)
      .set(equipmentData)
      .where(and(...filter))
      .returning();
    return updatedEquipment[0];
  }
}

import { IEquipmentModel } from '../Interfaces/IEquipmentModel';
import { equipment, Equipment, NewEquipment } from '../../db/schemas/equipment';
import { db } from '../../db/config/db_connect';
import { and, eq, SQL } from 'drizzle-orm';

export class EquipmentModel implements IEquipmentModel {
  async create(newEquipment: NewEquipment): Promise<Equipment> {
    const createdEquipment = await db.insert(equipment).values(newEquipment).returning();
    return createdEquipment[0];
  }

  async delete(keys : SQL[]): Promise<void> {
    await db.delete(equipment).where(and(...keys));
  }

  async getAll(): Promise<Equipment[]> {
    return db.select().from(equipment);
  }

  async getById(keys : SQL[]): Promise<Equipment | null> {
    const resultEquipment = await db.select().from(equipment).where(and(...keys)).limit(1);
    return resultEquipment[0];
  }

  async update(keys : SQL[], equipmentData: Partial<Equipment>): Promise<Equipment | null> {
    const updatedEquipment = await db
      .update(equipment)
      .set(equipmentData)
      .where(and(...keys))
      .returning();
    return updatedEquipment[0];
  }
}

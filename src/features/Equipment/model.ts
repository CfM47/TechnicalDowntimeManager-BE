import { IEquipmentModel } from '../Interfaces/IEquipmentModel';
import { equipment, Equipment, NewEquipment } from '../../db/schemas/equipment';
import { db } from '../../db/config/db_connect';
import { eq } from 'drizzle-orm';

export class EquipmentModel implements IEquipmentModel {
  async create(newEquipment: NewEquipment): Promise<Equipment> {
    const createdEquipment = await db.insert(equipment).values(newEquipment).returning();
    return createdEquipment[0];
  }

  async delete(id: string): Promise<void> {
    await db.delete(equipment).where(eq(equipment.id, id));
  }

  async getAll(): Promise<Equipment[]> {
    return db.select().from(equipment);
  }

  async getById(id: string): Promise<Equipment | null> {
    const resultEquipment = await db.select().from(equipment).where(eq(equipment.id, id)).limit(1);
    return resultEquipment[0];
  }

  async update(id: string, equipmentData: Partial<Equipment>): Promise<Equipment | null> {
    const updatedEquipment = await db
      .update(equipment)
      .set(equipmentData)
      .where(eq(equipment.id, id))
      .returning();
    return updatedEquipment[0];
  }
}

import { NewDowntime, downtime, Downtime } from './schema';
import { db } from '../../db/config/db_connect';
import { IDowntimeModel } from '../../Interfaces/IDowntimeModel';
import { and, eq } from 'drizzle-orm';
import { DowntimeQuery, DowntimeQueryBuilder } from './utils';
import { downtimeSelection, DowntimeType } from './types';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';

export class DowntimeModel implements IDowntimeModel {
  async create(newDowntime: NewDowntime): Promise<DowntimeType | null> {
    const [createdDowntime] = await db.insert(downtime).values(newDowntime).returning();
    const query: DowntimeQuery = {
      id_sender: createdDowntime.id_sender,
      id_receiver: createdDowntime.id_receiver,
      id_equipment: createdDowntime.id_equipment,
      date: createdDowntime.date,
      id_dep_receiver: createdDowntime.id_dep_receiver
    };
    return await this.getById(query);
  }

  async delete(keys: DowntimeQuery): Promise<void> {
    const filter = DowntimeQueryBuilder(keys);
    await db.delete(downtime).where(and(...filter));
  }

  async getAll(): Promise<DowntimeType[]> {
    return db
      .select(downtimeSelection)
      .from(downtime)
      .innerJoin(alias(user, 'sender'), eq(downtime.id_sender, alias(user, 'sender').id))
      .innerJoin(alias(user, 'receiver'), eq(downtime.id_receiver, alias(user, 'receiver').id))
      .innerJoin(equipment, eq(downtime.id_equipment, equipment.id))
      .innerJoin(department, eq(downtime.id_dep_receiver, department.id));
  }

  async getById(keys: DowntimeQuery): Promise<DowntimeType | null> {
    const filter = DowntimeQueryBuilder(keys);
    const [resultDowntime] = await db
      .select(downtimeSelection)
      .from(downtime)
      .innerJoin(alias(user, 'sender'), eq(downtime.id_sender, alias(user, 'sender').id))
      .innerJoin(alias(user, 'receiver'), eq(downtime.id_receiver, alias(user, 'receiver').id))
      .innerJoin(equipment, eq(downtime.id_equipment, equipment.id))
      .innerJoin(department, eq(downtime.id_dep_receiver, department.id))
      .where(and(...filter))
      .limit(1);
    return resultDowntime;
  }

  async update(keys: DowntimeQuery, downtimeData: Partial<Downtime>): Promise<DowntimeType | null> {
    const filter = DowntimeQueryBuilder(keys);
    const [updatedDowntime] = await db
      .update(downtime)
      .set(downtimeData)
      .where(and(...filter))
      .returning();
    const query: DowntimeQuery = {
      id_sender: updatedDowntime.id_sender,
      id_receiver: updatedDowntime.id_receiver,
      id_equipment: updatedDowntime.id_equipment,
      date: updatedDowntime.date,
      id_dep_receiver: updatedDowntime.id_dep_receiver
    };
    return await this.getById(query);
  }
}

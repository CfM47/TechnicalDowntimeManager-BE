import { db } from '../../db/config/db_connect';
import { and, SQL } from 'drizzle-orm';
import { NewDepartment, Department, department } from '../../db/schemas/department';
import { IDepartmentModel } from '../Interfaces/IDepartmentModel';

export class DepartmentModel implements IDepartmentModel {
  async create(newDepartment: NewDepartment): Promise<Department> {
    const [createdDepartment] = await db
      .insert(department)
      .values(newDepartment)
      .returning();
    return createdDepartment;
  }
  async delete(keys : SQL[]): Promise<void> {
    await db.delete(department).where(and(...keys));
  }

  async getAll(): Promise<Department[]> {
    return db.select().from(department);
  }

  async getById(keys : SQL[]): Promise<Department | null> {
    const resultDepartment = await db
      .select()
      .from(department)
      .where(and(...keys))
      .limit(1);
    return resultDepartment[0];
  }

  async update(keys : SQL[], departmentData: Partial<Department>): Promise<Department | null> {
    const updatedDepartment = await db
      .update(department)
      .set(departmentData)
      .where(and(...keys))
      .returning();
    return updatedDepartment[0];
  }
}
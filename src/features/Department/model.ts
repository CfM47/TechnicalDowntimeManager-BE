import { db } from '../../db/config/db_connect';
import { and } from 'drizzle-orm';
import { NewDepartment, Department, department } from './schema';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { DepartmentQuery, DepartmentQueryBuilder } from './utils';
import { departmentSelection, DepartmentType } from './types';
import { Pagination } from '../../utils';

export class DepartmentModel implements IDepartmentModel {
  async create(newDepartment: NewDepartment): Promise<DepartmentType> {
    const [createdDepartment] = await db.insert(department).values(newDepartment).returning();
    return createdDepartment;
  }
  async delete(keys: DepartmentQuery): Promise<void> {
    const filter = DepartmentQueryBuilder(keys);
    await db.delete(department).where(and(...filter));
  }

  async getAll(filter: DepartmentQuery, pagination: Pagination): Promise<DepartmentType[]> {
    return db
      .select()
      .from(department)
      .where(and(...DepartmentQueryBuilder(filter)))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
  }

  async getById(keys: DepartmentQuery): Promise<DepartmentType | null> {
    const filter = DepartmentQueryBuilder(keys);
    const [resultDepartment] = await db
      .select(departmentSelection)
      .from(department)
      .where(and(...filter))
      .limit(1);
    return resultDepartment;
  }

  async update(
    keys: DepartmentQuery,
    departmentData: Partial<Department>
  ): Promise<DepartmentType | null> {
    const filter = DepartmentQueryBuilder(keys);
    const [updatedDepartment] = await db
      .update(department)
      .set(departmentData)
      .where(and(...filter))
      .returning();
    return updatedDepartment;
  }
}

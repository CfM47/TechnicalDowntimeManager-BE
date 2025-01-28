import { db } from '../../db/config/db_connect';
import { and } from 'drizzle-orm';
import { NewDepartment, Department, department } from './schema';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { DepartmentQuery, DepartmentQueryBuilder } from './utils';
import { departmentSelection, DepartmentType } from './types';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';

/**
 * Model class for handling CRUD operations on the Department entity.
 */
export class DepartmentModel implements IDepartmentModel {
  /**
   * Creates a new department.
   *
   * @param newDepartment - The data for the new department.
   * @returns The created department.
   */
  async create(newDepartment: NewDepartment): Promise<DepartmentType> {
    const [createdDepartment] = await db.insert(department).values(newDepartment).returning();
    return createdDepartment;
  }
  /**
   * Deletes a department based on the provided keys.
   *
   * @param keys - The query object containing the keys to identify the department.
   */
  async delete(keys: DepartmentQuery): Promise<void> {
    const filter = DepartmentQueryBuilder(keys);
    await db.delete(department).where(and(...filter));
  }

  /**
   * Retrieves all departments based on the provided filter.
   *
   * @param filter - The query object containing filter criteria.
   * @returns An array of departments matching the filter criteria.
   */
  async getAll(
    filter: DepartmentQuery,
    pagination: Pagination
  ): Promise<PaginatedResponse<DepartmentType>> {
    const items = await db
      .select()
      .from(department)
      .where(and(...DepartmentQueryBuilder(filter)))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(department)
    };
  }

  /**
   * Retrieves a department by its ID.
   *
   * @param keys - The query object containing the ID of the department.
   * @returns The department matching the ID or null if not found.
   */
  async getById(keys: DepartmentQuery): Promise<DepartmentType | null> {
    const filter = DepartmentQueryBuilder(keys);
    const [resultDepartment] = await db
      .select(departmentSelection)
      .from(department)
      .where(and(...filter))
      .limit(1);
    return resultDepartment;
  }

  /**
   * Updates a department based on the provided keys and data.
   *
   * @param keys - The query object containing the keys to identify the department.
   * @param departmentData - The data to update the department with.
   * @returns The updated department or null if not found.
   */
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

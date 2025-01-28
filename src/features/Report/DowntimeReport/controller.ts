import { Request, Response } from 'express';
import { eq, gte, sql } from 'drizzle-orm';
import { db } from '../../../db/config/db_connect';
import { downtime } from '../../Downtime/schema';
import { equipment } from '../../Equipment/schema';
import { user } from '../../User/schema';
import { department } from '../../Department/schema';

/**
 * Controller class for handling equipment downtime report requests
 *
 * Provides methods to retrieve and format equipment downtime information
 * from various related entities including equipment, departments, and users.
 */
export class DowntimeReportController {
  /**
   * Handles GET request for equipment downtime report from the last year
   *
   * @async
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Sends JSON response with report data or error message
   * @throws {Error} Will throw an error if database query fails
   *
   * @remarks
   * Fetches downtime records from the last 365 days with related entity information.
   * Response data includes:
   * - Equipment name
   * - Downtime cause
   * - Responsible department name
   * - Receiving user name
   * - Formatted timestamp
   *
   * @example
   * Successful response format:
   * [
   *   {
   *     "equipmentName": "Generator A",
   *     "cause": "Maintenance",
   *     "departmentName": "Facilities",
   *     "receiverName": "John Doe",
   *     "downtimeDate": "2023-07-15T08:00:00.000Z"
   *   },
   *   ...
   * ]
   */
  async getLastYearEquipmentDowntime(req: Request, res: Response) {
    try {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const oneYearAgoISO = oneYearAgo.toISOString();

      const report = await db
        .select({
          equipmentName: equipment.name,
          cause: downtime.cause,
          departmentName: department.name,
          receiverName: user.name,
          downtimeDate: sql<Date>`${downtime.date}::timestamp`
        })
        .from(downtime)
        .innerJoin(equipment, eq(downtime.id_equipment, equipment.id))
        .innerJoin(user, eq(downtime.id_receiver, user.id))
        .innerJoin(department, eq(downtime.id_dep_receiver, department.id))
        .where(gte(downtime.date, oneYearAgoISO))
        .orderBy(sql`${downtime.date} DESC`);

      res.json(report);
    } catch (error) {
      console.error('Error fetching downtime report:', error);
      res.status(500).json({ message: 'Failed to fetch downtime report' });
    }
  }
}

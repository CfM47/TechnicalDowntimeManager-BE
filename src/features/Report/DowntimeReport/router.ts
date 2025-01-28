import { Router } from 'express';
import { DowntimeReportController } from './controller';

/**
 * Creates and configures the downtime report router with associated routes.
 *
 * This router handles equipment downtime reporting features, providing endpoints
 * for accessing historical downtime data. It uses existing database schemas through
 * Drizzle ORM and does not require separate models.
 *
 * @returns {Router} Express router configured with downtime report endpoints
 *
 * @route GET /downtime-last-year
 * @description Retrieves equipment downtime records from the last year, including
 *              cause, receiving department, and responsible user
 * @produces application/json
 * @response {EquipmentDowntimeReport[]} 200 - Array of downtime records
 * @response {ErrorResponse} 500 - Server error response
 */
export const downtimeReportRouter = () => {
  const router = Router();
  const controller = new DowntimeReportController();

  // Register routes
  router.get('/downtime-last-year', controller.getLastYearEquipmentDowntime);

  return router;
};

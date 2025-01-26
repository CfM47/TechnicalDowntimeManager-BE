import { Router } from 'express';
import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { MaintenanceController } from './controller';


/**
 * @swagger
 * tags:
 *   name: Maintenance
 *   description: Maintenance management
 */

/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     tags: [Maintenance]
 *     summary: Create a new maintenance record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       201:
 *         description: Maintenance record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     tags: [Maintenance]
 *     summary: Get all maintenance records
 *     responses:
 *       200:
 *         description: List of all maintenance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Maintenance'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/maintenance/{id_technician}/{id_equipment}/{date}:
 *   get:
 *     tags: [Maintenance]
 *     summary: Get a maintenance record by ID
 *     parameters:
 *       - name: id_technician
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *       - name: id_equipment
 *         in: path
 *         required: true
 *         description: ID of the equipment
 *         schema:
 *           type: string
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date of the maintenance
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Maintenance record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     tags: [Maintenance]
 *     summary: Update a maintenance record by ID
 *     parameters:
 *       - name: id_technician
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *       - name: id_equipment
 *         in: path
 *         required: true
 *         description: ID of the equipment
 *         schema:
 *           type: string
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date of the maintenance
 *         schema:
 *           type: string
 *           format: date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags: [Maintenance]
 *     summary: Delete a maintenance record by ID
 *     parameters:
 *       - name: id_technician
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *       - name: id_equipment
 *         in: path
 *         required: true
 *         description: ID of the equipment
 *         schema:
 *           type: string
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date of the maintenance
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * components:
 *   responses:
 *     Unauthorized:
 *       description: "(Unauthorized) No hay autorización para llamar al servicio."
 *     NotFound:
 *       description: "(NotFound) No se encontró la información."
 *     BadRequest:
 *       description: "(BadRequest) Los datos enviados son incorrectos."
 *     ServerError:
 *       description: "(ServerError) Error en el servidor."
 *   schemas:
 *     Maintenance:
 *       type: object
 *       properties:
 *         id_technician:
 *           type: string
 *           description: ID of the technician.
 *         id_equipment:
 *           type: string
 *           description: ID of the equipment.
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the maintenance.
 *         cost:
 *           type: number
 *           description: Cost of the maintenance.
 *         type:
 *            type: string
 *            description: Type of maintenance.
 */

/**
 * Creates a router for maintenance-related routes.
 *
 * This function sets up the routes for creating, retrieving, updating, and deleting maintenance records.
 *
 * @param maintenanceModel - The model used for maintenance operations.
 * @returns The configured router.
 */
export const maintenanceRouter = (maintenanceModel: IMaintenanceModel) => {
  const router = Router();

  const maintenanceController = new MaintenanceController(maintenanceModel);

  router.route('/').post(maintenanceController.create).get(maintenanceController.getAll);

  router
    .route('/:id_technician/:id_equipment/:date')
    .get(maintenanceController.getById)
    .put(maintenanceController.update)
    .delete(maintenanceController.delete);

  return router;
};

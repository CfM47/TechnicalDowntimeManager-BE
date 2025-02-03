import { Router } from 'express';
import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { EquipmentController } from './controller';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     tags: [Equipment]
 *     summary: Create a new equipment record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: Equipment record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     tags: [Equipment]
 *     summary: Get all equipment records
 *     responses:
 *       200:
 *         description: List of all equipment records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * /api/equipment/{id}:
 *   get:
 *     tags: [Equipment]
 *     summary: Get an equipment record by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the equipment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipment record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     tags: [Equipment]
 *     summary: Update an equipment record by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the equipment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: Equipment record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags: [Equipment]
 *     summary: Delete an equipment record by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the equipment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipment record deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
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
 *     Equipment:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the equipment.
 *         type:
 *           type: string
 *           description: Type of the equipment.
 *         status:
 *           type: string
 *           description: Status of the equipment.
 *         id_department:
 *           type: string
 *           description: ID of the department.
 *
 */

/**
 * Creates and configures an equipment router.
 *
 * This router defines the API endpoints related to equipment management
 * and interacts with the EquipmentController to handle the respective
 * HTTP requests. The routes are configured to handle operations such as
 * creating equipment, fetching all equipment records, retrieving specific
 * equipment by ID, updating and deleting equipment, and generating reports
 * associated with equipment maintenance.
 *
 * @param {IEquipmentModel} equipmentModel - The model instance for accessing and managing equipment data.
 * @param {IDepartmentModel} departmentModel - The model instance for accessing and managing department data.
 * @returns {Router} The configured router supporting equipment-related routes.
 */
export const equipmentRouter = (
  equipmentModel: IEquipmentModel,
  departmentModel: IDepartmentModel
) => {
  const router = Router();

  const equipmentController = new EquipmentController(equipmentModel, departmentModel);

  router.route('/').post(equipmentController.create).get(equipmentController.getAll);
  router
    .route('/maintenances-last-year')
    .get(equipmentController.getEquipmentsWithFrequentMaintenances);
  router
    .route('/maintenances-last-year/report')
    .get(equipmentController.generateReportEquipmentWithFrequentMaintenances);
  router
    .route('/:id')
    .get(equipmentController.getById)
    .put(equipmentController.update)
    .delete(equipmentController.delete);
  return router;
};

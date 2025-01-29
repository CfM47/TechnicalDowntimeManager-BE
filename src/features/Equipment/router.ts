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
 *         id:
 *           type: string
 *           description: ID of the equipment.
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
 *         acquisition_date:
 *            type: string
 *            description: Acquisition date of the equipment.
 *
 */

/**
 * Creates a router for equipment-related routes.
 *
 * This function sets up the routes for creating, retrieving, updating, and deleting
 * equipment records. It uses the provided equipment model to instantiate the controller
 * and define the route handlers.
 *
 * @param equipmentModel - The equipment model to be used by the controller.
 * @param departmentModel
 * @returns The configured router.
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
    .route('/:id')
    .get(equipmentController.getById)
    .put(equipmentController.update)
    .delete(equipmentController.delete);
  return router;
};

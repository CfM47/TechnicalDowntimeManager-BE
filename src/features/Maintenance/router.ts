import { Router } from 'express';
import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { MaintenanceController } from './controller';
import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { AuthController } from '../Auth/controller';
import { Role } from '../../enums';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { IUserModel } from '../../Interfaces/IUserModel';

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
 * @param technicianModel
 * @param equipmentModel
 * @returns The configured router.
 */
export const maintenanceRouter = (
  maintenanceModel: IMaintenanceModel,
  technicianModel: ITechnicianModel,
  equipmentModel: IEquipmentModel,
  userModel: IUserModel,
  roleModel: IRoleModel,
  resourceModel: IResourceModel,
  roleResourceModel: IRoleResourceModel
) => {
  const router = Router();

  const maintenanceController = new MaintenanceController(
    maintenanceModel,
    technicianModel,
    equipmentModel
  );

  const authController = new AuthController(userModel, roleModel, resourceModel, roleResourceModel);

  router
    .route('/')
    .post(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      maintenanceController.create
    )
    .get(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      maintenanceController.getAll
    );
  router.route('/equipment-history/report').get(maintenanceController.generateEquipmentHistory);
  router
    .route('/:id_technician/:id_equipment/:date')
    .get(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      maintenanceController.getById
    )
    .put(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      maintenanceController.update
    )
    .delete(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      maintenanceController.delete
    );

  return router;
};

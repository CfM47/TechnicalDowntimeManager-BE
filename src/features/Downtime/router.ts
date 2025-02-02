import { Router } from 'express';
import { IDowntimeModel } from '../../Interfaces/IDowntimeModel';
import { DowntimeController } from './controller';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { IUserModel } from '../../Interfaces/IUserModel';
import { AuthController } from '../Auth/controller';
import { Role } from '../../enums';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { IRoleModel } from '../../Interfaces/IRoleModel';

/**
 * @swagger
 * tags:
 *   name: Downtime
 *   description: Downtime management
 */

/**
 * @swagger
 * /api/downtime:
 *   post:
 *     tags: [Downtime]
 *     summary: Create a new downtime
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Downtime'
 *     responses:
 *       201:
 *         description: Downtime created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Downtime'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     tags: [Downtime]
 *     summary: Get all downtimes
 *     responses:
 *       200:
 *         description: List of all downtimes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Downtime'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/downtime/{id_sender}/{id_receiver}/{id_equipment}/{date}/{id_dep_receiver}:
 *   get:
 *     tags: [Downtime]
 *     summary: Get a downtime by ID
 *     parameters:
 *       - name: id_sender
 *         in: path
 *         required: true
 *         description: ID of the sender
 *         schema:
 *           type: string
 *       - name: id_receiver
 *         in: path
 *         required: true
 *         description: ID of the receiver
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
 *         description: Date of the downtime
 *         schema:
 *           type: string
 *           format: date
 *       - name: id_dep_receiver
 *         in: path
 *         required: true
 *         description: ID of the department receiver
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Downtime retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Downtime'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     tags: [Downtime]
 *     summary: Update a downtime by ID
 *     parameters:
 *       - name: id_sender
 *         in: path
 *         required: true
 *         description: ID of the sender
 *         schema:
 *           type: string
 *       - name: id_receiver
 *         in: path
 *         required: true
 *         description: ID of the receiver
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
 *         description: Date of the downtime
 *         schema:
 *           type: string
 *           format: date
 *       - name: id_dep_receiver
 *         in: path
 *         required: true
 *         description: ID of the department receiver
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Downtime'
 *     responses:
 *       200:
 *         description: Downtime updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Downtime'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags: [Downtime]
 *     summary: Delete a downtime by ID
 *     parameters:
 *       - name: id_sender
 *         in: path
 *         required: true
 *         description: ID of the sender
 *         schema:
 *           type: string
 *       - name: id_receiver
 *         in: path
 *         required: true
 *         description: ID of the receiver
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
 *         description: Date of the downtime
 *         schema:
 *           type: string
 *           format: date
 *       - name: id_dep_receiver
 *         in: path
 *         required: true
 *         description: ID of the department receiver
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Downtime deleted successfully
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
 *     Downtime:
 *       type: object
 *       properties:
 *         id_sender:
 *           type: string
 *           description: ID of the sender.
 *         id_receiver:
 *           type: string
 *           description: ID of the receiver.
 *         id_equipment:
 *           type: string
 *           description: ID of the equipment.
 *         id_dep_receiver:
 *           type: string
 *           description: ID of the department receiver.
 *         status:
 *           type: string
 *           description: Status of the downtime.
 *         cause:
 *          type: string
 *          description: Cause of the downtime.
 */

/**
 * Creates a router for downtime-related routes.
 *
 * @param downtimeModel - The model to be used by the downtime controller.
 * @param departmentModel
 * @param equipmentModel
 * @param userModel
 * @returns The configured router for downtime routes.
 */
export const downtimeRouter = (
  downtimeModel: IDowntimeModel,
  departmentModel: IDepartmentModel,
  equipmentModel: IEquipmentModel,
  userModel: IUserModel,
  roleModel: IRoleModel,
  resourceModel: IResourceModel,
  roleResourceModel: IRoleResourceModel
) => {
  const router = Router();

  const downtimeController = new DowntimeController(
    downtimeModel,
    equipmentModel,
    departmentModel,
    userModel
  );

  const authController = new AuthController(userModel, roleModel, resourceModel, roleResourceModel);

  router
    .route('/')
    .post(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      downtimeController.create
    )
    .get(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      downtimeController.getAll
    );

  router
    .route('/last-year')
    .get(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      downtimeController.getDowntimeLastYear
    );
  router.route('/last-year/report').get(downtimeController.generateReportLastYear);

  router
    .route('/:id_sender/:id_receiver/:id_equipment/:date/:id_dep_receiver')
    .get(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      downtimeController.getById
    )
    .put(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      downtimeController.update
    )
    .delete(
      authController.hasRole({ allowedRoles: [Role.admin, Role.sectionLeader, Role.technician] }),
      downtimeController.delete
    );

  return router;
};

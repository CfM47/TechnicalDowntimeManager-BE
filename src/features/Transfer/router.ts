import { Router } from 'express';
import { ITransferModel } from '../../Interfaces/ITransferModel';
import { TransferController } from './controller';
import { IUserModel } from '../../Interfaces/IUserModel';
import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';

/**
 * @swagger
 * tags:
 *   name: Transfer
 *   description: Transfer management
 */

/**
 * @swagger
 * /api/transfer:
 *   post:
 *     tags: [Transfer]
 *     summary: Create a new transfer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BodyTransferPost'
 *     responses:
 *       200:
 *         description: Transfer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessTransferPost'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     tags: [Transfer]
 *     summary: Get all transfers
 *     responses:
 *       200:
 *         description: List of transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransferByIdResponse'
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
 * /api/transfer/{id_sender}/{id_receiver}/{id_equipment}/{date}/{id_origin_dep}/{id_receiver_dep}:
 *   get:
 *     tags: [Transfer]
 *     summary: Get a transfer by ID
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
 *         description: Date of the transfer
 *         schema:
 *           type: string
 *       - name: id_origin_dep
 *         in: path
 *         required: true
 *         description: ID of the origin department
 *         schema:
 *           type: string
 *       - name: id_receiver_dep
 *         in: path
 *         required: true
 *         description: ID of the receiver department
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transfer information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransferByIdResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     tags: [Transfer]
 *     summary: Update a transfer by ID
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
 *         description: Date of the transfer
 *         schema:
 *           type: string
 *       - name: id_origin_dep
 *         in: path
 *         required: true
 *         description: ID of the origin department
 *         schema:
 *           type: string
 *       - name: id_receiver_dep
 *         in: path
 *         required: true
 *         description: ID of the receiver department
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BodyTransferPost'
 *     responses:
 *       200:
 *         description: Transfer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessTransferPost'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags: [Transfer]
 *     summary: Delete a transfer by ID
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
 *         description: Date of the transfer
 *         schema:
 *           type: string
 *       - name: id_origin_dep
 *         in: path
 *         required: true
 *         description: ID of the origin department
 *         schema:
 *           type: string
 *       - name: id_receiver_dep
 *         in: path
 *         required: true
 *         description: ID of the receiver department
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transfer deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
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
 *     BodyTransferPost:
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
 *         id_origin_dep:
 *           type: string
 *           description: ID of the origin department.
 *         id_receiver_dep:
 *           type: string
 *           description: ID of the receiver department.
 *         status:
 *            type: string
 *            description: Status of the transfer.
 *
 *     SuccessTransferPost:
 *       type: object
 *       properties:
 *         response:
 *           type: integer
 *           enum: [1]
 *           description: Flag indicating if the service call was successful.
 *     TransferByIdResponse:
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
 *         date:
 *           type: string
 *           description: Date of the transfer.
 *         id_origin_dep:
 *           type: string
 *           description: ID of the origin department.
 *         id_receiver_dep:
 *           type: string
 *           description: ID of the receiver department.
 *         status:
 *           type: string
 *           description: Status of the downtime.
 */

/**
 * Configures and returns an express router for handling transfer-related operations.
 *
 * @function transferRouter
 * @param {ITransferModel} transferModel - The model responsible for handling transfer data.
 * @param {IUserModel} userModel - The model responsible for handling user data.
 * @param {IEquipmentModel} equipmentModel - The model responsible for handling equipment data.
 * @param {IDepartmentModel} departmentModel - The model responsible for handling department data.
 * @returns {Router} An express router instance, configured with routes for transfer-related operations.
 *
 * The router provides the following endpoints:
 * - POST and GET requests to `/`: Handles creation of a new transfer and retrieval of all transfers.
 * - GET request to `/equipment-record/report`: Generates and retrieves a report of equipment transfer records.
 * - GET request to `/department-record/report`: Generates and retrieves a report of department transfer records.
 * - GET, PUT, and DELETE requests to
 *   `/:id_sender/:id_receiver/:id_equipment/:date/:id_origin_dep/:id_receiver_dep`:
 *   Handles retrieval, update, and deletion of a specific transfer record using various identifiers.
 */
export const transferRouter = (
  transferModel: ITransferModel,
  userModel: IUserModel,
  equipmentModel: IEquipmentModel,
  departmentModel: IDepartmentModel
) => {
  const router = Router();

  const transferController = new TransferController(
    transferModel,
    userModel,
    equipmentModel,
    departmentModel
  );

  router.route('/').post(transferController.create).get(transferController.getAll);
  router.route('/equipment-record/report').get(transferController.generateEquipmentTransferRecord);
  router
    .route('/department-record/report')
    .get(transferController.generateDepartmentTransferRecord);
  router
    .route('/:id_sender/:id_receiver/:id_equipment/:date/:id_origin_dep/:id_receiver_dep')
    .get(transferController.getById)
    .put(transferController.update)
    .delete(transferController.delete);

  return router;
};

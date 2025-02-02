import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { TechnicianController } from './controller';

/**
 * @swagger
 * tags:
 *   name: Technician
 *   description: Technician management
 */

/**
 * @swagger
 * /api/technician:
 *   post:
 *     tags: [Technician]
 *     summary: Create a new technician
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Technician'
 *     responses:
 *       201:
 *         description: Technician created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technician'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     tags: [Technician]
 *     summary: Get all technicians
 *     responses:
 *       200:
 *         description: List of all technicians
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Technician'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/technician/{id}:
 *   get:
 *     tags: [Technician]
 *     summary: Get a technician by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Technician retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technician'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     tags: [Technician]
 *     summary: Update a technician by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Technician'
 *     responses:
 *       200:
 *         description: Technician updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technician'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags: [Technician]
 *     summary: Delete a technician by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Technician deleted successfully
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
 *     Technician:
 *       type: object
 *       properties:
 *         id_user:
 *           type: string
 *           description: ID of the technician.
 *         exp_years:
 *           type: number
 *           description: Experience of the technician.
 *         specialty:
 *           type: string
 *           description: Specialty of the technician.
 */

/**
 * Creates and configures the technician router.
 *
 * @param technicianModel - The technician model to interact with the database.
 * @param userModel - The user model to interact with the database.
 * @returns The configured router for technician routes.
 */
export const technicianRouter = (technicianModel: ITechnicianModel, userModel: IUserModel) => {
  const router = Router();

  const technicianController = new TechnicianController(userModel, technicianModel);

  router.route('/').post(technicianController.create).get(technicianController.getAll);
  router.route('/performance').get(technicianController.getTechniciansPerformance);
  router
    .route('/:id')
    .get(technicianController.getById)
    .put(technicianController.update)
    .delete(technicianController.delete);

  return router;
};

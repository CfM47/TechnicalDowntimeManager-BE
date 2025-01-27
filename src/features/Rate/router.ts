import { Router } from 'express';
import { IRateModel } from '../../Interfaces/IRateModel';
import { RateController } from './controller';
import { IUserModel } from '../../Interfaces/IUserModel';

/**
 * @swagger
 * tags:
 *   name: Rate
 *   description: Rate management
 */

/**
 * @swagger
 * /api/rate:
 *   post:
 *     tags: [Rate]
 *     summary: Create a new rate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rate'
 *     responses:
 *       201:
 *         description: Rate created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rate'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     tags: [Rate]
 *     summary: Get all rates
 *     responses:
 *       200:
 *         description: List of all rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rate'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/rate/{id_technician}/{id_user}/{date}:
 *   get:
 *     tags: [Rate]
 *     summary: Get a rate by ID
 *     parameters:
 *       - name: id_technician
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *       - name: id_user
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date of the rate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Rate retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rate'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     tags: [Rate]
 *     summary: Update a rate by ID
 *     parameters:
 *       - name: id_technician
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *       - name: id_user
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date of the rate
 *         schema:
 *           type: string
 *           format: date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rate'
 *     responses:
 *       200:
 *         description: Rate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rate'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags: [Rate]
 *     summary: Delete a rate by ID
 *     parameters:
 *       - name: id_technician
 *         in: path
 *         required: true
 *         description: ID of the technician
 *         schema:
 *           type: string
 *       - name: id_user
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date of the rate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Rate deleted successfully
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
 *     Rate:
 *       type: object
 *       properties:
 *         id_technician:
 *           type: string
 *           description: ID of the technician.
 *         id_user:
 *           type: string
 *           description: ID of the user.
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the rate.
 *         comment:
 *           type: string
 *           description: Comments about the rate.
 *         score:
 *           type: number
 *           description: Rating value.
 */

/**
 * Creates a router for handling rate-related routes.
 *
 * @param rateModel - The model instance for interacting with rate data.
 * @param userModel - The model instance for interacting with user data.
 * @returns An Express router configured with rate routes.
 */
export const rateRouter = (rateModel: IRateModel, userModel: IUserModel) => {
  const router = Router();
  const rateController = new RateController(rateModel, userModel);
  router.route('/').post(rateController.create).get(rateController.getAll);
  router
    .route('/:id_technician/:id_user/:date')
    .get(rateController.getById)
    .put(rateController.update)
    .delete(rateController.delete);
  return router;
};

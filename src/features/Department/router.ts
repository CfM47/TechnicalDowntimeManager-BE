import { Router } from 'express';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { DepartmentController } from './controller';

/**
 * @swagger
 * tags:
 *   name: Department
 *   description: Department management
 */

/**
 * @swagger
 * /api/department:
 *   post:
 *     tags: [Department]
 *     summary: Create a new department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       201:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     tags: [Department]
 *     summary: Get all departments
 *     responses:
 *       200:
 *         description: Departments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * /api/department/{id}:
 *   get:
 *     tags: [Department]
 *     summary: Get a department by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the department
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     tags: [Department]
 *     summary: Update a department by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the department
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags: [Department]
 *     summary: Delete a department by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the department
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department deleted successfully
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
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the department.
 *         name:
 *           type: string
 *           description: Name of the department.
 */

/**
 * Sets up the router for department-related routes.
 *
 * @param departmentModel - The model instance for department operations.
 * @returns The configured router.
 */
export const departmentRouter = (departmentModel: IDepartmentModel) => {
  const router = Router();

  const departmentController = new DepartmentController(departmentModel);

  router.route('/').post(departmentController.create).get(departmentController.getAll);
  router
    .route('/:id')
    .get(departmentController.getById)
    .put(departmentController.update)
    .delete(departmentController.delete);
  return router;
};

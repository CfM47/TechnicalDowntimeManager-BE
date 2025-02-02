import { Router } from 'express';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { RoleController } from './controller';
import { AuthController } from '../Auth/controller';
import { IUserModel } from '../../Interfaces/IUserModel';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { Role } from '../../enums';

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role management
 */

/**
 * @swagger
 * /api/role:
 *   post:
 *     tags: [Role]
 *     summary: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     tags: [Role]
 *     summary: Get all roles
 *     responses:
 *       200:
 *         description: List of all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     tags: [Role]
 *     summary: Get a role by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the role
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     tags: [Role]
 *     summary: Update a role by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the role
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags: [Role]
 *     summary: Delete a role by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the role
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
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
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the role.
 *         name:
 *           type: string
 *           description: Name of the role.
 */

export const roleRouter = (
  roleModel: IRoleModel,
  userModel: IUserModel,
  resourceModel: IResourceModel,
  roleResourceModel: IRoleResourceModel
) => {
  const router = Router();

  const roleController = new RoleController(roleModel);
  const authController = new AuthController(userModel, roleModel, resourceModel, roleResourceModel);

  router
    .route('/')
    .post(authController.hasRole({ allowedRoles: [Role.admin] }), roleController.create)
    .get(roleController.getAll);
  router
    .route('/:id')
    .get(roleController.getById)
    .put(authController.hasRole({ allowedRoles: [Role.admin] }), roleController.update)
    .delete(authController.hasRole({ allowedRoles: [Role.admin] }), roleController.delete);
  return router;
};

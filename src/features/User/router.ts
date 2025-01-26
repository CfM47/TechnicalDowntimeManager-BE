import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { UserController } from './controller';

// /**
//  * @swagger
//  * tags:
//  *   name: User
//  *   description: User management
//  */
//
// /**
//  * @swagger
//  * /api/user:
//  *   post:
//  *     tags: [User]
//  *     summary: Create a new user
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/BodyUsersPost'
//  *     responses:
//  *       200:
//  *         description: User created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/SuccessUserPost'
//  *       400:
//  *         $ref: '#/components/responses/BadRequest'
//  *       401:
//  *         $ref: '#/components/responses/Unauthorized'
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  *   get:
//  *     tags: [User]
//  *     summary: Get all users
//  *     responses:
//  *       200:
//  *         description: List of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/UserByIdResponse'
//  *       400:
//  *         $ref: '#/components/responses/BadRequest'
//  *       401:
//  *         $ref: '#/components/responses/Unauthorized'
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  */
//
// /**
//  * @swagger
//  * /api/user/{id}:
//  *   get:
//  *     tags: [User]
//  *     summary: Get a user by ID
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: Unique ID of the user
//  *         schema:
//  *           type: string
//  *           example: 222
//  *     responses:
//  *       200:
//  *         description: User information retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/UserByIdResponse'
//  *       400:
//  *         $ref: '#/components/responses/BadRequest'
//  *       401:
//  *         $ref: '#/components/responses/Unauthorized'
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  *   put:
//  *     tags: [User]
//  *     summary: Update a user by ID
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: Unique ID of the user
//  *         schema:
//  *           type: string
//  *           example: 222
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/BodyUsersPost'
//  *     responses:
//  *       200:
//  *         description: User updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/SuccessUserPost'
//  *       400:
//  *         $ref: '#/components/responses/BadRequest'
//  *       401:
//  *         $ref: '#/components/responses/Unauthorized'
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  *   delete:
//  *     tags: [User]
//  *     summary: Delete a user by ID
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: Unique ID of the user
//  *         schema:
//  *           type: string
//  *           example: 222
//  *     responses:
//  *       200:
//  *         description: User deleted successfully
//  *       400:
//  *         $ref: '#/components/responses/BadRequest'
//  *       401:
//  *         $ref: '#/components/responses/Unauthorized'
//  *       404:
//  *         $ref: '#/components/responses/NotFound'
//  *       500:
//  *         $ref: '#/components/responses/ServerError'
//  *
//  * components:
//  *   responses:
//  *     Unauthorized:
//  *       description: "(Unauthorized) No hay autorización para llamar al servicio."
//  *     NotFound:
//  *       description: "(NotFound) No se encontró la información."
//  *     BadRequest:
//  *       description: "(BadRequest) Los datos enviados son incorrectos."
//  *     ServerError:
//  *       description: "(ServerError) Error en el servidor."
//  *   schemas:
//  *     BodyUsersPost:
//  *       type: object
//  *       properties:
//  *         name:
//  *           type: string
//  *           description: Nombre del usuario.
//  *         password:
//  *           type: string
//  *           description: Contraseña del usuario.
//  *         id_role:
//  *           type: number
//  *           description: Rol del usuario.
//  *         id_department:
//  *           type: string
//  *           description: Departamento del usuario.
//  *     SuccessUserPost:
//  *       type: object
//  *       properties:
//  *         response:
//  *           type: integer
//  *           enum: [1]
//  *           description: Bandera que indica si la llamada al servicio fue exitosa.
//  *         id_user:
//  *           type: string
//  *           description: ID que le corresponde al usuario.
//  *           example: 222
//  *     UserByIdResponse:
//  *       type: object
//  *       properties:
//  *         id_user:
//  *           type: integer
//  *           description: ID único del usuario.
//  *         name:
//  *           type: string
//  *           description: Nombre del usuario.
//  *         id_role:
//  *           type: number
//  *           description: Rol asociado al usuario.
//  *         id_department:
//  *           type: string
//  *           description: Departamento del usuario.
//  */

/**
 * Creates a router for user-related routes.
 * @param userModel - The user model to interact with the database.
 * @returns An Express router with user routes.
 */
export const userRouter = (userModel: IUserModel) => {
  const router = Router();

  const userController = new UserController(userModel);

  router.route('/').post(userController.create).get(userController.getAll);
  router
    .route('/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.delete);
  return router;
};

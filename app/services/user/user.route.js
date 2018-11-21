const userService = require('./user.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {

    /**
     * @swagger
     * /users:
     *   post:
     *     tags:
     *       - Users
     *     summary: Creates a User
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - name
     *             - phone
     *             - password
     *             -  address
     *             -  cpf
     *             -  email
     *             -  role
     *           properties:
     *             name:
     *               type: string
     *             phone:
     *               type: string
     *             password:
     *               type: string
     *             cpf:
     *               type: string
     *             email:
     *               type: string
     *             role:
     *               type: string
     *             cnpj:
     *               type: string

     *           example: {
     *               "name": "C. Auguste Dupin",
     *               "phone": "(87) 3635-3232",
     *               "address": "Somewhere in Paris, France :)",
     *               "cpf": "11122233243",
     *               "email": "augustedupin@email.com",
     *               "password": "FirstDetective!_SorrySherlock",
     *               "job": "",
     *               "role": "ADMIN",
     *               "cnpj":"14.274.411/0001-80"
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Users
     *             example: {
     *               "Location": "/users/secret"
     *             }
     *       default:
     *         description: Error creating User
     */
    app.post('/' , async (req, res) => {
        try {
            const User = await userService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });

    /**
     * @swagger
     * /users:
     *   get:
     *     tags:
     *        - Users
     *     summary: Get all users
     *     consumes:
     *        - application/json
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: array
     *           items:
     *             properties:
     *               id:
     *                 type: integer
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example: [
     *            {
     *               "id": 1,
     *               "name": "C. Auguste Dupin",
     *               "phone": "(87) 3635-3232",
     *               "address": "string",
     *               "cpf": "string",
     *               "email": "string@string.string",
     *               "password": "$2a$10$2xXep.U1UtMBHjg3MMAheOej1izNFQDW1zsvOm4sww2rWUfPFVUm6",
     *               "job": "",
     *               "role": "ADMIN",
     *                "cnpj":"14.274.411/0001-80",
     *                "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *            },
     *            {
     *               "id": 2,
     *               "name": "a",
     *               "phone": "(83) 99984-3625",
     *               "address": "a",
     *               "cpf": "a",
     *               "email": "a@a.a",
     *               "password": "$2a$10$2xXep.U1UtMBHjg3MMAheOej1izNFQDW1zsvOm4sww2rWUfPFVUm6",
     *               "job": "janitor",
     *               "role": "STAFF",
     *               "cnpj":"14.274.411/0001-80",
     *               "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *            }
     *           ]
     */
    app.get('/'  ,  async (req, res) => {
        const User = await userService.showAllAsync();
        if (!User) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(User);

    });

    /**
     * @swagger
     * /users/{cpf}:
     *   get:
     *     tags:
     *       - Users
     *     summary: Get a User by CPF
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: cpf
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: body
     *           items:
     *             properties:
     *               id:
     *                 type: integer
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:cpf'  ,async (req, res) => {
        const cpf = req.params.cpf;
        const User = await userService.showAsync(cpf);
        if (!User) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(User);
    });

    /**
     * @swagger
     * /users/login:
     *   post:
     *     tags:
     *       - Users
     *     summary: Login a User
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - email
     *             - password
     *           properties:
     *             email:
     *               type: string
     *             password:
     *               type: string
     *           example: {
     *             "email": "augustedupin@email.com",
     *             "password": "FirstDetective!_SorrySherlock"
     *           }
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: Object
     *           properties:
     *             id:
     *               type: integer
     *             name:
     *               type: string
     *             email:
     *               type: string
     *             createdAt:
     *               type: date
     *             updatedAt:
     *               type: date
     *           example: {
     *             "id": 1,
     *             "name": "string",
     *             "email": "string@string.string",
     *             "createdAt": "2018-01-02T20:14:22.527Z",
     *             "updatedAt": "2018-01-02T20:14:22.527Z"
     *           }
     *       404:
     *         description: Not Found
     */

    app.post('/login', async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const User = await userService.verifyCredentialsAsync(email, password);
        if (!User) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        // const token = jsonWebToken.generateToken(User.id);
        // res.set('authorization', token);
        // delete User.dataValues.password;
        // res.status(HttpStatusCodes.OK).json(User);
        const token = jsonWebToken.generateToken(User.id);
        User.dataValues.token = token;
        delete User.dataValues.password;
        res.status(HttpStatusCodes.OK).json(User);
    });

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     tags:
     *       - Users
     *     summary: Delete an User
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *     consumes:
     *       - application/json
     *     responses:
     *       200:
     *         description: OK
     *       404:
     *         description: User not found
     */

    app.delete('/:id'  ,
        async (req, res) => {
            const id = req.params.id;
            let result = await userService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });
};
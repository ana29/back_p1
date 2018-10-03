const condominiumService = require('./condominium.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app) => {

    /**
     * @swagger
     * /condominiums:
     *   post:
     *     tags:
     *       - Condominiums
     *     summary: Creates a condominium
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
     *             - cnpj
     *             - password
     *             -  email_admin
     *           properties:
     *             name:
     *               type: string
     *             email:
     *               type: string
     *             password:
     *               type: string
     *             email_admin:
     *               type: string
     *           example: {
     *              "name": "string",
     *              "cnpj":"string",
     *              "password":"string",
     *              "address": "string",
     *              "phone": "string",
     *              "name_admin": "string",
     *              "cpf_admin": "string",
     *              "email_admin": "string@string.string",
     *               "permission": 0
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Condominiums
     *             example: {
     *               "Location": "/condominiums/secret"
     *             }
     *       default:
     *         description: Error creating Condominium
     */
    app.post('/', async (req, res) => {
        try {
            const condominium = await condominiumService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });

    /**
     * @swagger
     * /condominiums:
     *   get:
     *     tags:
     *        - Condominiums
     *     summary: Get all condominiums
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
     *               registration:
     *                 type: string
     *               gender:
     *                 type: string
     *               type:
     *                 type: string
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example: [
     *            {
     *               "id": 1,
     *               "name": "string",
     *               "cnpj": "string",
     *               "password": "$2a$10$0M7kko3re9RFFxE946r/ZODRh4WM.pAaiVvSk.gU4z.HfFgjCD4F6",
     *               "phone": "sssss",
     *               "address": "string",
     *               "name_admin": "string",
     *               "cpf_admin": "string",
     *               "email_admin": "string",
     *               "createdAt": "2018-09-27T15:51:11.600Z",
     *               "updatedAt": "2018-09-27T15:51:11.600Z"
     *           },
     *            {
     *               "id": 2,
     *               "name": "a",
     *               "cnpj": "a",
     *               "password": "$2a$10$2xXep.U1UtMBHjg3MMAheOej1izNFQDW1zsvOm4sww2rWUfPFVUm6",
     *               "phone": "a",
     *               "address": "a",
     *               "name_admin": "a",
     *               "cpf_admin": "a",
     *               "email_admin": "a",
     *               "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *           }
     *           ]
     */
    app.get('/', async (req, res) => {
        const condominium = await condominiumService.showAllAsync();
        if (!condominium) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(condominium);

    });

    /**
     * @swagger
     * /condominiums/{cnpj}:
     *   get:
     *     tags:
     *       - Condominiums
     *     summary: Get a condominium by CNPJ
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: cnpj
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
     *               registration:
     *                 type: string
     *               gender:
     *                 type: string
     *               type:
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
    app.get('/:cnpj', async (req, res) => {
        const cnpj = req.params.cnpj;
        const condominium = await condominiumService.showAsync(cnpj);
        if (!condominium) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(condominium);
    });

    /**
     * @swagger
     * /condominiums/login:
     *   post:
     *     tags:
     *       - Condominiums
     *     summary: Login a condominium admin
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
     *             "email": "string@string.string",
     *             "password": "string"
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
        const condominium = await condominiumService.verifyCredentialsAsync(email, password);
        if (!condominium) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        const token = jsonWebToken.generateToken(condominium.id);
        condominium.dataValues.token = token;
        delete condominium.dataValues.password;
        res.status(HttpStatusCodes.OK).json(condominium);
    });
};
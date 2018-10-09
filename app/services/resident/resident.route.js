const residentService = require('./resident.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app) => {
    /**
     * @swagger
     * /residents:
     *   post:
     *     tags:
     *       - Residents
     *     summary: Creates a resident
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
     *             - password
     *             - condominium_cnpj
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
     *              "name": "a",
     *              "cpf": "a",
     *              "email": "a@a.a",
     *              "password": "a",
     *              "house": "a",
     *              "phone": "a",
     *              "condominium_cnpj": "string",
     *              "permission": 10
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Resident
     *             example: {
     *               "Location": "/residents/secret"
     *             }
     *       default:
     *         description: Error creating Resident
     */
    app.post('/', async (req, res) => {
        try {
            const resident = await residentService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }

    });

    /**
     * @swagger
     * /residents:
     *   get:
     *     tags:
     *        - Residents
     *     summary: Get all residents
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
     *
     *           ]
     */
    app.get('/', async (req, res) => {
        const resident = await residentService.showAllAsync();
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);

    });

    /**
     * @swagger
     * /residents/{condominium_cnpj}:
     *   get:
     *     tags:
     *       - Residents
     *     summary: Get a residents by condominium CNPJ
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: condominium_cnpj
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: req
     *           items:
     *             properties:
     *               cnpj:
     *                 type: string
     *
     *           example:
     *             {
     *
     *             }
     */

    app.get('/:condominium_cnpj', async (req, res) => {
        const condominium_cnpj = req.params.condominium_cnpj;
        const resident = await residentService.showAllByCnpjAsync(condominium_cnpj);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);
    });

    /**
     * @swagger
     * /residents/login:
     *   post:
     *     tags:
     *       - Residents
     *     summary: Login a resident
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
     *             "email": "a@a.a",
     *             "password": "a"
     *           }
     *     responses:
     *       200:
     *         description: OK
     *         headers:
     *           token:
     *            type: string
     *            description: token auth
     *         schema:
     *           type: Object
     *           properties:
     *             token:
     *               type: string
     *           example: {
     *             "authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.KnEu3gcxllBIxfmOrkWjMPBF06exTeLDURXcFqN6gUw"
     *           }
     *       default:
     *         description: Error creating resident
     */
    app.post('/login', async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const resident = await residentService.verifyCredentialsAsync(email, password);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        const token = jsonWebToken.generateToken(resident.id);
        resident.dataValues.token = token;
        delete resident.dataValues.password;
        res.status(HttpStatusCodes.OK).json(resident);
    });
};

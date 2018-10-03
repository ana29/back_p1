const staffService = require('./staff.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app) => {
    /**
     * @swagger
     * /staff:
     *   post:
     *     tags:
     *       - Staff
     *     summary: Creates a staff
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
     *              "phone": "a",
     *              "condominium_cnpj": "string",
     *              "permission": 5
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
     *               "Location": "/staff/secret"
     *             }
     *       default:
     *         description: Error creating Resident
     */
    app.post('/', async (req, res) => {
        try {
            const staff = await staffService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            console.log(err);
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }

    });

    /**
     * @swagger
     * /staff:
     *   get:
     *     tags:
     *        - Staff
     *     summary: Get all staff
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
        const staff = await staffService.showAllAsync();
        if (!staff) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(staff);

    });

    /**
     * @swagger
     * /staff/{condominium_cnpj}:
     *   get:
     *     tags:
     *       - Staff
     *     summary: Get a staff by condominium CNPJ
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
     *               cnpj:
     *                 type: integer
     *
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:condominium_cnpj', async (req, res) => {
        const condominium_cnpj = req.params.condominium_cnpj;
        const resident = await staffService.showAllByCnpjAsync(condominium_cnpj);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);
    });

    /**
     * @swagger
     * /staff/login:
     *   post:
     *     tags:
     *       - Staff
     *     summary: Login a staff
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
     *         description: Error creating staff
     */
    app.post('/login', async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const staff = await staffService.verifyCredentialsAsync(email, password);
        if (!staff) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        const token = jsonWebToken.generateToken(staff.id);
        staff.dataValues.token = token;
        delete staff.dataValues.password;
        res.status(HttpStatusCodes.OK).json(staff);
    });

};

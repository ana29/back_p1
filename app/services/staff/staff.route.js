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
     *             description: Endpoint to get the created Staff
     *             example: {
     *               "Location": "/staff/secret"
     *             }
     *       default:
     *         description: Error creating Staff
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
        const resident = await staffService.showAllByCnpjAsync(condominium_cnpj);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);
    });

};

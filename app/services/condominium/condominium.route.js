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
     *     summary: Creates a Condominium
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

    app.get('/', async (req, res) => {
        const condominium = await condominiumService.showAllAsync();
        if (!condominium) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(condominium);

    });

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
        const cnpj = req.body.email;
        const password = req.body.password;
        const resident = await condominiumService.verifyCredentialsAsync(cnpj, password);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        const token = jsonWebToken.generateToken(resident.id);
        res.set('Authorization', token);
        delete resident.dataValues.password;
        res.status(HttpStatusCodes.OK).json(resident);
    });

};

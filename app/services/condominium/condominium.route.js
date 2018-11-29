const condominiumService = require('./condominium.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {

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
     *             - phone
     *             -  address
     *           properties:
     *             name:
     *               type: string
     *             cnpj:
     *               type: string
     *             phone:
     *               type: string
     *             address:
     *               type: string
     *           example: {
     *              "name": "NEVER MORE CONDOMINIUM",
     *              "cnpj":"14.274.411/0001-80",
     *              "phone": "(87) 99100-0909",
     *              "address": "Morgue Street, 666, Paris, France ",
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
     *               cnpj:
     *                 type: string
     *               phone:
     *                 type: string
     *               address:
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
     *               "phone": "sssss",
     *               "address": "string",
     *               "createdAt": "2018-09-27T15:51:11.600Z",
     *               "updatedAt": "2018-09-27T15:51:11.600Z"
     *           },
     *            {
     *               "id": 2,
     *               "name": "a",
     *               "cnpj": "a",
     *               "phone": "a",
     *               "address": "a",
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
     *               cnpj:
     *                 type: string
     *               phone:
     *                 type: string
     *               address:
     *               type: string
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:cnpj'  , async (req, res) => {
        const cnpj = req.params.cnpj;
        const condominium = await condominiumService.showAsync(cnpj);
        if (!condominium) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(condominium);
    });

    /**
     * @swagger
     * /condominiums/{id}:
     *   delete:
     *     tags:
     *       - Condominiums
     *     summary: Delete an Condominium
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
     *         description: Condominium not found
     */

    app.delete('/:id'  ,
        async (req, res) => {
            const id = req.params.id;
            let result = await condominiumService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });
};
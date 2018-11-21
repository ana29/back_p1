const serviceService = require('./service.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {

    /**
     * @swagger
     * /services:
     *   post:
     *     tags:
     *       - Services
     *     summary: Creates a Services
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - cnpj
     *             - name
     *           properties:
     *             cnpj:
     *               type: string
     *             name:
     *               type: string
     *           example: {
     *              "name":"Private investigation",
     *              "description":"No matter the mystery, we can solve
     *                             No matter the mystery, we can solve
     *                             No matter the mystery, we can solve
     *                             No matter the mystery, we can solve
     *                             No matter the mystery, we can solve
     *                             No matter the mystery, we can solve
     *                             No matter the mystery, we can solve",
     *              "cnpj":"14.274.411/0001-80"
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Services
     *             example: {
     *               "Location": "/services/secret"
     *             }
     *       default:
     *         description: Error creating OfficeHours
     */
    app.post('/'  , async (req, res) => {
        try {
            const services = await serviceService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });


    /**
     * @swagger
     * /services/{cnpj}:
     *   get:
     *     tags:
     *       - Services
     *     summary: Get a Services by CNPJ
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
     *               cnpj:
     *                 type: string
     *               hours:
     *                 type: string
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:cnpj'  , async (req, res) => {
        const cnpj = req.params.cnpj;
        const services = await serviceService.showAsync(cnpj);
        if (!services) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(services);
    });

    /**
     * @swagger
     * /services/{id}:
     *   delete:
     *     tags:
     *       -  Services
     *     summary: Delete a Service
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
     *         description: Visitor not found
     */

    app.delete('/:id'  ,
        async (req, res) => {
            const id = req.params.id;
            let result = await serviceService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });
};
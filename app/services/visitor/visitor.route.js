const visitorService= require('./Visitor.service');
const HttpStatusCodes = require('http-status-codes');

module.exports = (app) => {

    /**
     * @swagger
     * /visitors:
     *   post:
     *     tags:
     *       - Visitors
     *     summary: Creates a Visitors
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - cpf_visitor
     *             - cpf_resident
     *           properties:
     *            id:
     *               type: integer
     *            cpf_visitor:
     *               type: string
     *            cpf_resident:
     *               type: string
     *            createdAt:
     *               type: date
     *            updatedAt:
     *               type: date
     *           example: {
     *                "nome":"b",
     *                "cpf_visitor" : "b",
     *                "iterative": TRUE,
     *                "cpf_resident":"a",
     *                "expiration_date" : 2018-10-04 06:00:59,
     *                "additional_information": "Every Thursday"
     *            }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Visitor
     *             example: {
     *               "Location": "/visitors/secret"
     *             }
     *       default:
     *         description: Error creating Visitors
     */
    app.post('/', async (req, res) => {
        try {
            const visitor = await visitorService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });


    /**
     * @swagger
     * /visitors/{cpf_resident}:
     *   get:
     *     tags:
     *       - Visitors
     *     summary: Get a visitor by resident
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: cpf_resident
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: body
     *           items:
     *             properties:
     *               id:
     *                 type: integer
     *               cpf_resident:
     *                 type: string
     *               hours:
     *                 type: string
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:cpf_resident', async (req, res) => {
        const cpf_resident = req.params.cpf_resident;
        const visitor = await visitorService.showAsync(cpf_resident);
        if (!visitor) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(visitor);
    });


};
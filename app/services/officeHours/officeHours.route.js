const officeHoursService = require('./officeHours.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {
    /**
     * @swagger
     * /officeHours:
     *   post:
     *     tags:
     *       - Office Hours
     *     summary: Creates an Office Hours
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
     *             - hours
     *           properties:
     *             cnpj:
     *               type: string
     *             hours:
     *               type: string
     *           example: {
     *              "cnpj":"14.274.411/0001-80",
     *              "hours":2018-10-04 06:00:59
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Office Hours
     *             example: {
     *               "Location": "/officeHours/secret"
     *             }
     *       default:
     *         description: Error creating OfficeHours
     */
    app.post('/' , async (req, res) => {
        try {
            const officeHours = await officeHoursService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });


    /**
     * @swagger
     * /officeHours/{cnpj}:
     *   get:
     *     tags:
     *       - Office Hours
     *     summary: Get a Office Hours by CNPJ
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
    app.get('/:cnpj', async (req, res) => {
        const cnpj = req.params.cnpj;
        const officeHours = await officeHoursService.showAsync(cnpj);
        if (!officeHours) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(officeHours);
    });

    /**
     * @swagger
     * /officeHours/{id}:
     *   delete:
     *     tags:
     *       - Office Hours
     *     summary: Delete an OfficeHours
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
     *         description: OfficeHours not found
     */

    app.delete('/:id'  ,
        async (req, res) => {
            const id = req.params.id;
            let result = await officeHoursService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });
};
const staffService = require('./staff.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {

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
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example: [
     *
     *           ]
     */
    app.get('/',   async (req, res) => {
        const staff = await staffService.showAllAsync();
        if (!staff) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(staff);

    });

    /**
     * @swagger
     * /staff/{cnpj}:
     *   get:
     *     tags:
     *       - Staff
     *     summary: Get all staff by condominium CNPJ
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: cnpj
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
    app.get('/:cnpj',   async (req, res) => {
        const cnpj = req.params.cnpj;
        const staff = await staffService.showAllByCnpjAsync(cnpj);
        if (!staff) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(staff);

    });

};

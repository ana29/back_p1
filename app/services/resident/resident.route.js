const residentService = require('./resident.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {

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
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example: [
     *
     *           ]
     */
    app.get('/', jsonWebToken.authenticate,async (req, res) => {
        const resident = await residentService.showAllAsync();
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);

    });

    /**
     * @swagger
     * /residents/{cnpj}:
     *   get:
     *     tags:
     *       - Residents
     *     summary: Get a residents by condominium CNPJ
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

    app.get('/:cnpj',jsonWebToken.authenticate, async (req, res) => {
        const cnpj = req.params.cnpj;
        const resident = await residentService.showAllByCnpjAsync(cnpj);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);
    });

};

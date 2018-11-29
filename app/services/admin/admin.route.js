const adminService = require('./admin.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {

    /**
     * @swagger
     * /admins:
     *   get:
     *     tags:
     *        - Admins
     *     summary: Get all admins
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
    app.get('/' , async (req, res) => {
        const admin = await adminService.showAllAsync();
        if (!admin) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(admin);

    });

    /**
     * @swagger
     * /admins/{cnpj}:
     *   get:
     *     tags:
     *       - Admins
     *     summary: Get a admins by condominium CNPJ
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

    app.get('/:cnpj',  async (req, res) => {
        const cnpj = req.params.cnpj;
        const admin = await adminService.showAllByCnpjAsync(cnpj);
        if (!admin) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(admin);
    });

};

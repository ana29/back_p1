const placeService = require('./place.service');
const HttpStatusCodes = require('http-status-codes');

module.exports = (app) => {

    /**
     * @swagger
     * /places:
     *   post:
     *     tags:
     *       - Places
     *     summary: Creates an Places
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
     *             - place_name
     *             - about
     *             - days_booking
     *             - start_time
     *             - end_time
     *           properties:
     *             cnpj:
     *               type: string
     *             place_name:
     *               type: string
     *             about:
     *               type: string
     *             days_booking:
     *               type: string
     *             start_time:
     *               type: time
     *             end_time:
     *               type: time
     *           example: {
     *              "cnpj":"string",
     *              "place_name":"pool",
     *              "about":"pool :) ",
     *              "days_booking":"MoTuWeThFr",
     *              "start_time": 00:00:00,
     *              "end_time": 00:00:00
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Places
     *             example: {
     *               "Location": "/places/secret"
     *             }
     *       default:
     *         description: Error creating Place
     */
    app.post('/', async (req, res) => {
        try {
            const place = await placeService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });


    /**
     * @swagger
     * /places/{cnpj}:
     *   get:
     *     tags:
     *       - Places
     *     summary: Get a Places by CNPJ
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
     *              id:
     *                  type: integer
     *             cnpj:
     *               type: string
     *             place_name:
     *               type: string
     *             about:
     *               type: string
     *             days_booking:
     *               type: string
     *             start_time:
     *               type: time
     *             end_time:
     *               type: time
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:cnpj', async (req, res) => {
        const cnpj = req.params.cnpj;
        const place = await placeService.showAsync(cnpj);
        if (!place) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(place);
    });


};
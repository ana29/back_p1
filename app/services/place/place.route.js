const placeService = require('./place.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {
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
     *
     *           properties:
     *             cnpj:
     *               type: string
     *             place_name:
     *               type: string
     *             about:
     *               type: string
     *           example: {
     *              "cnpj":"14.274.411/0001-80",
     *              "place_name":" The pallid bust of Pallas just above my chamber door",
     *              "about": [
     *              0:{dia: Segunda-feira,
     *             startTime: Thu Jan 01 1970 12:00:00 GMT-0300 (Horário Padrão de Brasília),
     *             endTime: Thu Jan 01 1970 14:00:00 GMT-0300 (Horário Padrão de Brasília)},
     *              1: {dia: Segunda-feira,
     *             startTime: Thu Jan 01 1970 12:00:00 GMT-0300 (Horário Padrão de Brasília),
     *             endTime: Thu Jan 01 1970 14:00:00 GMT-0300 (Horário Padrão de Brasília)}
     *             ]
     *             }


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
    app.post('/',async (req, res) => {
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
     *
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:cnpj'  , async (req, res) => {
        const cnpj = req.params.cnpj;
        const place = await placeService.showAsync(cnpj);
        if (!place) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(place);
    });
    /**
     * @swagger
     * /places/{id}:
     *   delete:
     *     tags:
     *       - Places
     *     summary: Delete a Place
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
            let result = await placeService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });

};
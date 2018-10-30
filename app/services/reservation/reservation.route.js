const reservationService = require('./reservation.service');
const HttpStatusCodes = require('http-status-codes');

module.exports = (app) => {
    /**
     * @swagger
     * /reservations:
     *   post:
     *     tags:
     *       - Reservations
     *     summary: Creates a Reservations
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - place_id
     *             - occupied
     *             - date
     *             - time
     *           properties:
     *             place_id:
     *               type: string
     *             occupied:
     *               type: string
     *             date:
     *               type: date
     *             time:
     *               type: time
     *
     *           example: {
     *              "place_id":"1",
     *              "occupied":TRUE,
     *              "date": 2018-10-30T22:49:17.000,
     *              "time": 00:00:00
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Reservations
     *             example: {
     *               "Location": "/reservations/secret"
     *             }
     *       default:
     *         description: Error creating Place
     */
    app.post('/', async (req, res) => {
        try {
            const reservation = await reservationService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });


    /**
     * @swagger
     * /reservations/{place_id}:
     *   get:
     *     tags:
     *       - Reservations
     *     summary: Get a Reservations by place id
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: place_id
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: body
     *           items:
     *             properties:
     *              id:
     *                  type: integer
     *             place_id:
     *               type: string
     *             occupied:
     *               type: string
     *             date:
     *               type: date
     *             time:
     *               type: time
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:place_id', async (req, res) => {
        const place_id = req.params.place_id;
        const reservation = await reservationService.showAsync(place_id);
        if (!reservation) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(reservation);
    });
    /**
     * @swagger
     * /reservations/{id}:
     *   delete:
     *     tags:
     *       - Reservations
     *     summary: Delete a Reservation
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
     *         description: Reservation  not found
     */

    app.delete('/:id',
        async (req, res) => {
            const id = req.params.id;
            let result = await reservationService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });

};
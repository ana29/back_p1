const reservationService = require('./reservation.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {
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
     *             - placeId
     *             - occupied
     *             - startTime
     *             - endTime
     *           properties:
     *             placeId:
     *               type: integer
     *             residentId:
     *               type: string
     *             occupied:
     *               type: boolean
     *             startTime:
     *               type: date
     *             endTime:
     *               type: date
     *
     *           example: {
     *              "placeId":"1",
     *              "residentId":"1",
     *              "occupied":TRUE,
     *              "startTime": 2018-10-30T22:49:17.000,
     *              "endTime": 2018-10-30T22:49:17.000
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
    app.post('/',  async (req, res) => {
        try {
            const reservation = await reservationService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });

    /**
     * @swagger
     * /reservations/{placeId}:
     *   get:
     *     tags:
     *       - Reservations
     *     summary: Get a Reservations by place id
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: placeId
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: body
     *           items:
     *             properties:
     *              id:
     *                  type: integer
     *             placeId:
     *               type: integer
     *             residentId:
     *               type: string
     *             occupied:
     *               type: boolean
     *             startTime:
     *               type: date
     *             endTime:
     *               type: date
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:placeId'  , async (req, res) => {
        const placeId = req.params.placeId;
        const reservation = await reservationService.showAsync(placeId);
        if (!reservation) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(reservation);
    });

    /**
     * @swagger
     * /reservations/residents/{residentId}:
     *   get:
     *     tags:
     *       - Reservations
     *     summary: Get a Reservations by resident id
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: residentId
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: body
     *           items:
     *             properties:
     *              id:
     *               type: integer
     *             placeId:
     *               type: integer
     *             residentId:
     *               type: string
     *             occupied:
     *               type: boolean
     *             startTime:
     *               type: date
     *             endTime:
     *               type: date
     *           example:
     *             {
     *
     *             }
     */
    app.get('/residents/:residentId'  , async (req, res) => {
        const residentId = req.params.residentId;
        const reservation = await reservationService.showAsyncResidentId(residentId);
        if (!reservation) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(reservation);
    });

    /**
     * @swagger
     * /reservations:
     *   put:
     *     tags:
     *       - Reservations
     *     summary: Updates a Reservation
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: authorization
     *         in: header
     *       - name: body
     *         in: body
     *         schema:
     *           type: object
     *           properties:
     *              id:
     *               type: integer
     *              occupied:
     *               type: boolean
     *           example: {
     *             "id": 1,
     *             "occupied": TRUE
     *           }
     *     responses:
     *       204:
     *         description: NO CONTENT
     *       404:
     *         description: User not found
     *       406:
     *         description: Error updating User
     */
    app.put('/',async (req, res) => {
        try {
            const reservation = req.body;
            const id = req.body.id;
            const updatedReservation = await reservationService.updateAsync(id, reservation);

            if (!updatedReservation) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.NO_CONTENT).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).send();
        }
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

    app.delete('/:id'  ,
        async (req, res) => {
            const id = req.params.id;
            let result = await reservationService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });


    /**
     * @swagger
     * /reservations/condominium/{cnpj}:
     *   get:
     *     tags:
     *       - Reservations
     *     summary: Get all Reservations by cnpj
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
     *             placeId:
     *               type: integer
     *             residentId:
     *               type: string
     *             occupied:
     *               type: boolean
     *             startTime:
     *               type: date
     *             endTime:
     *               type: date
     *           example:
     *             {
     *
     *             }
     */
    app.get('/condominium/:cnpj', async (req, res) => {
        const cnpj = req.params.cnpj;
        const reservations = await reservationService.showAsyncByCnpj(cnpj);
        if (!reservations) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(reservations);
    });
};

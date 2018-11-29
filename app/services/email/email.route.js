const emailService = require('./email.service');
const condominiumService = require('../condominium/condominium.service');
const residentService = require('../resident/resident.service');
const HttpStatusCodes = require('http-status-codes');
const sendmail = require('sendmail')({silent: false});
const jsonWebToken = require('../../core/jsonWebToken');


module.exports = (app) => {
    /**
     * @swagger
     * /emails:
     *   post:
     *     tags:
     *       - Emails
     *     summary: Send an Email
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - condominiumId
     *             - residentId
     *             - subject
     *             - message
     *           properties:
     *             condominiumId:
     *               type: integer
     *             residentId:
     *               type: integer
     *             subject:
     *               type: string
     *             message:
     *               type: text
     *           example: {
     *              "condominiumId":1,
     *              "residentId":1,
     *              "subject":"You have an order",
     *              "message": "You have an order, attend the concierge.",
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: integer
     *             description: Endpoint to get the created Emails
     *             example: {
     *               "Location": "/emails/secret"
     *             }
     *       default:
     *         description: Error creating Place
     */
    app.post('/', async (req, res) => {
        try {
            const condominium  = await condominiumService.showAsyncById(req.body.condominiumId);
            const resident = await residentService.showAsyncById(req.body.residentId);
            const email = await emailService.createAsync(req.body);
            sendmail({
                from: 'no-reply@' + condominium.name + '.com',
                to: resident.email,
                subject: email.subject,
                text: email.message

            }, function (err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
            });
            return res.status(HttpStatusCodes.CREATED).send();


        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });

    /**
     * @swagger
     * /emails/{residentId}:
     *   get:
     *     tags:
     *       - Emails
     *     summary: Get a email by resident id
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
     *             condominiumId:
     *               type: integer
     *             residentId:
     *               type: integer
     *             subject:
     *               type: string
     *             message:
     *               type: text
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:residentId', async (req, res) => {
        const residentId = req.params.residentId;
        const email = await emailService.showAsync(residentId);
        if (!email) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        } else {

        }
        return res.json(email);
    });

    /**
     * @swagger
     * /emails/{id}:
     *   delete:
     *     tags:
     *       - Emails
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
            let result = await emailService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });

};
const announcementsService = require('./announcement.service');
const HttpStatusCodes = require('http-status-codes');

module.exports = (app) => {

    /**
     * @swagger
     * /announcements:
     *   post:
     *     tags:
     *       - Announcements
     *     summary: Creates an Announcements
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
     *             - announcement
     *           properties:
     *             cnpj:
     *               type: string
     *             announcement:
     *               type: string
     *           example: {
     *              "cnpj":"string",
     *              "announcement":"Hi :)"
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created Announcements
     *             example: {
     *               "Location": "/announcements/secret"
     *             }
     *       default:
     *         description: Error creating Announcement
     */
    app.post('/', async (req, res) => {
        try {
            const announcements = await announcementsService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });


    /**
     * @swagger
     * /announcements/{cnpj}:
     *   get:
     *     tags:
     *       - Announcements
     *     summary: Get a Announcements by CNPJ
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
     *               announcement:
     *                 type: string
     *           example:
     *             {
     *
     *             }
     */
    app.get('/:cnpj', async (req, res) => {
        const cnpj = req.params.cnpj;
        const announcements = await announcementsService.showAsync(cnpj);
        if (!announcements) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(announcements);
    });


};
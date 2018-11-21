const announcementsService = require('./announcement.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');


module.exports = (app, io) => {

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
     *              "cnpj":"14.274.411/0001-80",
     *              "announcement":" ...And the Raven, never flitting, still is sitting, still is sitting
     *                               On the pallid bust of Pallas just above my chamber door;
     *                               And his eyes have all the seeming of a demon’s that is dreaming,
     *                               And the lamp-light o’er him streaming throws his shadow on the floor;
     *                               And my soul from out that shadow that lies floating on the floor
     *                               Shall be lifted—nevermore!..."
     *              }
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
    app.post('/'  ,  async (req, res) => {

        try {
            const announcement = await announcementsService.createAsync(req.body);

            announcementsService.showAsyncById(announcement.id).then((_announcement) => {
                io.to('global').emit('announcement', _announcement);
                return res.status(HttpStatusCodes.CREATED).send();
            });

            return res.json(announcement);
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message) || global.__('announcement_post_error'));
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
    app.get('/:cnpj'  , async (req, res) => {
        const cnpj = req.params.cnpj;
        const announcements = await announcementsService.showAsync(cnpj);
        if (!announcements) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(announcements);
    });

    /**
     * @swagger
     * /announcements/{id}:
     *   delete:
     *     tags:
     *       - Announcements
     *     summary: Delete an Announcement
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
            let result = await announcementsService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });
};
const residentService = require('./resident.service');
const HttpStatusCodes = require('http-status-codes');

module.exports = (app) => {

    app.post('/', async (req, res) => {
        try {
            const resident = await residentService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }

    });


    app.get('/:email', async (req, res) => {
        const email = req.params.email;

        const resident = await residentService.showAsync(email);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);
    });
};

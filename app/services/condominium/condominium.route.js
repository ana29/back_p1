const condominiumService = require('./condominium.service');
const HttpStatusCodes = require('http-status-codes');

module.exports = (app) => {

    app.post('/', async (req, res) => {
        console.log(req.body);
        try {
            const condominium = await condominiumService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }

    });


};

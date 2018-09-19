const condominiumService = require('./condominium.service');
const HttpStatusCodes = require('http-status-codes');

module.exports = (app) => {

    app.post('/', async (req, res) => {
        try {
            const condominium = await condominiumService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }

    });


    app.get('/:cnpj', async (req, res) => {
            const cnpj = req.params.cnpj;

            const condominium = await condominiumService.showAsync(cnpj);
            if (!condominium) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.json(condominium);
    });
};

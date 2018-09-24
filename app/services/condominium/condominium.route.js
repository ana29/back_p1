const condominiumService = require('./condominium.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');


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

    app.post('/login', async (req, res) => {
        const cnpj = req.body.cnpj;
        const password = req.body.password;
        const resident = await condominiumService.verifyCredentialsAsync(cnpj, password);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        const token = jsonWebToken.generateToken(resident.id);
        res.set('Authorization', token);
        delete resident.dataValues.password;
        res.status(HttpStatusCodes.OK).json(resident);
    });

};

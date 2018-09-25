const residentService = require('./resident.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app) => {
//Post - resident
    app.post('/', async (req, res) => {
        try {
            const resident = await residentService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }

    });
    app.get('/', async (req, res) => {
        const resident = await residentService.showAllAsync();
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);

    });
// Get - resident by email
    app.get('/:email', async (req, res) => {
        const email = req.params.email;

        const resident = await residentService.showAsync(email);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(resident);
    });
// Post - Login
    app.post('/login', async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const resident = await residentService.verifyCredentialsAsync(email, password);
        if (!resident) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        const token = jsonWebToken.generateToken(resident.id);
        res.set('Authorization', token);
        delete resident.dataValues.password;
        res.status(HttpStatusCodes.OK).json(resident);
    });

};

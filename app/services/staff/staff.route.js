const staffService = require('./staff.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app) => {
//Post - staff
    app.post('/', async (req, res) => {
        try {
            const staff = await staffService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            console.log(err);
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }

    });
    app.get('/', async (req, res) => {
        const staff = await staffService.showAllAsync();
        if (!staff) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(staff);

    });
// Get - staff by email
    app.get('/:email', async (req, res) => {
        const email = req.params.email;

        const staff = await staffService.showAsync(email);
        if (!staff) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(staff);
    });
// Post - Login
    app.post('/login', async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const staff = await staffService.verifyCredentialsAsync(email, password);
        if (!staff) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        const token = jsonWebToken.generateToken(staff.id);
        res.set('Authorization', token);
        delete staff.dataValues.password;
        res.status(HttpStatusCodes.OK).json(staff);
    });

};

const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {

    //AKA_LOGIN
    verifyCredentialsAsync: (email, password) => {
        if (email && password) {
            return models.Residents.find({ where: { email } }).then((data) => {
                if (data) {
                    const isValidPassword = bcrypt.compareSync(password, data.password);
                    if (isValidPassword) {
                        return data;
                    }
                }
                return false;
            });
        }
        return false;
    },
    //get_resident_by_email
    showAsync: (email) => {
        return models.Residents.findOne({ where: {'email': email} })
    },
    showAllAsync: () => {
        return models.Residents.findAll();

    },
    // create_resident
    createAsync: (data) => {
        return models.Residents.create(data);
    },
    //updating_resident
    updateAsync: (email, data) => {
        delete data.email;
        const resident = omitEmpty(data);
        return models.Residents.update(resident, {where: {email}})
            .then(result => {
                const isWork = result[0];
                return isWork;
            });
    }
};

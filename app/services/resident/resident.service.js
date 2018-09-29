const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {

    verifyCredentialsAsync: (email, password) => {
        if (email && password) {
            return models.Residents.find({where: {email}}).then((data) => {
                if (data) {
                    const isValidPassword = bcrypt.compareSync(password, data.password);
                    console.log(isValidPassword)

                    if (isValidPassword) {
                        return data;
                    }
                }
                return false;
            });
        }
        return false;
    },

    showAsync: (email) => {
        return models.Residents.findOne({where: {'email': email}})
    },

    showAllAsync: () => {
        return models.Residents.findAll();

    },

    createAsync: (data) => {
        return models.Residents.create(data);
    },

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

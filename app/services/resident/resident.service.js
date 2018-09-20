const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {

    showAsync: (email) => {
        return models.Residents.findOne({ where: {'email': email} })
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

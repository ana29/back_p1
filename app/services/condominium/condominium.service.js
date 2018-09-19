const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {

    showAsync: (id) => {
        return models.Condominiums.findById(id);
    },

    createAsync: (data) => {
        return models.Condominiums.create(data);
    },

    updateAsync: (id, data) => {
        delete data.id;
        const condominium = omitEmpty(data);
        return models.Condominium.update(condominium, {where: {id}})
            .then(result => {
                const isWork = result[0];
                return isWork;
            });
    }
};

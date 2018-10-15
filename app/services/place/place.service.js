const models = require('../../models');

module.exports = {


    showAsync: (cnpj) => {
        return models.Places.findAll({ where: {'cnpj': cnpj} })

    },

    showAllAsync: () => {
        return models.Places.findAll();

    },

    createAsync: (data) => {
        return models.Places.create(data);
    },


};

const models = require('../../models');

module.exports = {


    showAsync: (cnpj) => {
        return models.OfficeHours.findAll({ where: {'cnpj': cnpj} })

    },

    showAllAsync: () => {
        return models.OfficeHours.findAll();

    },

    createAsync: (data) => {
        return models.OfficeHours.create(data);
    },


};

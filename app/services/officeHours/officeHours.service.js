const models = require('../../models');

module.exports = {


    showAsync: (cnpj) => {
        return models.OfficeHours.findOne({ where: {'cnpj': cnpj} })

    },

    showAllAsync: () => {
        return models.OfficeHours.findAll();

    },

    createAsync: (data) => {
        return models.OfficeHours.create(data);
    },


};

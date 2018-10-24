const models = require('../../models');

module.exports = {
    showAsync: (cnpj) => {
        return models.Services.findAll({ where: {'cnpj': cnpj} })

    },

    showAllAsync: () => {
        return models.Services.findAll();

    },
    destroyAsync: (id) => {
        return models.Services.destroy({where: {id}});
    },

    createAsync: (data) => {
        return models.Services.create(data);
    }
};

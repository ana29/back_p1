const models = require('../../models');

module.exports = {
    showAsync: (cnpj) => {
        return models.Places.findAll({where: {'cnpj': cnpj}})
    },
    showAllAsync: () => {
        return models.Places.findAll();
    },
    destroyAsync: (id) => {
        return models.Places.destroy({where: {id}});
    },
    createAsync: (data) => {
        return models.Places.create(data);
    }
};

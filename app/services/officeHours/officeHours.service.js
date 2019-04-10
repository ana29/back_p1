const models = require('../../models');

module.exports = {
    showAsync: (cnpj) => {
        return models.OfficeHours.findAll({where: {'cnpj': cnpj}})
    },
    showAllAsync: () => {
        return models.OfficeHours.findAll();
    },
    destroyAsync: (id) => {
        return models.OfficeHours.destroy({where: {id}});
    },
    createAsync: (data) => {
        return models.OfficeHours.create(data);
    }
};

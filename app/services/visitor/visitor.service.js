const models = require('../../models');

module.exports = {
    showAsync: (cpf_resident) => {
        return models.Visitors.findAll({where: {'cpf_resident': cpf_resident}})
    },
    showAllAsync: () => {
        return models.Visitors.findAll();
    },
    destroyAsync: (id) => {
        return models.Visitors.destroy({where: {id}});
    },
    createAsync: (data) => {
        return models.Visitors.create(data);
    }
};

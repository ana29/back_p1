const models = require('../../models');

module.exports = {
    showAsync: (cnpj) => {
        return models.Announcements.findAll({where: {'cnpj': cnpj}})

    },
    showAllAsync: () => {
        return models.Announcements.findAll();
    },
    showAsyncById: (id) => {
        return models.Announcements.findById(id);
    },
    destroyAsync: (id) => {
        return models.Announcements.destroy({where: {id}});
    },
    createAsync: (data) => {
        return  models.Announcements.create(data);
    }
};

const models = require('../../models');

module.exports = {
    showAsync: (residentId) => {
        return models.Emails.findAll({where: {'residentId': residentId}})
    },
    showAllAsync: () => {
        return models.Emails.findAll();
    },
    destroyAsync: (id) => {
        return models.Emails.destroy({where: {id}});
    },
    createAsync: (data) => {
        return models.Emails.create(data);
    }
};

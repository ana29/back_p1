const models = require('../../models');

module.exports = {
    showAsync: (placeId) => {
        return models.Reservations.findAll({where: {'placeId': placeId}})
    },
    showAsyncResidentId: (residentId) => {
        return models.Reservations.findAll({where: {'residentId': residentId}})
    },
    showAllAsync: () => {
        return models.Reservations.findAll();
    },
    destroyAsync: (id) => {
        return models.Reservations.destroy({where: {id}});
    },
    createAsync: (data) => {
        return models.Reservations.create(data);
    }
};

const models = require('../../models');

module.exports = {
    showAsync: (place_id) => {
        return models.Reservations.findAll({where: {'place_id': place_id}})
    },
    showAsyncResidentId: (resident_id) => {
        return models.Reservations.findAll({where: {'resident_id': resident_id}})
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

const models = require('../../models');
const omitEmpty = require('omit-empty');


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
    },
    updateAsync:
        (id, data) => {
            const reservation = omitEmpty(data);
            return models.Reservations.update(reservation, {where: {id}})
                .then(result => {
                    return result[0];

                });
        }
}
;


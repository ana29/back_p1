const models = require('../../models');
const omitEmpty = require('omit-empty');


module.exports = {
    showAsync: (placeId) => {
        return models.Reservations.findAll({where: {'placeId': placeId}})
    },
    showAsyncResidentId: (residentId) => {
        return models.Reservations.findAll({where: {'residentId': residentId}})
    },
    showAsyncByCnpj: async (cnpj) => {
        const a = await getPlaces(cnpj);

        console.log(a +'<------------------------------------------');
        return models.Reservations.findAll({where: {'placeId': a}})

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
    updateAsync: (id, data) => {
            const reservation = omitEmpty(data);
            return models.Reservations.update(reservation, {where: {id}})
                .then(result => {
                    return result[0];

                });
        }
};

function arrayIds(places) {
    const placesId = [];
    places.forEach(function(c, v){
        placesId[v] = c.id
    });
    return placesId;
}
function getPlaces(cnpj) {
    return models.Places.findAll({where: {'cnpj': cnpj}}).then(function(places){
        return arrayIds(places)
    });
}
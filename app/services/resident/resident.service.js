const models = require('../../models');
module.exports = {

    showAllAsync: () => {
        return models.Users.findAll({where: {role: 'RESIDENT'}});
    },
    showAsyncById: (id) => {
        return models.Users.findOne({where: {id: id, role: 'RESIDENT'}});

    },
    showAllByCnpjAsync: (cnpj) => {
        return models.Users.findAll({where: {cnpj: cnpj, role: 'RESIDENT'}});
    }
};

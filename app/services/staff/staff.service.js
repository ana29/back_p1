const models = require('../../models');

module.exports = {
    showAllAsync: () => {
        return models.Users.findAll({where: {role: "STAFF"}});

    },
    showAllByCnpjAsync: (cnpj) => {
        return models.Users.findAll({where: {cnpj: cnpj, role: "STAFF"}});
    }
};

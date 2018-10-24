const models = require('../../models');

module.exports = {
    showAllAsync: () => {
        return models.Users.findAll({where: {role: "ADMIN"}});
    },
    showAllByCnpjAsync: (cnpj) => {
        return models.Users.findAll({where: {cnpj: cnpj, role: "ADMIN"}});
    }
};

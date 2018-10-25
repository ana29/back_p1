const models = require('../../models');
module.exports = {

    showAllAsync: () => {
        return models.Users.findAll({where: {role: "RESIDENT"}});
    },
    showAllByCnpjAsync: (cnpj) => {
        return models.Users.findAll({where: {cnpj: cnpj, role: "RESIDENT"}});
    }
};

const models = require('../../models');
const omitEmpty = require('omit-empty');

module.exports = {

    showAllByCnpjAsync: (cnpj) => {
        return models.Users.findAll( { where: {cnpj: cnpj, role:"STAFF"}});
    },
    showAllAsync: () => {
        return models.Users.findAll({ where: {role:"STAFF"}});

    },

    updateAsync: (email, data) => {
        delete data.email;
        const staff = omitEmpty(data);
        return models.Users.update(staff, {where: {email}})
            .then(result => {
                const isWork = result[0];
                return isWork;
            });
    },

};

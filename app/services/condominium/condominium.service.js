const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {

    verifyCredentialsAsync: (email_admin, password) => {
        if (email_admin && password) {
            return models.Condominiums.find({ where: { email_admin } }).then((data) => {
                if (data) {
                    const isValidPassword = bcrypt.compareSync(password, data.password);
                    if (isValidPassword) {
                        return data;
                    }
                }
                return false;
            });
        }
        return false;
    },
    showAsync: (cnpj) => {
        return models.Condominiums.findOne({ where: {'cnpj': cnpj} })

    },

    showAllAsync: () => {
        return models.Condominiums.findAll();

    },

    createAsync: (data) => {
        return models.Condominiums.create(data);
    },

    updateAsync: (cnpj, data) => {
        delete data.cnpj;
        const condominium = omitEmpty(data);
        return models.Condominiums.update(condominium, {where: {cnpj}})
            .then(result => {
                const isWork = result[0];
                return isWork;
            });
    }
};

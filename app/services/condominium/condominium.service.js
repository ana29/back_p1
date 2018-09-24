const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {
    verifyCredentialsAsync: (cnpj, password) => {
        if (cnpj && password) {
            return models.Condominiums.find({ where: { cnpj } }).then((data) => {
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

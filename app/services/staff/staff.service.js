const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {
    verifyCredentialsAsync: (email, password) => {
        if (email && password) {
            return models.Staffs.find({where: {email}}).then((data) => {
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

    showAllByCnpjAsync: (condominium_cnpj) => {
        return models.Staffs.findAll( { where: {'condominium_cnpj': condominium_cnpj}});
    },
    showAllAsync: () => {
        return models.Staffs.findAll();

    },

    createAsync: (data) => {
        return models.Staffs.create(data);
    },

    updateAsync: (email, data) => {
        delete data.email;
        const staff = omitEmpty(data);
        return models.Staffs.update(staff, {where: {email}})
            .then(result => {
                const isWork = result[0];
                return isWork;
            });
    },

    checkPermission: (email, permission) => {
        if (email && permission) {
            return (models.Staffs.find({where: {email}}).then((data) => {
                if (data) {
                    return data.permission >= permission;
                }
                return false;
            }));
            return false;
        }
    }
};

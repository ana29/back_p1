const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        job: DataTypes.STRING,
        role: DataTypes.STRING,
        cnpj: DataTypes.STRING
    });

    Users.beforeCreate((user) => {
        return bcrypt.hash(user.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                user.password = hash;
            });
    });

    Users.beforeBulkUpdate((user) => {
        if (user.attributes.password) {
            return bcrypt.hash(user.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    user.attributes.password = hash;
                });
        }
    });
    Users.hook('beforeValidate', function (user) {

        if (validator.isEmail(user.email)) {
            return sequelize.Promise.resolve(user);
        } else {
            throw new Error('Validation Error: invalid email');
        }
    });
    Users.hook('beforeValidate', function (user) {
        if (!/^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/i.test(user.phone)) {
            throw new Error('Validation Error: invalid Phone ')
        } else {
            return sequelize.Promise.resolve(user);
        }
    });
    Users.hook('beforeValidate', function (user) {
        if (!/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/i.test(user.cpf)) {
            throw new Error('Validation Error: invalid CPF ')
        } else {
            return sequelize.Promise.resolve(user);
        }
    });
    Users.hook('beforeValidate', function (user) {
        if (!/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/i.test(user.cnpj)) {
            throw new Error('Validation Error: invalid CNPJ');
        } else {
            return sequelize.Promise.resolve(user);
        }

    });
    // Users.associate = (models) => {
    //     Users.belongsTo(models.Condominiums, {
    //         foreignKey: {
    //             name: 'cnpj',
    //             as: 'condominiumCnpj'
    //         },
    //         onDelete: 'set null'
    //     });
    // };
    return Users;
};


const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Condominiums = sequelize.define('Condominiums', {
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        name_admin: DataTypes.STRING,
        cpf_admin: DataTypes.STRING,
        email_admin: DataTypes.STRING,
    });

    Condominiums.beforeCreate((condominiums) => {
        return bcrypt.hash(condominiums.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                condominiums.password = hash;
            });
    });

    Condominiums.beforeBulkUpdate((condominiums) => {
        if (condominiums.attributes.password) {
            return bcrypt.hash(condominiums.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    condominiums.attributes.password = hash;
                });
        }
    });

    return Condominiums;
}


require('dotenv').config();

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Residents = sequelize.define('Residents', {
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        house: DataTypes.STRING,
        phone: DataTypes.STRING,
        condominium_cnpj: DataTypes.STRING,
        permission: DataTypes.INTEGER
    });
    Residents.beforeCreate((resident) => {
        return
        return bcrypt.hash(resident.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                resident.password = hash;
            });
    });
    Residents.beforeCreate((resident) => {

        return bcrypt.hash(resident.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                resident.password = hash;
            });
    });


    Residents.beforeBulkUpdate((resident) => {
        if (resident.attributes.password) {
            return bcrypt.hash(resident.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    resident.attributes.password = hash;
                });
        }
    });

    return Residents;
};
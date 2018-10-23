require('dotenv').config();

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        condominium_cnpj: DataTypes.STRING,
        role: DataTypes.INTEGER
    });
    Users.beforeCreate((staff) => {
        return bcrypt.hash(staff.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                staff.password = hash;
            });
    });

    Users.beforeBulkUpdate((staff) => {
        if (staff.attributes.password) {
            return bcrypt.hash(staff.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    staff.attributes.password = hash;
                });
        }
    });

    return Users;
};
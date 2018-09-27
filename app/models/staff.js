require('dotenv').config();

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Staffs = sequelize.define('Staffs', {
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        condominium_cnpj: DataTypes.STRING,
        permission: DataTypes.INTEGER
    });
    Staffs.beforeCreate((staff) => {
        return bcrypt.hash(staff.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                staff.password = hash;
            });
    });
    Staffs.beforeCreate((staff) => {

        return bcrypt.hash(staff.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                staff.password = hash;
            });
    });


    Staffs.beforeBulkUpdate((staff) => {
        if (staff.attributes.password) {
            return bcrypt.hash(staff.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    staff.attributes.password = hash;
                });
        }
    });

    return Staffs;
};
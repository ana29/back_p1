require('dotenv').config();

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define('Staffs', {
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        condominium_cnpj: DataTypes.STRING,
        permission: DataTypes.INTEGER
    });
    Staff.beforeCreate((staff) => {
        return bcrypt.hash(staff.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                staff.password = hash;
            });
    });
    Staff.beforeCreate((staff) => {

        return bcrypt.hash(staff.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                staff.password = hash;
            });
    });


    Staff.beforeBulkUpdate((staff) => {
        if (staff.attributes.password) {
            return bcrypt.hash(staff.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    staff.attributes.password = hash;
                });
        }
    });

    return Staff;
};
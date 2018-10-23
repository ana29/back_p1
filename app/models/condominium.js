const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    return Condominiums = sequelize.define('Condominiums', {
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING
    });

};


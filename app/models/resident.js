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
    });

    return Residents;
}
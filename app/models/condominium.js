module.exports = (sequelize, DataTypes) => {
    const Condominium = sequelize.define('Condominium', {
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        address: DataTypes.STRING,
        name_admin: DataTypes.STRING,
        cpf_admin: DataTypes.STRING,
        email_admin: DataTypes.STRING,
    });
    return Condominium;
}

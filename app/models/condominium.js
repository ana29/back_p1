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
    return Condominiums;
}


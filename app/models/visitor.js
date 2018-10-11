module.exports = (sequelize, DataTypes) => {
    const Visitors = sequelize.define('Visitors', {
        nome:  DataTypes.STRING,
        cpf_visitor:DataTypes.STRING,
        iterative: DataTypes.BOOLEAN,
        cpf_resident: DataTypes.STRING,
        expiration_date :  DataTypes.DATE,
        additional_information:  DataTypes.STRING,
    });

    return Visitors;
};

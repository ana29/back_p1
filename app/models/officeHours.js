module.exports = (sequelize, DataTypes) => {
    const OfficeHours = sequelize.define('OfficeHours', {
        cnpj: DataTypes.STRING,
        hours:DataTypes.DATE

    });

    return OfficeHours;
};
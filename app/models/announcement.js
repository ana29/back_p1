module.exports = (sequelize, DataTypes) => {
    const Announcements = sequelize.define('Announcements', {
        cnpj: DataTypes.STRING,
        announcement:DataTypes.STRING

    });

    return Announcements;
};

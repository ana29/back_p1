module.exports = (sequelize, DataTypes) => {
    const Places = sequelize.define('Places', {
        cnpj: DataTypes.STRING,
        place_name: DataTypes.STRING,
        about: DataTypes.STRING,
        days_booking: DataTypes.STRING,
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME,

    });

    return Places;
};

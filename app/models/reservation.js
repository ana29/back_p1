module.exports = (sequelize, DataTypes) => {
    const Reservations = sequelize.define('Reservations', {
        placeId: DataTypes.INTEGER,
        residentId: DataTypes.INTEGER,
        occupied: DataTypes.BOOLEAN,
        date: DataTypes.STRING,
        time: DataTypes.TIME
    });
    Reservations.associate = (models) => {
        Reservations.belongsTo(models.Places, {
            foreignKey: {
                name: 'placeId',
                as: 'place'
            },
            onDelete: 'set null'
        });
    };

    return Reservations;
};

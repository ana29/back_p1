module.exports = (sequelize, DataTypes) => {
    const Reservations = sequelize.define('Reservations', {
        placeId: DataTypes.INTEGER,
        residentId: DataTypes.INTEGER,
        occupied: DataTypes.BOOLEAN,
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE
    });
    // Reservations.associate = (models) => {
    //     Reservations.belongsTo(models.Places, {
    //         foreignKey: {
    //             name: 'placeId',
    //             as: 'place'
    //         },
    //         onDelete: 'set null'
    //     });
    // };

    return Reservations;
};

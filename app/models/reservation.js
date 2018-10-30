module.exports = (sequelize, DataTypes) => {
    const Reservations = sequelize.define('Reservations', {
        place_id: DataTypes.INTEGER,
        resident_id: DataTypes.INTEGER,
        occupied: DataTypes.BOOLEAN,
        date: DataTypes.STRING,
        time: DataTypes.TIME
    });
    Reservations.associate = (models) => {
        Reservations.belongsTo(models.Places, {
            foreignKey: {
                name: 'id',
                as: 'place_id'
            },
            onDelete: 'set null'
        });
    };
    Reservations.associate = (models) => {
        Reservations.hasOne(models.Residents, {
            foreignKey: {
                name: 'id',
                as: 'resident_id'
            },
            onDelete: 'set null'
        });
    };
    return Reservations;
};

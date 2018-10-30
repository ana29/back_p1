'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Reservations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            place_id: {
                allowNull: false,
                foreignKey:true,
                type: DataTypes.STRING
            },
            occupied: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
            date: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            time: {
                allowNull: false,
                type: DataTypes.TIME,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Reservations');
    }
};

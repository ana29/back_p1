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

            residentId: {
                allowNull: false,
                type: DataTypes.INTEGER
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
            placeId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Places',
                    key: 'id'
                },
                onDelete: 'set null'
            }
        });
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Reservations');
    }
};

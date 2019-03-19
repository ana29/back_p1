'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Reservations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },

            residentId: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            occupied: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
            startTime: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            endTime: {
                allowNull: false,
                type: DataTypes.DATE,
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
                // references: {
                //     model: 'Places',
                //     key: 'id'
                // },
                // onDelete: 'set null'
            }
        });
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Reservations');
    }
};

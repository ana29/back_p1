'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Emails', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            condominiumId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Condominiums',
                    key: 'id'
                },
                onDelete: 'set null'
            },
            residentId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            subject: {
                allowNull: false,
                type: DataTypes.STRING
            },
            message: {
                allowNull: false,
                type: DataTypes.TEXT
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Emails');
    }
};

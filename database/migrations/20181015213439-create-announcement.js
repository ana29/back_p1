'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return  queryInterface.createTable('Announcements', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            cnpj: {
                type: DataTypes.STRING
            },
            announcement: {
                type: DataTypes.TEXT,
                defaultValue: null
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
        queryInterface.dropTable('Announcements');
    }
};

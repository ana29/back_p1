'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Services', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type : DataTypes.STRING
            },
            description: {
                allowNull: true,
                type : DataTypes.TEXT
            },
            cnpj: {
                allowNull: false,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
        });
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Services');
    }
};

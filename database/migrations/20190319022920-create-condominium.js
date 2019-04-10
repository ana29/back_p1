'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
       return  queryInterface.createTable('Condominiums', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            cnpj: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
            },
            phone: {
                allowNull: false,
                type: DataTypes.STRING
            },
            address: {
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
            }
        });
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Condominiums');
    }
};






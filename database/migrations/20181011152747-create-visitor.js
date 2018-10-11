'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Visitors', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            nome: {
                type : DataTypes.STRING,
            },
            cpf_visitor: {
                unique: true,
                allowNull: false,
                type : DataTypes.STRING,
            },
            iterative: {
                type : DataTypes.BOOLEAN,
                defaultValue: null
            },
            cpf_resident: {
                unique: true,
                allowNull: false,
                type: DataTypes.STRING
            },
            expiration_date : {
                type : DataTypes.DATE,
                defaultValue: null
            },
            additional_information: {
                type : DataTypes.STRING,
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
        queryInterface.dropTable('Visitors');
    }
};

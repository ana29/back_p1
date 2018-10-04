'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('OfficeHours', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            cnpj: {
                type: DataTypes.STRING
            },
            hours: {
              type : DataTypes.DATE,
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
        queryInterface.dropTable('OfficeHours');
    }
};

'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Places', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            cnpj: {
                allowNull: false,
                type: DataTypes.STRING
            },
            place_name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            about: {
                allowNull: false,
                type: DataTypes.ARRAY(DataTypes.JSON),

            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            }
        });
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Places');
    }
};

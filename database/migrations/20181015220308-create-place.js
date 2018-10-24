'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Places', {

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
                type: DataTypes.TEXT,
            },
            days_booking: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            start_time: {
                allowNull: false,
                type: DataTypes.TIME,
            },
            end_time: {
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
        queryInterface.dropTable('Places');
    }
};

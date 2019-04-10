'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return  queryInterface.createTable('Users', {
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
            phone: {
                allowNull: false,
                type: DataTypes.STRING
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING
            },
            cpf: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                lowercase: true
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            job: {
                allowNull: true,
                type: DataTypes.STRING
            },
            role: {
                allowNull: false,
                type: DataTypes.ENUM,
                values: ['ADMIN', 'RESIDENT', 'STAFF'],
                defaultValue: 'RESIDENT'
            },
            cnpj: {
                allowNull: false,
                type: DataTypes.STRING,
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
        queryInterface.dropTable('Users');
    }
};






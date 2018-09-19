module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Condominium', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            cnpj: {
                allowNull: false,
                type: DataTypes.STRING,
            },

            address: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            name_admin: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            cpf_admin: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email_admin: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
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
        queryInterface.dropTable('Condominium');
    }
};






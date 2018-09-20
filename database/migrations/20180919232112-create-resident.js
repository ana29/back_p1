module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Residents', {
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
            cpf: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            house: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            phone: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            condominium_cnpj: {
                allowNull: false,
                type: DataTypes.STRING,
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
        queryInterface.dropTable('Residents');
    }
};

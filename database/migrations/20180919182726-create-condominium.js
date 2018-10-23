module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Condominiums', {
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
                unique: true,
                type: DataTypes.STRING,
            },
            admin_cpf: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            phone: {
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
                validate:{isEmail: true},
                unique: true,
            },
            permission: {
                allowNull: false,
                type: DataTypes.INTEGER,
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
        queryInterface.dropTable('Condominiums');
    }
};






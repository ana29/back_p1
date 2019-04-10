module.exports = (sequelize, DataTypes) => {
    const Visitors = sequelize.define('Visitors', {
        nome: DataTypes.STRING,
        cpf_visitor: DataTypes.STRING,
        iterative: DataTypes.BOOLEAN,
        cpf_resident: DataTypes.STRING,
        expiration_date: DataTypes.DATE,
        additional_information: DataTypes.STRING,
    });
    Visitors.hook('beforeValidate', function (visitor) {
        if ((!/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/i.test(visitor.cpf_visitor)) || !/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/i.test(visitor.cpf_resident)) {
            throw new Error('Validation Error: invalid CPF ')
        } else {
            return sequelize.Promise.resolve(visitor);
        }

    });
    // Visitors.associate = (models) => {
    //     Visitors.belongsTo(models.Users, {
    //         foreignKey: {
    //             name: 'cpf_resident',
    //             as: 'userCpf'
    //         },
    //         onDelete: 'set null'
    //     });
    // };
    return Visitors;
};

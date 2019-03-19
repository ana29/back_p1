module.exports = (sequelize, DataTypes) => {
    const Services = sequelize.define('Services', {
        name:DataTypes.STRING,
        description:DataTypes.TEXT,
        cnpj: DataTypes.STRING
    });
    Services.hook('beforeValidate', function (service) {
        if (!/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/i.test(service.cnpj)) {
            throw new Error('Validation Error: invalid CNPJ');
        } else {
            return sequelize.Promise.resolve(service);
        }
    });
    // Services.associate = (models) => {
    //     Services.belongsTo(models.Condominiums, {
    //         foreignKey: {
    //             name: 'cnpj',
    //             as: 'condominiumCnpj'
    //         },
    //         onDelete: 'set null'
    //     });
    // };
    return Services;
};
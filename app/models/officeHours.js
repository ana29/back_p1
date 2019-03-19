module.exports = (sequelize, DataTypes) => {
    const OfficeHours = sequelize.define('OfficeHours', {
        cnpj: DataTypes.STRING,
        hours: DataTypes.STRING
    });
    OfficeHours.hook('beforeValidate', function (officeHours) {
        if (!/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/i.test(officeHours.cnpj)) {
            throw new Error('Validation Error: invalid CNPJ');
        } else {
            return sequelize.Promise.resolve(officeHours);
        }
    });
    // OfficeHours.associate = (models) => {
    //     OfficeHours.belongsTo(models.Condominiums, {
    //         foreignKey: {
    //             name: 'cnpj',
    //             as: 'condominiumCnpj'
    //         },
    //         onDelete: 'set null'
    //     });
    // };
    return OfficeHours;
};

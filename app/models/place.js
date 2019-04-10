module.exports = (sequelize, DataTypes) => {
    const Places = sequelize.define('Places', {
        cnpj: DataTypes.STRING,
        place_name: DataTypes.STRING,
        about: DataTypes.ARRAY(DataTypes.JSON)

    });
    Places.hook('beforeValidate', function (place) {
        if (!/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/i.test(place.cnpj)) {
            throw new Error('Validation Error: invalid CNPJ');
        } else {
            return sequelize.Promise.resolve(place);
        }
    });
    // Places.associate = (models) => {
    //     Places.belongsTo(models.Condominiums, {
    //         foreignKey: {
    //             name: 'cnpj',
    //             as: 'condominiumCnpj'
    //         },
    //         onDelete: 'set null'
    //     });
    // };
    return Places;
};

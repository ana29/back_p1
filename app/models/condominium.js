module.exports = (sequelize, DataTypes) => {
    const Condominiums = sequelize.define('Condominiums', {
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING

    });
    Condominiums.hook('beforeValidate', function (condominium) {
        if (!/^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/i.test(condominium.phone)) {
            throw new Error('Validation Error: invalid Phone ')
        } else {
            return sequelize.Promise.resolve(condominium);
        }
    });
    Condominiums.hook('beforeValidate', function (condominium) {
        if (!/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/i.test(condominium.cnpj)) {
            throw new Error('Validation Error: invalid CNPJ');
        } else {
            return sequelize.Promise.resolve(condominium);
        }
    });
     // Condominiums.associate = (models) => {
     //    Condominiums.hasMany(models.Users, {
     //        foreignKey: {
     //            name: 'cnpj',
     //            as: 'cnpj',
     //            allowNull: false
     //        }
     //    });
   // };
    
    return Condominiums;
};


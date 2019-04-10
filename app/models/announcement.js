module.exports = (sequelize, DataTypes) => {
    const Announcements = sequelize.define('Announcements', {
        cnpj: DataTypes.STRING,
        announcement: DataTypes.TEXT
    });
    // Announcements.hook('beforeValidate', function (announcement) {
    //     if (!/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/i.test(announcement.cnpj)) {
    //         throw new Error('Validation Error: invalid CNPJ');
    //     } else {
    //         return sequelize.Promise.resolve(announcement);
    //     }
    // });
    // Announcements.associate = (models) => {
    //     Announcements.belongsTo(models.Condominiums, {
    //         foreignKey: {
    //             name: 'cnpj',
    //             as: 'condominiumCnpj'
    //         },
    //         onDelete: 'set null'
    //     });
    //};
    return Announcements;
};

module.exports = (sequelize, DataTypes) => {
    const Emails = sequelize.define('Emails', {
        condominiumId: DataTypes.INTEGER,
        residentId: DataTypes.INTEGER,
        subject: DataTypes.STRING,
        message: DataTypes.TEXT

    });
    // Emails.associate = (models) => {
    //     Emails.belongsTo(models.Emails, {
    //         foreignKey: {
    //             name: 'condominiumId',
    //             as: 'condominiumId'
    //         },
    //         onDelete: 'set null'
    //     });
   // };


    return Emails;

};

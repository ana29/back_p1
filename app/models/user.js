const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        job: DataTypes.STRING,
        role: DataTypes.INTEGER
    });

    Users.beforeCreate((users) => {
        return bcrypt.hash(users.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                users.password = hash;
            });
    });

    Users.beforeBulkUpdate((users) => {
        if (users.attributes.password) {
            return bcrypt.hash(users.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    users.attributes.password = hash;
                });
        }
    });

    return Users;
};


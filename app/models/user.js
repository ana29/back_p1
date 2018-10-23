const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        job: DataTypes.STRING,
        role: DataTypes.STRING
    });

    Users.beforeCreate((user) => {
        return bcrypt.hash(user.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                user.password = hash;
            });
    });

    Users.beforeBulkUpdate((user) => {
        if (user.attributes.password) {
            return bcrypt.hash(user.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    user.attributes.password = hash;
                });
        }
    });
    Users.hook('beforeValidate', function(user, options) {
        if(validator.isEmail(user.email)){
            return sequelize.Promise.resolve(user);
        }else{
            return sequelize.Promise.reject('Validation Error: invalid email');
        }
    });

    return Users;
};


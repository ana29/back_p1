const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');
const constants = require('../../core/constants');

module.exports = {

    //AKA_LOGIN
    verifyCredentialsAsync: (email, password) => {
        if (email && password) {
            return models.Staffs.find({ where: { email } }).then((data) => {
                if (data) {
                    const isValidPassword = bcrypt.compareSync(password, data.password);
                    if (isValidPassword) {
                        return data;
                    }
                }
                return false;
            });
        }
        return false;
    },
    //get_staff_by_email
    showAsync: (email) => {
        return models.Staffs.findOne({ where: {'email': email} })
    },
    showAllAsync: () => {
        return models.Staffs.findAll();

    },
    // create_staff
    createAsync: (data) => {
        data.permission = constants.STAFF;
        return models.Staffs.create(data);
    },
    //updating_staff
    updateAsync: (email, data) => {
        delete data.email;
        const staff = omitEmpty(data);
        return models.Staffs.update(staff, {where: {email}})
            .then(result => {
                const isWork = result[0];
                return isWork;
            });
    },

    // check_permission
    checkPermission: (email, permission) => {
        if(email && permission) {
            return(models.Staffs.find({ where: { email } }).then((data) => {
                if(data) {
                    return data.permission >= permission;
                }
                return false;
            }));
            return false;
        }
    }
};

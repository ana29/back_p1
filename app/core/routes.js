const glob      = require('glob');
const _         = require('lodash');
const path      = require('path');
const express   = require('express');
const pluralize = require('pluralize');

module.exports = (app) => {
  const routes = glob.sync(__dirname + '/../services/**/*route.js', {});

    _.each(routes, (file) => {
    let routeName = path.basename(file, '.route.js');
    let router = express.Router(routeName);

    console.log('/' + pluralize(routeName));
    require(file)(router);
    app.use('/' + pluralize(routeName), router);
    });
};

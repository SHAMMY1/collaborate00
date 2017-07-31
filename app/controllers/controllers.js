/* globals __dirname */

const fs = require('fs');
const path = require('path');

const CONTROLLER_SUFIX = '.controller';

const init = (data, passport) => {
    const controllers = {};

    fs.readdirSync(__dirname)
        .filter((f) => f.includes(CONTROLLER_SUFIX))
        .forEach((f) => {
            const name = f.substring(0, f.indexOf(CONTROLLER_SUFIX));

            controllers[name] = require(path.join(__dirname, f))({
                data,
                passport,
            });
        });

    return controllers;
};

module.exports = {
    init,
};

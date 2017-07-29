/* globals __dirname */

const fs = require('fs');
const models = {};

fs.readdirSync(__dirname).filter((f) => f.includes('.model'))
    .forEach((f) => {
        const endIndex = f.indexOf('.model');
        const name = f[0].toUpperCase() + f.substring(1, endIndex);

        models[name] = require(__dirname + '/' + f);
    });

module.exports = models;

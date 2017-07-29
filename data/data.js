/* globals __dirname */

const init = (db) => {
    const fs = require('fs');
    const datas = {};

    fs.readdirSync(__dirname).filter((f) => f.includes('.data'))
        .forEach((f) => {
            const endIndex = f.indexOf('.data');
            const name = f.substring(0, endIndex);
            const CurrentData = require(__dirname + '/' + f);
            datas[name] = new CurrentData(db);
        });

    return Promise.resolve(datas);
};

module.exports = {
    init,
};

/* globals __dirname */

const fs = require('fs');
const path = require('path');

const DEFULT_ROUTER_NAME = 'index';
const ROUTER_SUFIX = '.router';

const attachRoutes = (dirname, app, data) => {
    const urlPrefix = dirname.replace(ROUTER_SUFIX, '').replace('\\', '/');
    fs.readdirSync(path.join(__dirname, dirname))
        .filter((f) => f.includes(ROUTER_SUFIX))
        .forEach((f) => {
            let url = f.substring(0, f.indexOf(ROUTER_SUFIX));
            if (fs.statSync(path.join(__dirname, dirname, f)).isDirectory()) {
                return attachRoutes(path.join(dirname, f), app, data);
            }
            const routerModule = require(path.join(__dirname, dirname, f));
            const router = routerModule.getRouter(data);
            url = routerModule.url || url === DEFULT_ROUTER_NAME ? '' : url;
            const fullUrl = `${urlPrefix}/${url}`;
            return app.use(fullUrl, router);
        });
};

const atachTo = (app, data) => {
    attachRoutes('/', app, data);
};

module.exports = {
    atachTo,
};

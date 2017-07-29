/* globals __dirname */

const fs = require('fs');
const path = require('path');

const DEFULT_ROUTER_NAME = 'index';
const ROUTER_SUFIX = '.router';

const atachTo = (app, controllers) => {
    const attachRoutes = (dirname) => {
        const urlPrefix = dirname.replace(ROUTER_SUFIX, '').replace('\\', '/');
        fs.readdirSync(path.join(__dirname, dirname))
            .filter((f) => f.includes(ROUTER_SUFIX))
            .forEach((f) => {
                const fileStats = fs.statSync(path.join(__dirname, dirname, f));
                let url = f.substring(0, f.indexOf(ROUTER_SUFIX));
                if (fileStats.isDirectory()) {
                    return attachRoutes(path.join(dirname, f));
                }
                const routerModule = require(path.join(__dirname, dirname, f));
                const router = routerModule.getRouter(controllers);
                url = routerModule.url || url === DEFULT_ROUTER_NAME ? '' : url;
                const fullUrl = `${urlPrefix}/${url}`;
                return app.use(fullUrl, router);
            });
    };
    attachRoutes('/');
};

module.exports = {
    atachTo,
};

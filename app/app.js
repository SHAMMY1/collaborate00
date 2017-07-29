const init = (data) => {
    const express = require('express');
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', './views');

    app.use('/', express.static('./public'));

    require('./routes').atachTo(app, data);

    return app;
};

module.exports = {
    init,
};

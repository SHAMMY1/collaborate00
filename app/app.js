const init = (data) => {
    const express = require('express');
    const app = express();
    const controllers = require('./controllers').init(data);
    app.set('view engine', 'pug');
    app.set('views', './views');

    app.use('/', express.static('./public'));

    require('./routes').atachTo(app, controllers);

    return app;
};

module.exports = {
    init,
};

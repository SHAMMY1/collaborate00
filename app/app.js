const init = (data) => {
    const express = require('express');
    const app = express();
    const controllers = require('./controllers').init(data);

    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');
    const passport = require('passport');
    const LocalStrategy = require('passport-local');

    // setup view engine
    app.set('view engine', 'pug');
    app.set('views', './views');

    // setup static
    app.use('/', express.static('./public'));

    // setup session

    // setup passport

    // setup routes
    require('./routes').atachTo(app, controllers);

    return app;
};

module.exports = {
    init,
};

const init = (data) => {
    const express = require('express');
    const app = express();
    const controllers = require('./controllers').init(data, require('passport'));

    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');

    const passport = require('passport');
    const LocalStrategy = require('passport-local');

    const flash = require('connect-flash');
    const messages = require('express-messages');

    // setup view engine
    app.set('view engine', 'pug');
    app.set('views', './views');

    // setup static
    app.use('/', express.static('./public'));
    app.use('/libs', express.static('./node_modules'));

    // setup session
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: 'black magic' }));

    // setup passport
    passport.use(new LocalStrategy((username, password, done) => {
        data.users.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'User not found!' });
                }

                if (user.password !== password) {
                    return done(null, false, { message: 'Incorect password!' });
                }

                return done(null, user);
            })
            .catch(done);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                return done(null, user);
            })
            .catch(done);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    // setup flash messages
    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = messages(req, res);
        next();
    });

    // setup routes
    require('./routes').atachTo(app, controllers);

    // setup auth test rouths

    return app;
};

module.exports = {
    init,
};

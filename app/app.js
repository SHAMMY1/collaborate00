const init = (data) => {
    const express = require('express');
    const app = express();
    const controllers = require('./controllers').init(data);

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
            .then((user) => done(null, user))
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
    app
        .get('/users/login', (req, res) => {
            res.render('users/login');
        })
        .get('/users/info', (req, res) => {
            if (!req.isAuthenticated()) {
                res.redirect('/users/login');
                return;
            }

            res.render('users/info', { model: req.user });
        })
        .post('/users/login', (req, res, next) => {
            if (req.isAuthenticated()) {
                req.logout();
            }

            next();
        }, (req, res, next) => {
            passport.authenticate('local', {
                failureFlash: true,
                failureRedirect: '/users/login',
                successFlash: `${req.body.username} loged in`,
                successRedirect: '/users/info',
            })(req, res, next);
        })
        .get('/users/logout', (req, res) => {
            if (req.isUnauthenticated()) {
                res.redirect('/users/login');
            }
            req.logout();
            res.redirect('/');
        })
        .get('/users/register', (req, res) => {
            res.render('users/register');
        })
        .post('/users/register', (req, res) => {
            if (req.isAuthenticated()) {
                req.logout();
            }
            const newUser = req.body;

            data.users.findByUsername(newUser.username)
                .then((dbUser) => {
                    if (dbUser) {
                        return Promise.reject({
                            isModelValid: false,
                            username: {
                                isValid: false,
                                msg: 'User already exists!',
                            },
                        });
                    }

                    return data.users.create(newUser);
                })
                .then((dbUser) => {
                    return new Promise((resolve, reject) => {
                        req.login(dbUser, (err) => {
                            if (err) {
                                reject(err);
                            }

                            resolve(dbUser);
                        });
                    });
                })
                .then((dbUser) => {
                    const username = req.user.username;
                    req.flash('info', `${username} successfuly register`);
                    res.redirect('/users/info');
                })
                .catch((err) => {
                    if (err.isModelValid === false) {
                        Object.keys(err).forEach((key) => {
                            if (!err[key].isValid) {
                                req.flash('error', err[key].msg);
                            }
                        });
                        return res.redirect('/users/register');
                    }
                    return res.render('error', { model: err });
                });
        });
    return app;
};

module.exports = {
    init,
};

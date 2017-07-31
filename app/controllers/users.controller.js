const baseController = require('./base');

class UsersController extends baseController {
    constructor({ data, passport }) {
        super(data);
        this.passport = passport;
    }

    getAll(req, res) {
        this.data.users.getAll()
            .then((users) => {
                res.json(users);
            });
    }

    getInfo(req, res) {
        if (!req.isAuthenticated()) {
            req.flash('error', 'Must be logedin to see this page!');
            res.redirect('/users/login');
            return;
        }

        res.render('users/info', { model: req.user });
    }

    getLogin(req, res) {
        res.render('users/login');
    }

    postLogin(req, res, next) {
        if (req.isAuthenticated()) {
            req.logout();
        }
        this.passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/users/login',
            successFlash: `${req.body.username} loged in`,
            successRedirect: '/users/info',
        })(req, res, next);
    }

    getLogout(req, res) {
        if (req.isUnauthenticated()) {
            res.redirect('/users/login');
        }

        req.logout();
        req.flash('info', 'Successfuly log out');
        res.redirect('/');
    }
    getRegister(req, res) {
        res.render('users/register');
    }

    postRegister(req, res) {
        if (req.isAuthenticated()) {
            req.logout();
        }
        const newUser = req.body;

        this.data.users.findByUsername(newUser.username)
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

                return this.data.users.create(newUser);
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
    }
}

module.exports = (data) => {
    return {
        init() {
            return new UsersController(data);
        },
    };
};

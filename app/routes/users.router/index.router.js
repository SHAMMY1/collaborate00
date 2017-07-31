const getRouter = (controllers) => {
    const { Router } = require('express');
    const router = new Router();
    const usersController = controllers.users.init();

    router.get('/', (req, res) => usersController.getAll(req, res))
        .get('/login', (req, res) => usersController.getLogin(req, res))
        .get('/info', (req, res) => usersController.getInfo(req, res))
        .post('/login', (req, res, next) => {
            return usersController.postLogin(req, res, next);
        })
        .get('/logout', (req, res) => usersController.getLogout(req, res))
        .get('/register', (req, res) => usersController.getRegister(req, res))
        .post('/register', (req, res) => {
            return usersController.postRegister(req, res);
        });
    return router;
};

module.exports = {
    getRouter,
};

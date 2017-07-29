const getRouter = (controllers) => {
    const { Router } = require('express');
    const router = new Router();
    const usersController = controllers.users.init();

    router.get('/', (req, res) => usersController.getAll(req, res));

    return router;
};

module.exports = {
    getRouter,
};

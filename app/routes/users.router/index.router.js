const getRouter = (data) => {
    const { Router } = require('express');
    const router = new Router();

    router.get('/', (req, res) => {
        data.users.getAll()
            .then((users) => {
                res.json(users);
            });
    });

    return router;
};

module.exports = {
    getRouter,
};

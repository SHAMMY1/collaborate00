const getRouter = (data) => {
    const { Router } = require('express');
    const router = new Router();

    router.get('/', (req, res) => {
        return res.render('home');
    });

    return router;
};

module.exports = {
    getRouter,
};

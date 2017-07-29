const getRouter = (controller) => {
    const { Router } = require('express');
    const router = new Router();
    const homeController = controller.home.init();

    router.get('/', (req, res) => homeController.get(req, res));

    return router;
};

module.exports = {
    getRouter,
};

const init = (data) => {
    const express = require('express');
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', './views');

    app.use('/', express.static('./public'));

    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/users', (req, res) => {
        data.users.getAll()
            .then((users) => {
                res.json(users);
            });
    });

    return app;
};

module.exports = {
    init,
};

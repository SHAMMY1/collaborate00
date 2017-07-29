require('./fakeDb').init()
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(3000, () => {
            console.log('App listening on port 3000!');
        });
    })
    .catch((err) => {
        console.log(err);
    });

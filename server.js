const connectionString = 'mongodb://localhost:27017/CollaborateDb';

require('./db').init(connectionString)
    .then((db) => {
        console.log('db conected');
        return require('./data').init(db);
    })
    .then((data) => {
        console.log('data Initialized');
        return require('./app').init(data);
    })
    .then((app) => {
        console.log('app Initialized');
        app.listen(3000, () => {
            console.log('App listening on port 3000!');
        });
    })
    .catch((err) => {
        console.log(err);
    });

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', express.static('./public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

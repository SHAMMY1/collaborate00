const express = require('express');
const app = express();
app.use('/', express.static('./public'));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Collaborate</title>
        </head>
        <body>
        <h1>COLLABORATE</h1>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

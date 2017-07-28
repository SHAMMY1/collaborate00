const app = require('express')();

app.get('/', (req, res) => {
    res.send(`
        <h1>COLLABORATE<\h1>
    `);
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

const express = require('express');
const bodyParser = require('body-parser');

const getListings = require('./index');

const app = express();

app.use(bodyParser.json());

app.post('/listings', async (req, res) => {
    try {
        const listings = await getListings(req.body.place, req.body.radius);
        res.json({ listings });
    } catch (err) {
        res.status(501).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('App is listening on port ', PORT);
});

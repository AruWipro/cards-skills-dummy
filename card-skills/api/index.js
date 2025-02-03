const express = require('express');
const bodyParser = require('body-parser');
const { activateCard } = require('./controllers/cardController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from Express on Vercel!');
});

app.post('/activate-card', activateCard);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

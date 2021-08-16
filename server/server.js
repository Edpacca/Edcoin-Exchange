const express = require('express');
const routes = require('./routes/routes.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

routes(app);

const server = app.listen(3000, function () {
    console.log(`app running on port ${server.address().port}`)
});


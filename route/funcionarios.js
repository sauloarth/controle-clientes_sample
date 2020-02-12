const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Responding good!');
});

module.exports = routes;

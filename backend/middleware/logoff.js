const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if(!token) {
        return res.status(401).send('Você já não está mais logado');
    }

    try {
        jwt.verify(token, config.get('pvtk'));
        next();
    } catch (error) {
        return res.status(401).send('Você já não está mais logado.');
    }
}
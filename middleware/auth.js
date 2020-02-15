const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if(!token) {
        return res.status(401).send('Você precisa se logar para esta operação.');
    }

    try {
        const decoded = jwt.verify(token, config.get('pvtk'));
        req.funcionarioId = decoded.tokenData._id; 
        res.header('x-access-token', token)
        next();
    } catch (error) {
        return res.status(401).send('Você não está logado.');
    }
}
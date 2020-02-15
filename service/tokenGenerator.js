const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = getToken = (_id, isAdmin) => {
    const tokenData = {_id, isAdmin}

    const signature = config.get('pvtk');
    const expiration = '3h'

    const token = jwt.sign({tokenData}, signature, {expiresIn: expiration});
    
    return token;
}
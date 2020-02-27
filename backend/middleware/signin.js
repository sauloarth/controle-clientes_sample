const {Funcionario} = require('../model/funcionario');
const argon2 = require('argon2');
const getToken = require('../service/tokenGenerator');

module.exports = signin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const hasFuncionario = await Funcionario.findOne({email});
    
    if(!hasFuncionario)
        return res.status(401).send('Funcionário não encontrado.');

    const passwordRight = await argon2.verify(hasFuncionario.password, password);

    if(!passwordRight)
        return res.status(401).send('Password incorreto.');    
 
    const token = getToken(hasFuncionario._id, hasFuncionario.isAdmin);
    res.set('Authorization', token)
    res.funcionario = {
        _id: hasFuncionario._id,
        nome: hasFuncionario.nome,
        email: hasFuncionario.email
    }

    next();
}
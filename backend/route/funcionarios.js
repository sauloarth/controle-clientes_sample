const auth = require('../middleware/auth');
const signin = require('../middleware/signin');
const logoff = require('../middleware/logoff');
const argon2 = require('argon2');
const routes = require('express').Router();
const config = require('config');

const { Funcionario, schema } = require('../model/funcionario');

routes.get('/info', auth, async (req, res) => {
    const hasFuncionario = await Funcionario.findOne({_id: req.funcionarioId})

    if(!hasFuncionario)
        return res.status(400).send('Erro ao recuperar informações do funcionario logado.');
    
    
    return res.send({
        _id: hasFuncionario._id,
        nome: hasFuncionario.nome,
        email: hasFuncionario.email,
        isAdmin: hasFuncionario.isAdmin
    });

});

routes.post('/signin', signin, async (req, res) => {  
    return res.send(res.getHeader('Authorization'));

});


routes.post('/signup', async(req, res) => {
    const {error} = schema.validate(req.body);

    if(error) 
        return res.status(400).send(error.details[0].message);

    let funcionario = await Funcionario.findOne({email: req.body.email});
    
    if(funcionario) 
        return res.status(400).send('Email já registrado.');
    
    funcionario = new Funcionario({
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password
    })

    funcionario.password = await argon2.hash(funcionario.password, config.get('pvtk'));
    await funcionario.save((err, result) =>{
        if(err) return res.status(500).send('Erro ao salvar o funcionário.');

        res.send({
            _id: result._id,
            nome: result.nome,
            email: result.email
        })
        
    });
})

routes.get('/logoff', logoff, async (req, res) => {   
    return res.send('Logoff realizado com sucesso.');
});


module.exports = routes;

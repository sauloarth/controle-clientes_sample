const routes = require('express').Router();
const { Funcionario, schema } = require('../model/funcionario');

routes.get('/', async (req, res) => {
    await Funcionario.find({},(err, results) => {
        if(err) {
            console.log("Error getting funcionarios: ", err);
        } else {
            console.log("Here are funcionarios: ", results);
            res.send(results);
        }
    }) 
});

routes.get('/:id', async (req, res) => {
    const id = req.params.id;

    await Funcionario.findById(id, (err, result) => {
        if(err) {
            console.log("Error getting funcionarios by id: ", err);
        } else {
            console.log("Here is funcionario: ", result);
            res.send(results);
        }
    })
});

routes.post('/', async(req, res) => {
    const payload = req.body;
    const valid = schema.validate(payload);

    if(valid.error) {
        res.send(valid.error);
    } else {
        const funcionario = new Funcionario(valid.value);
        await funcionario.save((err, result) => {
            if (err) {
                console.log("Error saving funcionario: ", err.message);
            } else {
                res.send(result);
            }
        })
    }
})

routes.put('/:id', async(req, res) =>{
    const id = req.params.id;
    const payload = req.body;

    try{
        const updated = await Funcionario
            .findOneAndUpdate({_id: id}, {...payload}, {new: true});

        res.send(updated);
    } catch(err) {
        console.log("Error updating funcionario: ", err.message);
    }

})

routes.delete('/:id', async(req, res) => {
    const id = req.params.id;

    try{
        const deleted = await Funcionario
            .findOneAndDelete({_id: id});

        res.send(deleted);
    } catch(err) {
        console.log("Error deleting funcionario: ", err.message);
    }
})

module.exports = routes;

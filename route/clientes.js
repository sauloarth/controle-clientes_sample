const routes = require('express').Router();
const { Cliente, schema } = require('../model/cliente');

routes.get('/', async (req, res) => {
    await Cliente.find({},(err, results) => {
        if(err) {
            console.log("Error getting cliente: ", err);
        } else {
            console.log("Here are cliente: ", results);
            res.send(results);
        }
    }) 
});

routes.get('/:id', async (req, res) => {
    const id = req.params.id;

    await Cliente.findById(id, (err, result) => {
        if(err) {
            console.log("Error getting cliente by id: ", err);
        } else {
            console.log("Here is cliente: ", result);
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
        const cliente = new Cliente(valid.value);
        await cliente.save((err, result) => {
            if (err) {
                console.log("Error saving cliente: ", err.message);
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
        const updated = await Cliente
            .findOneAndUpdate({_id: id}, {...payload}, {new: true});

        res.send(updated);
    } catch(err) {
        console.log("Error updating cliente: ", err.message);
    }

})

routes.delete('/:id', async(req, res) => {
    const id = req.params.id;

    try{
        const deleted = await Cliente
            .findOneAndDelete({_id: id});

        res.send(deleted);
    } catch(err) {
        console.log("Error deleting cliente: ", err.message);
    }
})
module.exports = routes;
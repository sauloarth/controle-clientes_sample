const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    telefone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
    },
    endereço: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    }
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

const schema =  Joi.object({
    nome: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    telefone: Joi.string().min(8).max(20).required(),    
    endereço: Joi.string().min(5).max(255).required(),    

});


exports.Cliente = Cliente;
exports.schema = schema;
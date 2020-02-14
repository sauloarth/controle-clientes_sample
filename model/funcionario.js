const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const FuncionarioSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const Funcionario = mongoose.model('Funcionario', FuncionarioSchema);

const schema =  Joi.object({
    nome: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
});


exports.Funcionario = Funcionario;
exports.schema = schema;
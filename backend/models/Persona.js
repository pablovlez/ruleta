const {Schema, model} = require ('mongoose');

const PersonaSchema = new Schema({
    nombre: {type: String, required: true},
    dinero: {type: Number, default: 10000, },
    apostado: {type: Number},
    color: {type: String},
    ganancia: {type: Number}    
});

module.exports = model('Persona',PersonaSchema);
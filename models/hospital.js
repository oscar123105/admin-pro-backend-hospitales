const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },

    usuario: {
        
        required: true, //no se puede grabar un hospital sin el usuario que lo crea 
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    collection: 'hospitales'
});

/*
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})
*/
module.exports = model('Hospital', HospitalSchema);
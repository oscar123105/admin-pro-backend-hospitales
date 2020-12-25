const Medico = require('../models/medico');
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res) => {

    const medico = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');
    

   // console.log('prueba medico')
    res.json({
        ok: true,
        medico
    });
}
const crearMedico = async (req, res) => {

    const uid = req.uid;
    const medico = new Medico({ usuario: uid, ...req.body });
    //const uid = req.uid;
    //console.log("Prueba"+" "+uid);
    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            // msg: 'Crear Medico'
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado revisar los logs'
        });
    }



}

//Actualizar un usuario
const actualizarMedico = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Actualizar Medico'
    });
}
//Borrar un usuario
const borrarMedico = async (req, res) => {
    //TODO: validar token y comprobar si es  el usuario correcto
    res.json({
        ok: true,
        msg: 'Borrar Medico'
    });
}

module.exports = {

    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}


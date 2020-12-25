const Hospital = require('../models/hospital')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res) => {

const hospitales =  await Hospital.find().populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales    
    });

}
const crearHospital = async (req, res) => {

    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });
    //const uid = req.uid;
    //console.log("Prueba"+" "+uid);
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            // msg: 'Crear Hospitales'
            hospital: hospitalDB
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
const actualizarHospital = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Actualizar Hospitales'
    });
}
//Borrar un usuario
const borrarHospital = async (req, res) => {
    //TODO: validar token y comprobar si es  el usuario correcto
    res.json({
        ok: true,
        msg: 'Borrar Hospitales'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}


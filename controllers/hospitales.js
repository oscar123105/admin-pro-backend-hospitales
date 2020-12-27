const Hospital = require('../models/hospital')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

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

//Actualizar un hospital
const actualizarHospital = async (req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(400).json({
                ok: true,
                msg: 'El hospital no existe por id '
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true});

        res.json({
            ok: true,
            msg: 'Actualizar Hospitales',
            hospital : hospitalActualizado

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ocurrio algun problema en el server'
        });

    }


}
//Borrar un hospital
const borrarHospital = async (req, res) => {
    const uid = req.params.id;
    try {

        const hospitalDB= Hospital.findById(uid);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe hospital con ese Id'
            });
        }
        await Hospital.findByIdAndDelete(uid);
        res.json({
            ok: true,            
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado revisar los logs'

        });

    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}


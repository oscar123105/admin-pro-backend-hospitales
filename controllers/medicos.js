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

//Actualizar un medico
const actualizarMedico = async (req, res) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: true,
                msg: 'El medico no existe por id '
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'Actualizar Medico',
            medico: medicoActualizado

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ocurrio algun problema en el server'
        });

    }
}
//Borrar un usuario
const borrarMedico = async (req, res) => {
    const uid = req.params.id;
    try {

        const medicoDB = Medico.findById(uid);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe medico con ese Id'
            });
        }
        await Medico.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Medico eliminado'
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

    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}


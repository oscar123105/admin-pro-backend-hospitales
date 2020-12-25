
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')



const getTodo = async (req, res) => {


    const busqueda = req.params.busqueda;
    //se utiliza una expresion regular para realizar una busqueda 
    const regex = new RegExp(busqueda, 'i');

    //con Promise.all se ejecuta todas las busquedas consumiendo menos recursos de procesamiento por que trabaja de manera simultanea.
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ])


    res.json({
        ok: true,
        msg: 'Ingrese busquedad',
        usuarios,
        medicos,
        hospitales
    });

}
const getDocumentosColeccion = async (req, res) => {


    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    //se utiliza una expresion regular para realizar una busqueda 
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    //con Promise.all se ejecuta todas las busquedas consumiendo menos recursos de procesamiento por que trabaja de manera simultanea.
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('hospital', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que se r usuarios/medicos/hospitales'

            });
    }
    res.json({
        ok: true,
        resultados: data
    });

}
module.exports = {
    getTodo,
    getDocumentosColeccion
}
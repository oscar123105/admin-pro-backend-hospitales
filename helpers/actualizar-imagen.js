const Medico = require('../models/medico');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');

const fs = require('fs');

const actualizatImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';
    // console.log('Vamos bien ')
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un medico por id');
                return false;
            }
            //path viejo
            pathViejo = `./uploads/medicos/${medico.img}`;
            if (fs.existsSync(pathViejo)) {
                // borrar la imagen anterior 
                fs.unlinkSync(pathViejo);
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un  hospital por id');
                return false;
            }
            //path viejo
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            if (fs.existsSync(pathViejo)) {
                // borrar la imagen anterior 
                fs.unlinkSync(pathViejo);
            }

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }
            //path viejo
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            if (fs.existsSync(pathViejo)) {
                // borrar la imagen anterior 
                fs.unlinkSync(pathViejo);
            }

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        default:
            break;
    }

}

module.exports = {
    actualizatImagen
}
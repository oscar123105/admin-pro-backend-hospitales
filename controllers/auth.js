const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { validarCampos } = require('../middlewares/validar-campos');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res) => {
    const {email,password}=req.body;
    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:'Email no es valido'
            });
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg:'Contraseña no es valida'
            });
        }
        // Generar el TOKEN-JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            msg: token
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
    login
}

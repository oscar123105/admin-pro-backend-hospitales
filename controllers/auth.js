const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { validarCampos } = require('../middlewares/validar-campos');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no es valido'
            });
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no es valida'
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

//autenticacion con google sign-in
const googleSignIn = async (req, res) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        //si no existe el usuario
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@@',
                img: picture,
                google: true
            });

        } else {
            //existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }
        //guardar en la BD
        await usuario.save();
        // Generar el TOKEN-JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            token

        });


    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }
}
module.exports = {
    login,
    googleSignIn
}

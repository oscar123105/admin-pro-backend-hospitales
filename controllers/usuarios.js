const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    console.log(desde); 
    //const usuarios = await Usuario.find({}, 'nombre role google').skip(desde).limit(5);

     const [usuarios, total ] = await Promise.all([
        Usuario.find({}, 'nombre role google img').skip(desde).limit(5),
        Usuario.countDocuments()


    ]);



    res.json({
        ok: true,

        //msg: 'get Usuarios1'
        usuarios,
        /*   usuarios: [{
              id: 123,
              nombre: 'Benjamin Guerra Rengifo.'
          }] */
          total,
          uid:req.uid
    });
}

//Crear un usuario (validacion del email sea unico)
const crearUsuarios = async (req, res) => {
    //console.log(req.body);
    const {email, password, nombre}=req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password,salt);

        //Guardar usuario
        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            //msg: 'Creando Usuario'
            usuario,
            token,
           
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
const actualizarUsuario = async (req, res) => {
    //TODO: validar token y comprobar si es  el usuario correcto
    
    const uid = req.params.id;
    try {

        const usuarioDB= Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe usuario con ese Id'
            });
        }
        //Actualizaciones
        const campos = req.body;
        if(usuarioDB.email === req.body.email){
            delete campos.email;
        }else{
            const existeEmail = await Usuario.findOne({email: req.body.email});
            if(existeEmail){
                res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese mail'
                });

            }
        }



        delete campos.password;
        delete campos.google;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new: true});
        res.json({
            ok: true,            
            usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado revisar los logs'

        });

    }
}
//Borrar un usuario
const borrarUsuario = async (req, res) => {
    //TODO: validar token y comprobar si es  el usuario correcto
    
    const uid = req.params.id;
    try {

        const usuarioDB= Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe usuario con ese Id'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,            
            msg: 'Usuario eliminado'
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
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}


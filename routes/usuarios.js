/*
Ruta: /api/usuarios
*/

const { Router } = require('express');
//importar todos los metodos creados en el controlador 
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//ruta para obtener usuarios
router.get('/', validarJWT,getUsuarios );

//ruta para crear un usuario
//aqui vamos a poner como 2 parametro un middleware para validar errores
router.post('/',
[
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'El password es obligatorio').not().isEmpty(),
check('email', 'El email es obligatorio').isEmail(),
validarCampos,
]
,
crearUsuarios);

//ruta para actualizar un usuario
router.put('/:id',
[
    validarJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('email', 'El email es obligatorio').isEmail(),
check('role', 'El role es obligatorio').not().isEmpty(),
]
,
actualizarUsuario);

//ruta para borrar un usuario
router.delete('/:id',validarJWT,borrarUsuario);


module.exports = router;



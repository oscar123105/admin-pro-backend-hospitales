/*
Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
//importar todos los metodos creados en el controlador 
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
//Aqui vamos a crear una ruta para el login
router.post('/',
[
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
]
,
login);
//ruta para login de Google
router.post('/google',
[
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
]
,
googleSignIn);

module.exports = router;
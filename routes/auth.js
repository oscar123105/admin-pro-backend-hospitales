/*
Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
//importar todos los metodos creados en el controlador 
const { login } = require('../controllers/auth');
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

module.exports = router;
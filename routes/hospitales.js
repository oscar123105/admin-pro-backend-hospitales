/*
Ruta: /api/hospitales
*/
const { Router } = require('express');
//importar todos los metodos creados en el controlador 
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//ruta para obtener usuarios
router.get('/', getHospitales);

//ruta para crear un hospital
//aqui vamos a poner como 2 parametro un middleware para validar errores
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ]
    ,
    crearHospital);

//ruta para actualizar un hospital
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ]
    ,
    actualizarHospital);

//ruta para borrar un hospital
router.delete('/:id',
    [
        validarJWT,
    ],

    borrarHospital);


module.exports = router;



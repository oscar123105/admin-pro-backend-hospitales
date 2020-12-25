/*
Busquedas
Ruta: /api/todo
*/

const { Router } = require('express');
//importar todos los metodos creados en el controlador 
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//ruta para obtener usuarios por el nombre
router.get('/:busqueda',
    [
        validarJWT,
    ]
    ,
    getTodo);

    
//ruta para obtener todas las colecciones por el nombre
router.get('/coleccion/:tabla/:busqueda',
[
    validarJWT,
]
,
getDocumentosColeccion);

module.exports = router;
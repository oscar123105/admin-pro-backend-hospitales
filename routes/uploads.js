/*
Busquedas
Ruta: /api/upload
*/

const { Router } = require('express');
//importamos la libreria para realizar la carga de imagenes
const expressFileUpload = require('express-fileupload');
//importar todos los metodos creados en el controlador 
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUploads, retornaImagen } = require('../controllers/uploads');


const router = Router();
//middleware para subir una imagen 
router.use(expressFileUpload());

//ruta para subir imagen (medico/hospital/usuario)
router.put('/:tipo/:id',
    [
        validarJWT,
    ]
    ,
    fileUploads);
//ruta para devolver imagen (medico/hospital/usuario)
    router.get('/:tipo/:foto',retornaImagen);

module.exports = router;
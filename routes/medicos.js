/*
Medicos
Ruta: /api/medicos
*/
const { Router } = require('express');
//importar todos los metodos creados en el controlador 

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//ruta para obtener medicos
router.get('/', getMedicos );

//ruta para crear un medico
//aqui vamos a poner como 2 parametro un middleware para validar errores
router.post('/',
[
validarJWT,
check('nombre','El nombre del medico es necesario').not().isEmpty(),
check('hospital','El hospital id debe ser valido').isMongoId(),
validarCampos
]
,
crearMedico);

//ruta para actualizar un medico
router.put('/:id',
[

]
,
actualizarMedico);

//ruta para borrar un medico
router.delete('/:id',borrarMedico);

module.exports = router;






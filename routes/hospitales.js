/* /api/hospitales */



const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitales.controller');

const router = Router();

router.get('/',getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ] 
    ,createHospital );

router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
, updateHospital )

router.delete('/:id',[validarJWT],deleteHospital);

module.exports = router;